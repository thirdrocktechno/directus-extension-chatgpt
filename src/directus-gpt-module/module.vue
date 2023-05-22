<template>
  <private-view title="Directus - GPT">
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'collectionsTab' }">
          <a @click="activeTab = 'collectionsTab'">COLLECTION TYPES</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'settingsTab' }">
          <a @click="activeTab = 'settingsTab'">SETTINGS</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'widgetsTab' }">
          <a @click="activeTab = 'widgetsTab'">WIDGET</a>
        </li>
      </ul>

      <div class="tab-content">
        <div v-show="activeTab === 'collectionsTab'">
          <!-- <v-card> -->
          <v-list-item v-for="(col, index) in collections" :key="index">
            <v-row>
              <v-col>
                <v-list-item-title>{{ col.collection }} </v-list-item-title>
              </v-col>
              <v-col>
                <label class="switch">
                  <input type="checkbox" :id="'switch-' + index" v-model="col.isEnabled" />
                  <span class="slider round"></span>
                </label>
              </v-col>
            </v-row>
          </v-list-item>
          <!-- </v-card> -->
        </div>

        <div v-show="activeTab === 'settingsTab'">
          <ul>
            <label for="openAiApiKey">OpenAI API Key</label>
            <input :type="showOpenAiApiKey ? 'text' : 'password'" v-model="openAiApiKey" />
            <button type="password" @click="switchVisibility('showOpenAiApiKey')">show / hide</button>
            <p>Used to get text embeddings using 'text-embedding-ada-002' and for searching with 'gpt-3.5-turbo'.</p>
          </ul>

          <ul>
            <label for="pineconeApiKey">Pinecone API Key</label>
            <input :type="showPineconeApiKey ? 'text' : 'password'" v-model="pineconeApiKey" />
            <button type="password" @click="switchVisibility('showPineconeApiKey')">show / hide</button>
            <p>Used to store the data of enabled content types and find the similarities using cosine metrics.</p>
          </ul>

          <ul>
            <label for="pineconeIndexName">Pinecone Index Name</label>
            <input type="text" v-model="pineconeIndexName" />
            <p>Enter your pinecone index name in which data will be inserted.</p>
          </ul>

          <ul>
            <label for="pineconeEnvironment">Pinecone Environment</label>
            <input type="text" v-model="pineconeEnvironment" />
            <p>Enter the environment of your pinecone index for e.g. 'us-west4-gcp'.</p>
          </ul>

          <ul>
            <label for="ablyApiKeyForPublishMessage">Ably API Key for publish message purpose</label>
            <input
              :type="showAblyApiKeyForPublishMessage ? 'text' : 'password'"
              v-model="ablyApiKeyForPublishMessage"
            />
            <button type="password" @click="switchVisibility('showAblyApiKeyForPublishMessage')">show / hide</button>
            <p>Used for sending the retrieved tokens from ChatGPT to the ChatBox.</p>
          </ul>

          <ul>
            <label for="ablyApiKeyForSubscribeMessage">Ably API Key for subscribe message purpose</label>
            <input
              :type="showAblyApiKeyForSubscribeMessage ? 'text' : 'password'"
              v-model="ablyApiKeyForSubscribeMessage"
            />
            <button type="password" @click="switchVisibility('showAblyApiKeyForSubscribeMessage')">show / hide</button>
            <p>
              Enter Ably API Key here which has only the Subscribe permission. This will be used in ChatBox to subscribe
              to the tokens sent from ChatGPT.
            </p>
          </ul>
        </div>

        <div v-show="activeTab === 'widgetsTab'">
          <!-- Content for tab 3 -->
          <div class="tabs" style="border-bottom: none">
            <ul>
              <li :class="{ 'is-active': activeWidgetTab === 'widgetContentTab' }">
                <a @click="activeWidgetTab = 'widgetContentTab'">CONTENT</a>
              </li>
              <li :class="{ 'is-active': activeWidgetTab === 'widgetAppearanceTab' }">
                <a @click="activeWidgetTab = 'widgetAppearanceTab'">APPEARANCE</a>
              </li>
              <li :class="{ 'is-active': activeWidgetTab === 'widgetScriptTab' }">
                <a @click="activeWidgetTab = 'widgetScriptTab'">SCRIPT</a>
              </li>
            </ul>

            <div class="tab-content">
              <!-- Content tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetContentTab'">
                <div class="col-md-5 offset-md-1">
                  <div>
                    <h5>Chatbot Logo</h5>
                    <form>
                      <div class="form-group">
                        <label for="support_executive_image">Select Image</label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          @change="previewChatbotImg"
                          class="form-control-file"
                          id="support_executive_image"
                        />

                        <div class="border p-2 mt-3">
                          <p>Preview Here:</p>
                          <template v-if="support_executive_image">
                            <img :src="support_executive_image" height="40" width="40" />
                            <!-- <p class="mb-0">file name: {{ chatbotImage.name }}</p>
                            <p class="mb-0">size: {{ chatbotImage.size / 1024 }}KB</p> -->
                          </template>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div></div>
                <div class="col-md-5 offset-md-1">
                  <div>
                    <h5>Chat Logo</h5>
                    <form>
                      <div class="form-group">
                        <label for="company_logo">Select Image</label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          @change="previewChatImg"
                          class="form-control-file"
                          id="company_logo"
                        />

                        <div class="border p-2 mt-3">
                          <p>Preview Here:</p>
                          <template v-if="company_logo">
                            <img :src="company_logo" height="40" width="40" />
                          </template>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="form-group">
                  <label for="support_message">Support message content</label>
                  <input type="text" id="support_message" v-model="chatWidgetSettings.support_message" />
                </div>
              </div>
              <!-- Appearance tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetAppearanceTab'">
                <div>
                  <h1>Select Chat Icon Position</h1>
                  <select v-model="chatWidgetSettings.widgetIconAlignment">
                    <option v-for="position in availablePositions" :key="position.value" :value="position.value">
                      {{ position.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <div class="color-picker">
                    <label for="header-background">Header Background:</label>
                    <input
                      type="color"
                      id="header-background"
                      v-model="chatWidgetSettings.colors.headerBackground"
                      @input="updateColor('headerBackground')"
                    />
                    <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.headerBackground) }}</span>
                  </div>
                  <div class="color-picker">
                    <label for="header-text">Header Text:</label>
                    <input
                      type="color"
                      id="header-text"
                      v-model="chatWidgetSettings.colors.headerText"
                      @input="updateColor('headerText')"
                    />
                    <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.headerText) }}</span>
                  </div>
                  <div class="color-picker">
                    <label for="agent-message-background">Agent Message Background:</label>
                    <input
                      type="color"
                      id="agent-message-background"
                      v-model="chatWidgetSettings.colors.agentMessageBackground"
                      @input="updateColor('agentMessageBackground')"
                    />
                    <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.agentMessageBackground) }}</span>
                  </div>
                  <div class="color-picker">
                    <label for="agent-text">Agent Text:</label>
                    <input
                      type="color"
                      id="agent-text"
                      v-model="chatWidgetSettings.colors.agentText"
                      @input="updateColor('agentText')"
                    />
                    <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.agentText) }}</span>
                  </div>
                  <div class="color-picker">
                    <label for="visitor-message-background">Visitor Message Background:</label>
                    <input
                      type="color"
                      id="visitor-message-background"
                      v-model="chatWidgetSettings.colors.visitorMessageBackground"
                      @input="updateColor('visitorMessageBackground')"
                    />
                    <span class="color-code">{{
                      getColorCode(chatWidgetSettings.colors.visitorMessageBackground)
                    }}</span>
                  </div>
                  <div class="color-picker">
                    <label for="visitor-text">Visitor Text:</label>
                    <input
                      type="color"
                      id="visitor-text"
                      v-model="chatWidgetSettings.colors.visitorText"
                      @input="updateColor('visitorText')"
                    />
                    <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.visitorText) }}</span>
                  </div>
                </div>
              </div>
              <!-- Script tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetScriptTab'">
                <div class="script-form">
                  <h2>My Script</h2>
                  <div class="form-group">
                    <label for="frontendHost"
                      >Enter host including http(s):// on which you want to enable this bot
                    </label>
                    <input type="text" id="frontendHost" v-model="frontendHost" @input="updateScript" />
                  </div>
                  <div class="form-group">
                    <label for="backendHost">Enter your Directus backend URL here </label>
                    <input type="text" id="backendHost" v-model="backendHost" @input="updateScript" />
                  </div>
                  <div class="script-output">
                    <textarea rows="5" cols="50" readonly>{{ scriptTag }}</textarea>
                  </div>
                  <div>
                    <button @click="copyScript">Copy Script</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="refreshData">Refresh Data</button>
    </div>
    <div>
      <button @click="updateSettings">Update</button>
    </div>

    <!-- Chat widget -->
    <div v-if="activeTab === 'widgetsTab'" class="chatbox-container">
      <div class="container">
        <div class="chatBoxHeader">
          <img :src="support_executive_image" height="40" width="40" />
          <h1 style="font-size: 16px; font-weight: bold">
            {{ chatWidgetSettings.support_message }}
          </h1>
        </div>
        <div class="messageBox mt-8">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.sender ? 'sender' : 'receiver']"
          >
            <div class="message-bubble-container">
              <div class="message-bubble">
                {{ message.text }}
                <div class="message-timestamp">2 mins ago</div>
              </div>
            </div>
          </div>
        </div>
        <div class="inputContainer">
          <input
            v-model="currentMessage"
            type="text"
            class="messageInput"
            placeholder="Ask me anything about this site..."
            readonly
          />
          <button class="askButton">Ask</button>
        </div>
      </div>
      <img :src="company_logo" height="40" width="40" style="margin-left: 320px" />
    </div>
  </private-view>
