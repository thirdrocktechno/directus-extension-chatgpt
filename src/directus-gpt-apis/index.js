import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models";
import { PromptTemplate, LLMChain, OpenAI } from "langchain";
import * as Ably from "ably";
import { customAlphabet } from "nanoid";

import { templates } from "./utils/templates";
import { summarizeLongDocument } from "./utils/summarizer";
import {
  gptUserConversationFields,
  gptUserConversationCollectionName,
  gptUserConversationsPermissions,
  gptUserConversationCollectionObj,
  gptSettingsCollectionObj,
  gptSettingsCollectionName,
  gptSettingsPermissions,
  gptSettingsFields,
} from "../lib/constants";
import PineconeService from "./services/pinecone.services";
import UpsertService from "./services/upsert.services";

const getTextFromPredefinedTemplate = (obj) => {
  return `'${JSON.stringify(obj)}'`;
};

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 19);

export default {
  id: "directus-gpt",
  handler: async (router, { services, exceptions, getSchema, database }) => {
    const { FieldsService, CollectionsService, PermissionsService, ItemsService } = services;

    let pineconeService;
    let upsertService;

    await (async () => {
      let schema = await getSchema();
      let service = new FieldsService({ knex: database, schema });

      const collectionService = new CollectionsService({ knex: database, schema });

      const conversationCollection = await collectionService
        .readOne(gptUserConversationCollectionName)
        .catch(() => false);

      if (!conversationCollection) {
        await collectionService.createOne(gptUserConversationCollectionObj);

        const permissionsService = new PermissionsService({ knex: database, schema });

        await permissionsService.createMany(gptUserConversationsPermissions);

        // re-instantiate schema and service due to new collection added
        schema = await getSchema();
        service = new FieldsService({ knex: database, schema });
      }

      const gptSettingsCollection = await collectionService.readOne(gptSettingsCollectionName).catch(() => false);

      if (!gptSettingsCollection) {
        await collectionService.createOne(gptSettingsCollectionObj);

        const permissionsService = new PermissionsService({ knex: database, schema });

        await permissionsService.createMany(gptSettingsPermissions);

        // re-instantiate schema and service due to new collection added
        schema = await getSchema();
        service = new FieldsService({ knex: database, schema });
      }

      // Create fields in GPT settings collection if not exists
      let ensureSettingsFieldsArr = [];
      for (const gptSettingField of gptSettingsFields) {
        ensureSettingsFieldsArr.push(ensureField(gptSettingField, service));
      }
      await Promise.all(ensureSettingsFieldsArr);

      // Create fields in gpt-user conversations collection if not exists
      let ensureConversationFieldsArr = [];
      for (const gptUserConversationField of gptUserConversationFields) {
        ensureConversationFieldsArr.push(ensureField(gptUserConversationField, service));
      }
      await Promise.all(ensureConversationFieldsArr);

      pineconeService = new PineconeService(services, schema);

      upsertService = new UpsertService(services, schema);
    })();

    const { ServiceUnavailableException } = exceptions;

    // api route to refresh data in pinecone for enabled collections
    router.post("/refresh-data", async (req, res, next) => {
      try {
        console.log("Refreshing data in pinecone.....");
        const gptSettingsService = new ItemsService(gptSettingsCollectionName, {
          schema: req.schema,
        });

        const allEnabledCollections = [];

        const getGptSettings = await gptSettingsService.readByQuery({});

        const gptSettings = getGptSettings[0];

        const collectionSettings = JSON.parse(gptSettings.collection_settings);

        for (const coll in collectionSettings) {
          if (collectionSettings[coll].isEnabled) {
            allEnabledCollections.push(coll);
          }
        }

        if (allEnabledCollections.length > 0) {
          pineconeService.removeAllVectors();
        }

        for (const collection in collectionSettings) {
          if (collectionSettings[collection]["isEnabled"]) {
            // fetch data from collection if enabled
            const collectionService = await new ItemsService(collection, {
              schema: req.schema,
              accountability: req.accountability,
            });

            const fields = collectionSettings[collection]["fields"]
              ? collectionSettings[collection]["fields"].map((f) => f.field)
              : ["*"];

            const collectionData = await collectionService.readByQuery({
              fields: fields,
            });
            // console.log(collectionData);
            const data = [];
            for (const dataOfCol of collectionData) {
              const text = getTextFromPredefinedTemplate(dataOfCol);
              const content_id = `${nanoid()}T${Date.now()}`;

              const dataObj = {
                text,
                metadata: {
                  content_id: content_id,
                  // content_id: dataOfCol.id,
                  text,
                },
              };

              // console.log("Data Obj=> ", JSON.stringify(dataObj));
              data.push(dataObj);
            }

            const chunks = await upsertService.get_document_chunks(data);
            await pineconeService.upsert(chunks);
          }
        }

        console.log("::::: Data refreshed successfully :::::");
        return res.json({
          message: "Data refreshed successfully to the vector db.",
        });
      } catch (error) {
        console.log(error);
        return next(new ServiceUnavailableException("Something went wrong while refreshing data"));
      }
    });

    // api to query chat gpt and store in database
    router.post("/query", async (req, res, next) => {
      try {
        const { query, user_id } = req.body;

        const gptSettingsService = new ItemsService(gptSettingsCollectionName, { schema: req.schema });

        const gptUserConversationService = new ItemsService(gptUserConversationCollectionName, { schema: req.schema });

        const getGptSettings = await gptSettingsService.readByQuery({});

        const gptSettings = getGptSettings[0];

        const ably = new Ably.Realtime({ key: gptSettings.Ably_API_Key_for_publish_message_purpose });
        const llm = new OpenAI({ openAIApiKey: gptSettings.OpenAI_API_Key });

        const channel = ably.channels.get(user_id);

        let summarizedCount = 0;

        // Retrieve the conversation log and save the user's prompt
        const conversationHistory = await gptUserConversationService.readByQuery({
          filter: { user_id: { _eq: user_id } },
          limit: 10,
          sort: ["-created_at"],
        });

        await gptUserConversationService.createOne({ entry: query, speaker: "user", user_id: user_id });

        // Build an LLM chain that will improve the user prompt
        const inquiryChain = new LLMChain({
          llm,
          prompt: new PromptTemplate({
            template: templates.inquiryTemplate,
            inputVariables: ["userPrompt", "conversationHistory"],
          }),
        });
        const inquiryChainResult = await inquiryChain.call({ userPrompt: query, conversationHistory });
        const inquiry = inquiryChainResult.text;

        // Embed the user's intent and query the Pinecone index
        channel.publish("status", "Embedding your inquiry and finding results from that...");
        const matches = await pineconeService.query(query);

        channel.publish("status", `Found ${matches?.length} matches`);

        const fullDocuments = matches.map((el) => el.metadata.text);

        channel.publish("status", `Documents are summarized (they are ${fullDocuments?.join("").length} long)`);

        const onSummaryDone = (summary) => {
          summarizedCount += 1;

          channel.publish("status", `Done summarizing ${summarizedCount} documents`);
        };

        const summary = await summarizeLongDocument(
          fullDocuments.join("\n"),
          inquiry,
          onSummaryDone,
          gptSettings.OpenAI_API_Key,
        );
        channel.publish("status", `Documents are summarized. Forming final answer...`);
        const promptTemplate = new PromptTemplate({
          template: templates.qaTemplate,
          inputVariables: ["summaries", "question", "conversationHistory", "frontendUrl"],
        });

        // Creating interval to send tokens on every 100 ms because of ably limitations of 15 ms
        let tokens = [];
        const intervalId = setInterval(() => {
          channel.publish("response", tokens.join(" "));
          tokens = [];
        }, 100);

        const chat = new ChatOpenAI({
          openAIApiKey: gptSettings.OpenAI_API_Key,
          streaming: true,
          verbose: true,
          modelName: "gpt-3.5-turbo",
          callbackManager: CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              tokens.push(token);
            },
            async handleLLMEnd(result) {
              clearInterval(intervalId);
              channel.publish("responseEnd", result.generations[0]);
            },
          }),
        });

        const chain = new LLMChain({
          prompt: promptTemplate,
          llm: chat,
        });

        await chain.call({
          summaries: summary,
          question: query,
          conversationHistory,
          frontendUrl: gptSettings["Frontend_Host"],
        });

        return res.json({
          message: "started",
        });
      } catch (error) {
        console.log(error);
        return next(new ServiceUnavailableException("Something went wrong while querying data"));
      }
    });

    // api to fetch user's last 25 conversations
    router.post("/history", async (req, res, next) => {
      try {
        const { user_id } = req.body;

        const gptUserConversationService = new ItemsService(gptUserConversationCollectionName, { schema: req.schema });

        // Retrieve the conversation log and save the user's prompt
        let conversations = await gptUserConversationService.readByQuery({
          filter: { user_id: { _eq: user_id } },
          limit: 25,
          sort: ["-created_at"],
        });

        conversations = conversations.sort(function (a, b) {
          return new Date(a.created_at) - new Date(b.created_at);
        });

        return res.json({
          message: "Conversations retrieved successfully",
          conversations,
        });
      } catch (error) {
        console.log(error);
        return next(new ServiceUnavailableException("Something went wrong while fetching history"));
      }
    });

    // add response of AI in database
    router.post("/add-conversation", async (req, res, next) => {
      try {
        const { entry, speaker, user_id } = req.body;

        const gptUserConversationService = new ItemsService(gptUserConversationCollectionName, { schema: req.schema });

        const findInHistory = await gptUserConversationService.readByQuery({
          filter: { user_id: { _eq: user_id }, entry: { _eq: entry }, speaker: { _eq: speaker } },
          limit: 1,
        });

        if (!findInHistory || findInHistory.length === 0) {
          await gptUserConversationService.createOne({ entry: entry, speaker: speaker, user_id: user_id });
        }

        return res.json({
          message: "Conversation added successfully",
        });
      } catch (error) {
        console.log(error);
        return next(new ServiceUnavailableException("Something went wrong while adding conversation"));
      }
    });

    // get widgets settings for cdn
    router.get("/widget-settings", async (req, res, next) => {
      try {
        const gptSettingsService = new ItemsService(gptSettingsCollectionName, { schema: req.schema });

        const getGptSettings = await gptSettingsService.readByQuery({});

        const gptSettings = getGptSettings[0];

        let chatWidgetSettings = {};

        if (gptSettings.support_executive_image) {
          chatWidgetSettings.support_executive_image = gptSettings.support_executive_image;
        }

        if (gptSettings.company_logo) {
          chatWidgetSettings.company_logo = gptSettings.company_logo;
        }

        if (gptSettings.chat_widget_settings) {
          chatWidgetSettings = { ...chatWidgetSettings, ...JSON.parse(gptSettings.chat_widget_settings) };
        }

        return res.json({
          chat_widget: chatWidgetSettings,
          website_url: gptSettings.Frontend_Host,
          subscriber_key: gptSettings.Ably_API_Key_for_subscribe_message_purpose,
        });
      } catch (error) {
        console.log(error);
        return next(new ServiceUnavailableException("Something went wrong while adding history"));
      }
    });
  },
};

async function ensureField(field, service) {
  const found = await service.readOne(field.collection, field.field).catch(() => false);
  if (!found) await service.createField(field.collection, field);
}
