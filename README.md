# [DirectusGPT](https://directus.io/) plugin for Directus

[OpenAI](https://openai.com/) is an AI research lab known for their work on natural language processing, computer vision, and robotics. This plugin uses an OpenAI API for Text Embedding, and Text generation.

[Directus](https://directus.io/) is a headless CMS that simplifies API development. This plugin uses Directus to sync data into pinecone db, customize ChatBot UI and much more.

[Pinecone](https://www.pinecone.io/) is a fast and efficient vector database for AI applications. This plugin uses Pinecone to find similarities and generate text on the basis of that.

[Ably](https://ably.com/) is a messaging platform for real-time data delivery. This plugin uses Ably to publish & subscribe the tokens from Directus to ChatBot.

[LangChain](https://js.langchain.com/) is a framework for developing applications powered by language models. It allows developers to connect a language model to other sources of data and allow a language model to interact with other systems. This plugin uses LangChain for a conversation like search in the ChatBot.

Checkout AI ChatBot demo at [Foodadvisor Demo With DirectusGPT ChatBot](https://foodadvisor.strapigpt.com/). Click on the button right chat icon and ask about the restaurants in the ChatBot. The demo is based on the [Foodadvisor - Directus Demo](https://github.com/strapi/foodadvisor).

## Overview: Integrate a custom ChatBot in your frontend using DirectusGPT.

With this plugin, you can integrate a custom ChatBot in your frontend by just copy & pasting a script in your frontend. The ChatBot will answer according to your content of directus in your frontend.

Setting up the plugin is super easy and can be completed within few minutes.

1. Go to the Tab **COLLECTION TYPES** & Enable the collection types on which you want to integrate search from the plugin UI.
2. Go to the Tab **SETTINGS** & Enter the credentials for OpenAI, Ably, and Pinecone ( with pinecone index name & environment ).
3. Go to the Tab **WIDGET** & Configure the ChatBot content from Sub-tab **CONTENT** & UI from Sub-tab **APPEARANCE** according to your needs.
4. Go to the Sub-tab **SCRIPT** of **WIDGET** tab & Enter your frontend URL & backend URL ( _Backend URL must be your directus URL_ ).
5. Click on the Update button to save the settings.
6. Click on the Refresh Data button to sync the data from directus to pinecone vector db for the enabled collection types.
7. Copy & Paste the script in your frontend to add the ChatBot.

Thats it! You can now use ChatBot in your frontend to ask your queries.

## ✨ Features

1. **Easy to use**: The plugin is easy to use and can be set up within 10 minutes.
1. **Customizable**: You can customize the ChatBot UI according to your needs.
1. **Open Source**: The plugin is open source and can be found on [GitHub](https://github.com/thirdrocktechno/directus-plugin-chatgpt)

## 🖐 Requirements

1. [Node.js](https://nodejs.org/en/) version 18 or higher.
1. [Directus](https://directus.io/) version v9.x or higher.

> The plugin is designed for **Directus v9.x**.

## ⏳ Installation

### 1. Install the plugin

<!-- use npm for installing plugin -->

```bash
npm install @thirdrocktechno/directus-gpt
```

### 2. Enable the plugin

<!-- enable the plugin in the admin panel -->

Goto `<strapi app root>/config/plugins.js` Add the following code snippet.

```js
module.exports = ({ env }) => ({
  // ...
  "strapi-gpt": {
    enabled: true,
  },
});
```

### 3. Build and start the Admin UI

Afterwards, you would need to build a fresh package that includes the StrapiGPT plugin. For it, please execute the commands below:

<!-- build the admin UI -->

```bash
npm run build
npm run develop
```

The DirectusGPT plugin should appear in the Plugins section of the Directus sidebar after you run the app again.

Now you are ready to integrate DirectusGPT on your Directus website 🎉

## 🔧 Configuration

You can easily configure the DirectusGPT plugin in the Directus admin panel.

- Goto `DirectusGPT` -> `SETTINGS` Tab in the plugin UI.
- Enter All the required field values in the SETTINGS tab.
- Click on Update to save the configuration.

## 📖 Testing the plugin

- Click DirectusGPT plugin in plugin section of the sidebar.
- Enable the collection type on which you want to provide the AI search within the ChatBot.
- Click on the **WIDGET** tab and configure ChatBot content from the sub-tab **CONTENT** & UI from the sub-tab **APPEARANCE** according to your needs.
- Click on **Update** button to save the changes and then Click on **Refresh Data** to sync data from directus to the vectordb ( this will create an embeddings of your content and save it for finding the similarities. )
- Click on the Sub-tab **SCRIPT** of the same Widget tab and update frontend & backend URL the save config again by clicking on the **Update** button again.
- Copy the show script and paste it in your frontend to show the ChatBot for integrating an AI ChatBot.

## 📝 License

[MIT License](LICENSE.md)

Copyright © 2023 [Third Rock Techkno LLP](https://www.thirdrocktechkno.com/)

# Let us know!

If you use our open-source libraries in your project, please make sure to credit us and Give a star.