</template>

<script>
import {
  gptSettingsCollectionName,
  gptUserConversationCollectionName,
  DEFAULT_COLOR_OPTIONS,
  DEFAULT_WIDGET_POSITION,
  WIDGET_POSITION_OPTIONS,
  MAX_IMAGE_SIZE_MB,
} from "../lib/constants";

import SupportExecutiveImage from "./public/images/executive-placeholder-small.png";
import CompanyLogo from "./public/images/chat-icon.png";

export default {
  data() {
    return {
      activeTab: "widgetsTab",
      activeWidgetTab: "widgetContentTab",
      collections: [],
      openAiApiKey: "",
      showOpenAiApiKey: false,
      pineconeApiKey: "",
      showPineconeApiKey: false,
      pineconeIndexName: "",
      pineconeEnvironment: "",
      ablyApiKeyForPublishMessage: "",
      showAblyApiKeyForPublishMessage: false,
      ablyApiKeyForSubscribeMessage: "",
      showAblyApiKeyForSubscribeMessage: false,
      projectColor: "#6644FF",
      collectionSettings: {},
      // widget-content
      chatWidgetSettings: {
        colors: { ...DEFAULT_COLOR_OPTIONS },
        widgetIconAlignment: DEFAULT_WIDGET_POSITION,
        chat_initiation: true,
        header_content: "DirectusGPT Bot",
        support_message: "DirectusGPT Bot",
        widget_language: "en",
      },
      support_executive_image: SupportExecutiveImage,
      company_logo: CompanyLogo,
      // widget-script
      frontendHost: "",
      backendHost: "",
      scriptTag: "",
      // widget-appearance
      availablePositions: WIDGET_POSITION_OPTIONS,
      isSupportExecutiveImageChanged: false,
      isCompanyLogoChanged: false,
      // chat widget
      messages: [
        { text: "Hey There! Give me the list of articles by John Doe.", sender: true },
        { text: "Sure Here it is...", sender: false },
      ],
    };
  },
  methods: {
    async updateSettings() {
      let collectionSettings = {};

      for (const coll of this.collections) {
        if (coll.isEnabled) {
          collectionSettings[coll.collection] = {
            isEnabled: coll.isEnabled,
            fields: [],
          };
        }
      }

      if (this.isSupportExecutiveImageChanged) {
        const formData = new FormData();
        formData.append("file", this.isSupportExecutiveImageChanged);

        await this.api.post("/files", formData);

        await this.api.patch(`/items/${gptSettingsCollectionName}`, {
          support_executive_image: this.support_executive_image,
        });
      }

      if (this.isCompanyLogoChanged) {
        const formData = new FormData();
        formData.append("file", this.isCompanyLogoChanged);

        await this.api.post("/files", formData);

        await this.api.patch(`/items/${gptSettingsCollectionName}`, {
          company_logo: this.company_logo,
        });
      }

      await this.api.patch(`/items/${gptSettingsCollectionName}`, {
        OpenAI_API_Key: this.openAiApiKey.trim(),
        Pinecone_API_Key: this.pineconeApiKey.trim(),
        Pinecone_Index_Name: this.pineconeIndexName.trim(),
        Pinecone_Environment: this.pineconeEnvironment.trim(),
        Ably_API_Key_for_publish_message_purpose: this.ablyApiKeyForPublishMessage.trim(),
        Ably_API_Key_for_subscribe_message_purpose: this.ablyApiKeyForSubscribeMessage.trim(),
        collection_settings: JSON.stringify(collectionSettings),
        Frontend_Host: this.frontendHost,
        Backend_Host: this.backendHost,
        support_message: this.support_message,
        chat_widget_settings: JSON.stringify(this.chatWidgetSettings),
      });
    },
    async refreshData() {
      console.log("Refreshing data in vector db.....");

      await this.api.post("/directus-gpt/refresh-data");
    },
    switchVisibility(showField) {
      this[showField] = !this[showField];
    },
    // widget-content
    previewChatbotImg(event) {
      const input = event.target;
      if (input.files) {
        const file = input.files[0];

        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
          return alert(`Image size should not be more than ${MAX_IMAGE_SIZE_MB} MB`); // Handle the error or show an error message to the user
          // Exit the method without uploading the image
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.support_executive_image = e.target.result;
        };
        this.support_executive_image = input.files[0];
        this.isSupportExecutiveImageChanged = file;
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewChatImg(event) {
      const input = event.target;
      if (input.files) {
        const file = input.files[0];
        // Check the image size
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
          return alert(`Image size should not be more than ${MAX_IMAGE_SIZE_MB} MB`); // Handle the error or show an error message to the user
          // Exit the method without uploading the image
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.company_logo = e.target.result;
        };
        this.company_logo = input.files[0];
        this.isCompanyLogoChanged = file;
        reader.readAsDataURL(input.files[0]);
      }
    },
    // widget-script
    updateScript() {
      this.scriptTag = `<script src="https://assets.directusgpt.com/tracking.js" frontendHost="${this.frontendHost}" backendHost="${this.backendHost}"><\/script>`;
    },

    copyScript() {
      const textarea = document.createElement("textarea");
      textarea.value = this.scriptTag;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },

    // widget-appearance
    updateColor(key) {
      const selectedColor = this.chatWidgetSettings.colors[key];
      console.log(`Selected color for ${key}: ${selectedColor}`);
    },

    getColorCode(color) {
      // Returns the hex code of the provided color
      return color ? color.toUpperCase() : "";
    },
  },
  inject: ["api"],
  async mounted() {
    // log the system field so you can see what attributes are available under it
    // remove this line when you're done.
    try {
      const storedCollections = await this.api.get("/collections?limit=-1");

      const gptSettingsColl = await this.api.get(`/items/${gptSettingsCollectionName}`);

      const gptSettings = await gptSettingsColl.data.data;

      this.chatWidgetSettings = gptSettings.chat_widget_settings
        ? { ...this.chatWidgetSettings, ...JSON.parse(gptSettings.chat_widget_settings) }
        : { ...this.chatWidgetSettings };

      if (!this.support_executive_image) {
        this.support_executive_image = SupportExecutiveImage;
      }
      if (!this.company_logo) {
        this.company_logo = CompanyLogo;
      }

      this.collectionSettings = gptSettings.collection_settings ? JSON.parse(gptSettings.collection_settings) : {};

      this.openAiApiKey = gptSettings["OpenAI_API_Key"];
      this.pineconeApiKey = gptSettings["Pinecone_API_Key"];
      this.pineconeIndexName = gptSettings["Pinecone_Index_Name"];
      this.pineconeEnvironment = gptSettings["Pinecone_Environment"];
      this.ablyApiKeyForPublishMessage = gptSettings["Ably_API_Key_for_publish_message_purpose"];
      this.ablyApiKeyForSubscribeMessage = gptSettings["Ably_API_Key_for_subscribe_message_purpose"];
      this.frontendHost = gptSettings["Frontend_Host"];
      this.backendHost = gptSettings["Backend_Host"];
      this.support_executive_image = gptSettings["support_executive_image"];
      this.company_logo = gptSettings["company_logo"];

      for (const coll of storedCollections.data.data) {
        if (
          !coll.meta.system &&
          ![gptSettingsCollectionName, gptUserConversationCollectionName].includes(coll.meta.collection)
        ) {
          this.collections.push({
            collection: coll.collection,
            isEnabled: this.collectionSettings[coll.collection]
              ? this.collectionSettings[coll.collection]["isEnabled"]
              : false,
            fields: this.collectionSettings[coll.collection]
              ? JSON.stringify(this.collectionSettings[coll.collection]["fields"])
              : [],
          });
        }
      }

      const settings = await this.api.get("/settings");

      this.projectColor = settings.data.data.project_color || "#6644FF";

      this.updateScript();
    } catch (error) {
      console.error("Error while setting data::::: ", error);
    }
  },
};
</script>

