"use strict";
import { PineconeClient } from "@pinecone-database/pinecone";
import { gptSettingsCollectionName } from "../../lib/constants";
import OpenAIService from "./openai.services";

export default class PineconeService {
  constructor(directusService, schema) {
    this.directusService = directusService;
    this.pineconeClient = new PineconeClient();
    this.index = null;
    // Default pinecone dimension & metric
    this.DEFAULT_DIM = 1536;
    this.DEFAULT_METRIC = "cosine";
    // Set the batch size for upserting vectors to Pinecone
    this.UPSERT_BATCH_SIZE = 100;
    this.schema = schema;
    this.openAIService = null;

    // fetch Pinecone API keys and initialize client
    this.initialize().then((result) => {});
  }

  async initialize() {
    try {
      // fetch gpt settings
      const { ItemsService } = this.directusService;

      const gptSettingsService = new ItemsService(gptSettingsCollectionName, {
        schema: this.schema,
      });

      const getGptSettings = await gptSettingsService.readByQuery({});

      if (!getGptSettings || !getGptSettings.length) {
        console.log("GPT settings not found !!!!!");
        console.log("Please update GPT settings from admin panel");
        return false;
      }

      // initialize Pinecone client with fetched settings
      await this.pineconeClient.init({
        apiKey: getGptSettings[0]["Pinecone_API_Key"],
        environment: getGptSettings[0]["Pinecone_Environment"],
      });

      const listIndexes = await this.pineconeClient.listIndexes();

      if (listIndexes && listIndexes.length && !listIndexes.includes(getGptSettings[0]["Pinecone_Index_Name"])) {
        await this.pineconeClient.createIndex({
          createRequest: {
            name: getGptSettings[0]["Pinecone_Index_Name"],
            dimension: this.DEFAULT_DIM,
            metric: this.DEFAULT_METRIC,
          },
        });
      }

      this.index = this.pineconeClient.Index(getGptSettings[0]["Pinecone_Index_Name"]);

      console.log("Pinecone index created successfully");

      this.openAIService = new OpenAIService(this.directusService, this.schema);
    } catch (error) {
      console.error(`Error initializing Pinecone client: ${error}`);
      throw new Error(error);
    }
  }

  async removeAllVectors() {
    await this.index.delete1({ deleteAll: true });

    return true;
  }

  async upsert(chunks) {
    try {
      const batches = [];
      for (let i = 0; i < chunks.length; i += this.UPSERT_BATCH_SIZE) {
        batches.push(chunks.slice(i, i + this.UPSERT_BATCH_SIZE));
      }

      for (const batch of batches) {
        console.log(`INSERTING DATA OF BATCH ${batches.indexOf(batch) + 1}`);
        await this.index.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
      }
    } catch (error) {
      console.log("Error while upserting data in pinecone", error);
      return false;
    }
  }

  async query(query) {
    const query_embedding = await this.openAIService.get_embeddings([query]);
    const query_response = await this.index.query({
      queryRequest: {
        topK: 3,
        includeValues: false,
        includeMetadata: true,
        vector: query_embedding,
      },
    });
    const query_results = query_response.matches.map((el) => {
      return { id: el.id, metadata: el.metadata };
    });
    return query_results;
  }
}
