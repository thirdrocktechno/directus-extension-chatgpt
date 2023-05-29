"use strict";

import { Configuration, OpenAIApi } from "openai";

import { gptSettingsCollectionName } from "../../lib/constants";

export default class OpenAIService {
  constructor(directusService, schema) {
    this.directusService = directusService;
    this.configuration = null;
    this.openai = null;
    this.schema = schema;

    // fetch OpenAI API keys and initialize client
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

      this.configuration = new Configuration({
        apiKey: getGptSettings[0]["OpenAI_API_Key"],
      });

      this.openai = new OpenAIApi(this.configuration);
      console.log("OpenAI client set successfully");
    } catch (error) {
      console.error(`Error initializing OpenAI client: ${error}`);
      throw new Error(error);
    }
  }

  async get_embeddings(texts) {
    try {
      // Call the OpenAI API to get the embeddings

      if (!this.openai) {
        await this.initialize();
      }

      const response = await this.openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: texts,
      });

      // Extract the embedding data from the response
      const data = response.data.data;

      // Return the embeddings as a list of lists of floats
      const emb = data.map((result) => result.embedding);
      return emb;
    } catch (error) {
      console.log("OPEN AI GET EMBEDDINGS ERR", error);
      throw new Error(error);
    }
  }
}