<style scoped>
.tabs {
  border-bottom: 1px solid #ccc;
}

.tabs ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tabs ul li {
  display: inline-block;
  margin-right: 10px;
}

.tabs ul li a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

.tabs ul li.is-active a {
  border-bottom: 2px solid v-bind("projectColor");
  color: v-bind("projectColor");
}

.tab-content {
  padding: 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* widget-script */
.form-group {
  margin-bottom: 20px;
}

.script-output {
  margin-top: 20px;
}

button {
  margin-top: 10px;
}

/* widget-appearance */
.color-picker {
  margin-bottom: 10px;
}

.color-picker input[type="color"] {
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%; /* Make the color picker circular */
  appearance: none;
}

/* chat widget */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.chatbox-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.container {
  width: 360px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}

.chatBoxHeader {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: v-bind("chatWidgetSettings.colors.headerText");
  /* padding: 16px; */
  margin: 0;
  background-color: v-bind("chatWidgetSettings.colors.headerBackground");
  display: flex;
  align-items: center;
  padding: 10px;
}

.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
  background-color: white;
  border-radius: 8px;
  margin-right: 8px;
}

.askButton {
  background-color: #576cfe;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border: 2px solid transparent;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
}

.askButton:hover {
  background-color: #7687f7;
}

@media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
}

.message-bubble-container {
  max-width: 70%;
  display: flex;
}

.message-bubble {
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: fit-content;
}

.sender .message-bubble-container {
  justify-content: flex-end;
  float: right;
}

.receiver .message-bubble-container {
  justify-content: flex-start;
  float: left;
}

.sender .message-bubble {
  background-color: v-bind("chatWidgetSettings.colors.visitorMessageBackground");
  color: v-bind("chatWidgetSettings.colors.visitorText");
}

.receiver .message-bubble {
  background-color: v-bind("chatWidgetSettings.colors.agentMessageBackground");
  color: v-bind("chatWidgetSettings.colors.agentText");
}

.message-timestamp {
  font-size: 10px;
  /* margin-top: 1px; */
  text-align: right;
}
.sender .message-timestamp {
  background-color: v-bind("chatWidgetSettings.colors.visitorMessageBackground");
  color: v-bind("chatWidgetSettings.colors.visitorText");
}

.receiver .message-timestamp {
  background-color: v-bind("chatWidgetSettings.colors.agentMessageBackground");
  color: v-bind("chatWidgetSettings.colors.agentText");
}
</style>
