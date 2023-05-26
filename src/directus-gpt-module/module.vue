<template>
  <private-view title="Directus - GPT">
    <div class="tabs">
      <ul class="tob-tabs">
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
            <v-row class="v-list-item-row">
              <v-col>
                <v-list-item-title class="v-list-item-title">{{ col.collection }} </v-list-item-title>
              </v-col>
              <v-col>
                <!-- <label class="switch">
                  <input
                    type="checkbox"
                    :id="'switch-' + index"
                    v-model="col.isEnabled"
                    @click="openFieldsDialog(index)"
                  />
                  <span class="slider round"></span>
                </label> -->
                <div
                  :class="['setting-button', 'redSettingsBtn', { greenSettingsBtn: col.isEnabled }]"
                  @click="openFieldsDialog(index)"
                >
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.17 18a3 3 0 015.66 0H22v2H11.83a3 3 0 01-5.66 0H2v-2h4.17zm6-7a3 3 0 015.66 0H22v2h-4.17a3 3 0 01-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 015.66 0H22v2H11.83a3 3 0 01-5.66 0H2V4h4.17z"
                      fill="#212134"
                    ></path>
                  </svg>
                  <span>Settings</span>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
          <!-- </v-card> -->

          <!-- fields selection dialog 23052023 -->
          <v-dialog v-model="fieldsDialogVisible" max-width="500px">
            <v-card class="main-modal-wrapper">
              <v-card-title>Select Fields</v-card-title>
              <div class="modal-body">
                <v-list-item v-for="(field, fieldIndex) in collections[fieldsDialogIndex].fields">
                  <v-row class="v-list-item-row">
                    <v-col>
                      <v-list-item-title class="v-list-item-title">{{ field.field }} </v-list-item-title>
                    </v-col>
                    <v-col>
                      <label class="switch">
                        <input
                          type="checkbox"
                          :id="'switch2-' + fieldIndex"
                          :key="fieldIndex"
                          v-model="field.isEnabled"
                        />
                        <span class="slider round"></span>
                      </label>
                    </v-col>
                  </v-row>
                </v-list-item>
              </div>
              <v-card-actions>
                <v-btn class="modal-close-button" color="primary" text @click="fieldsCloseDialog">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <div class="setting-wrapper" v-show="activeTab === 'settingsTab'">
          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="openAiApiKey">OpenAI API Key</label>
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require OpenAI API key to work.</span>
            </div>
            <div class="setting-list-input-field">
              <input :type="showOpenAiApiKey ? 'text' : 'password'" v-model="openAiApiKey" />
              <!-- <button type="password" @click="switchVisibility('showOpenAiApiKey')">show / hide</button> -->
              <button
                type="password"
                @click="switchVisibility('showOpenAiApiKey')"
                style="background: none; border: none; cursor: pointer"
              >
                <template v-if="showOpenAiApiKey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M15.2 12a3.2 3.2 0 1 1-6.399 0 3.2 3.2 0 0 1 6.4 0Z" fill="#212134"></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 0 1 .005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 0 1 .032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103Zm-9.446 9.888a4.8 4.8 0 1 0 5.334-7.982 4.8 4.8 0 0 0-5.334 7.982Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.048 6.875 2.103 4.93a1 1 0 1 1 1.414-1.415l16.966 16.966a1 1 0 1 1-1.414 1.415l-2.686-2.686a12.247 12.247 0 0 1-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 0 1-2.116-2.568 11.096 11.096 0 0 1-.711-1.211 1.145 1.145 0 0 1 0-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906Zm10.539 10.539-1.551-1.551a4.005 4.005 0 0 1-4.9-4.9L6.584 9.411a6 6 0 0 0 8.002 8.002ZM7.617 4.787A12.248 12.248 0 0 1 12 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 0 1 2.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 0 0-8.002-8.002L7.617 4.787Zm3.347 3.347A4.005 4.005 0 0 1 16 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
              </button>
            </div>

            <p class="setting-list-info">
              Used to get text embeddings using 'text-embedding-ada-002' and for searching with 'gpt-3.5-turbo'.
            </p>
          </ul>

          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="pineconeApiKey">Pinecone API Key</label>
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require Pinecone API key to work.</span>
            </div>
            <div class="setting-list-input-field">
              <input :type="showPineconeApiKey ? 'text' : 'password'" v-model="pineconeApiKey" />
              <button
                type="password"
                @click="switchVisibility('showPineconeApiKey')"
                style="background: none; border: none; cursor: pointer"
              >
                <template v-if="showOpenAiApiKey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M15.2 12a3.2 3.2 0 1 1-6.399 0 3.2 3.2 0 0 1 6.4 0Z" fill="#212134"></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 0 1 .005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 0 1 .032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103Zm-9.446 9.888a4.8 4.8 0 1 0 5.334-7.982 4.8 4.8 0 0 0-5.334 7.982Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.048 6.875 2.103 4.93a1 1 0 1 1 1.414-1.415l16.966 16.966a1 1 0 1 1-1.414 1.415l-2.686-2.686a12.247 12.247 0 0 1-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 0 1-2.116-2.568 11.096 11.096 0 0 1-.711-1.211 1.145 1.145 0 0 1 0-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906Zm10.539 10.539-1.551-1.551a4.005 4.005 0 0 1-4.9-4.9L6.584 9.411a6 6 0 0 0 8.002 8.002ZM7.617 4.787A12.248 12.248 0 0 1 12 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 0 1 2.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 0 0-8.002-8.002L7.617 4.787Zm3.347 3.347A4.005 4.005 0 0 1 16 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
              </button>
            </div>

            <p class="setting-list-info">
              Used to store the data of enabled content types and find the similarities using cosine metrics.
            </p>
          </ul>

          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="pineconeIndexName">Pinecone Index Name</label>
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require Pinecone index key to work.</span>
            </div>

            <div class="setting-list-input-field">
              <input type="text" v-model="pineconeIndexName" />
            </div>

            <p class="setting-list-info">Enter your pinecone index name in which data will be inserted.</p>
          </ul>

          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="pineconeEnvironment">Pinecone Environment</label>
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require Pinecone environment to work.</span>
            </div>

            <div class="setting-list-input-field">
              <input type="text" v-model="pineconeEnvironment" />
            </div>
            <p class="setting-list-info">Enter the environment of your pinecone index for e.g. 'us-west4-gcp'.</p>
          </ul>

          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="ablyApiKeyForPublishMessage"
              >Ably API Key for publish message purpose</label
            >
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require Ably API key to work.</span>
            </div>

            <div class="setting-list-input-field">
              <input
                :type="showAblyApiKeyForPublishMessage ? 'text' : 'password'"
                v-model="ablyApiKeyForPublishMessage"
              />
              <button
                type="password"
                @click="switchVisibility('showAblyApiKeyForPublishMessage')"
                style="background: none; border: none; cursor: pointer"
              >
                <template v-if="showOpenAiApiKey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M15.2 12a3.2 3.2 0 1 1-6.399 0 3.2 3.2 0 0 1 6.4 0Z" fill="#212134"></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 0 1 .005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 0 1 .032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103Zm-9.446 9.888a4.8 4.8 0 1 0 5.334-7.982 4.8 4.8 0 0 0-5.334 7.982Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.048 6.875 2.103 4.93a1 1 0 1 1 1.414-1.415l16.966 16.966a1 1 0 1 1-1.414 1.415l-2.686-2.686a12.247 12.247 0 0 1-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 0 1-2.116-2.568 11.096 11.096 0 0 1-.711-1.211 1.145 1.145 0 0 1 0-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906Zm10.539 10.539-1.551-1.551a4.005 4.005 0 0 1-4.9-4.9L6.584 9.411a6 6 0 0 0 8.002 8.002ZM7.617 4.787A12.248 12.248 0 0 1 12 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 0 1 2.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 0 0-8.002-8.002L7.617 4.787Zm3.347 3.347A4.005 4.005 0 0 1 16 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
              </button>
            </div>
            <p class="setting-list-info">Used for sending the retrieved tokens from ChatGPT to the ChatBox.</p>
          </ul>

          <ul class="setting-list-wrapper">
            <label class="setting-list-heading" for="ablyApiKeyForSubscribeMessage"
              >Ably API Key for subscribe message purpose</label
            >
            <div class="tooltip-wrapper">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="#8e8ea9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 4.92a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm3.84 13.06a.5.5 0 0 1-.5.5h-6.2a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.14v-5.28H9.86a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 .5-.5h2.84a.5.5 0 0 1 .5.5v6.7h2.14a.5.5 0 0 1 .5.5v.92Z"
                  fill="#212134"
                ></path>
              </svg>
              <span class="tooltip-text">This plugin will require Ably API key to work.</span>
            </div>

            <div class="setting-list-input-field">
              <input
                :type="showAblyApiKeyForSubscribeMessage ? 'text' : 'password'"
                v-model="ablyApiKeyForSubscribeMessage"
              />
              <button
                type="password"
                @click="switchVisibility('showAblyApiKeyForSubscribeMessage')"
                style="background: none; border: none; cursor: pointer"
              >
                <template v-if="showOpenAiApiKey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M15.2 12a3.2 3.2 0 1 1-6.399 0 3.2 3.2 0 0 1 6.4 0Z" fill="#212134"></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 0 1 .005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 0 1 .032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103Zm-9.446 9.888a4.8 4.8 0 1 0 5.334-7.982 4.8 4.8 0 0 0-5.334 7.982Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.048 6.875 2.103 4.93a1 1 0 1 1 1.414-1.415l16.966 16.966a1 1 0 1 1-1.414 1.415l-2.686-2.686a12.247 12.247 0 0 1-4.383.788c-3.573 0-6.559-1.425-8.962-3.783a15.842 15.842 0 0 1-2.116-2.568 11.096 11.096 0 0 1-.711-1.211 1.145 1.145 0 0 1 0-.875c.124-.258.36-.68.711-1.211.58-.876 1.283-1.75 2.116-2.569.326-.32.663-.622 1.01-.906Zm10.539 10.539-1.551-1.551a4.005 4.005 0 0 1-4.9-4.9L6.584 9.411a6 6 0 0 0 8.002 8.002ZM7.617 4.787A12.248 12.248 0 0 1 12 3.998c3.572 0 6.559 1.426 8.961 3.783a15.845 15.845 0 0 1 2.117 2.569c.351.532.587.954.711 1.211.116.242.115.636 0 .875-.124.257-.36.68-.711 1.211-.58.876-1.283 1.75-2.117 2.568-.325.32-.662.623-1.01.907l-2.536-2.537a6 6 0 0 0-8.002-8.002L7.617 4.787Zm3.347 3.347A4.005 4.005 0 0 1 16 11.998c0 .359-.047.706-.136 1.037l-4.9-4.901Z"
                      fill="#212134"
                    ></path>
                  </svg>
                </template>
              </button>
            </div>

            <p class="setting-list-info">
              Enter Ably API Key here which has only the Subscribe permission. This will be used in ChatBox to subscribe
              to the tokens sent from ChatGPT.
            </p>
          </ul>
        </div>

        <div class="widget-main-wrapper" v-show="activeTab === 'widgetsTab'">
          <!-- Content for tab 3 -->
          <div class="tabs inner-tabs" style="border-bottom: none">
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

            <div class="tab-content inner-tab-content-wrapper">
              <!-- Content tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetContentTab'">
                <div class="inner-tab-content">
                  <!-- Chatbot logo -->
                  <div class="chatbot-logo-wrapper">
                    <h5>Chatbot Logo</h5>
                    <p>Max size 500kb</p>
                    <form>
                      <div class="chat-logo-inner">
                        <img :src="support_executive_image" alt="support executive icon placeholder" srcset="" />
                        <img :src="editIconSvgBase64" alt="edit icon" @click="$refs.supportExecutiveImgInput.click()" />
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          @change="previewChatbotImg"
                          class="form-control-file"
                          id="support_executive_image"
                          style="display: none"
                          ref="supportExecutiveImgInput"
                        />
                      </div>
                    </form>
                  </div>

                  <!-- Chat logo -->
                  <div class="chat-logo-wrapper">
                    <h5>Chat Logo</h5>
                    <p>Max size 500kb</p>
                    <form>
                      <div class="chat-logo-inner">
                        <img :src="company_logo" alt="company logo placeholder" srcset="" />
                        <img :src="editIconSvgBase64" alt="edit icon" @click="$refs.companyLogoInput.click()" />
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          @change="previewChatImg"
                          class="form-control-file"
                          id="support_executive_image"
                          style="display: none"
                          ref="companyLogoInput"
                        />
                        <!-- <label for="company_logo">Select Image</label>
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
                        </div> -->
                      </div>
                    </form>
                  </div>
                </div>

                <div class="support-msg-wrapper">
                  <label for="support_message">Support message content</label>
                  <input type="text" id="support_message" v-model="chatWidgetSettings.support_message" />
                </div>
              </div>
              <!-- Appearance tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetAppearanceTab'">
                <div class="appearance-position-wrapper">
                  <p>Desktop Widget Position</p>
                  <div class="custom-dropdown" @click="toggleDropdown">
                    <div class="selected-option">
                      {{ selectedPosition }}
                      <div class="arrow" :class="{ expanded: isDropdownVisible }"></div>
                    </div>
                    <ul :class="['options', { show: isDropdownVisible }]">
                      <li v-for="position in availablePositions" :key="position.value" @click="selectOption(position)">
                        {{ position.label }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="color-picker-wrapper">
                  <div class="color-picker">
                    <input
                      type="color"
                      id="header-background"
                      class="custom-rounded-color-picker"
                      v-model="chatWidgetSettings.colors.headerBackground"
                      @input="updateColor('headerBackground')"
                    />
                    <div class="color-info">
                      <label for="header-background">Header Background:</label>
                      <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.headerBackground) }}</span>
                    </div>
                  </div>

                  <div class="color-picker">
                    <input
                      type="color"
                      id="header-text"
                      v-model="chatWidgetSettings.colors.headerText"
                      @input="updateColor('headerText')"
                      class="custom-rounded-color-picker"
                    />
                    <div class="color-info">
                      <label for="header-text">Header Text:</label>
                      <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.headerText) }}</span>
                    </div>
                  </div>

                  <div class="color-picker">
                    <input
                      type="color"
                      id="agent-message-background"
                      v-model="chatWidgetSettings.colors.agentMessageBackground"
                      @input="updateColor('agentMessageBackground')"
                      class="custom-rounded-color-picker"
                    />
                    <div class="color-info">
                      <label for="agent-message-background">AI Background:</label>
                      <span class="color-code">{{
                        getColorCode(chatWidgetSettings.colors.agentMessageBackground)
                      }}</span>
                    </div>
                  </div>

                  <div class="color-picker">
                    <input
                      type="color"
                      id="agent-text"
                      v-model="chatWidgetSettings.colors.agentText"
                      @input="updateColor('agentText')"
                      class="custom-rounded-color-picker"
                    />
                    <div class="color-info">
                      <label for="agent-text">AI Text:</label>
                      <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.agentText) }}</span>
                    </div>
                  </div>

                  <div class="color-picker">
                    <input
                      type="color"
                      id="visitor-message-background"
                      v-model="chatWidgetSettings.colors.visitorMessageBackground"
                      @input="updateColor('visitorMessageBackground')"
                      class="custom-rounded-color-picker"
                    />
                    <div class="color-info">
                      <label for="visitor-message-background">User Message Background:</label>
                      <span class="color-code">{{
                        getColorCode(chatWidgetSettings.colors.visitorMessageBackground)
                      }}</span>
                    </div>
                  </div>

                  <div class="color-picker">
                    <input
                      type="color"
                      id="visitor-text"
                      v-model="chatWidgetSettings.colors.visitorText"
                      @input="updateColor('visitorText')"
                      class="custom-rounded-color-picker"
                    />
                    <div class="color-info">
                      <label for="visitor-text">User Text:</label>
                      <span class="color-code">{{ getColorCode(chatWidgetSettings.colors.visitorText) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Script tab starts here..... -->
              <div v-show="activeWidgetTab === 'widgetScriptTab'">
                <div class="script-form">
                  <h2>My Script</h2>
                  <div class="script-form-group">
                    <label for="frontendHost"
                      >Enter host including http(s):// on which you want to enable this bot
                    </label>
                    <input type="text" id="frontendHost" v-model="frontendHost" @input="updateScript" />
                  </div>
                  <div class="script-form-group">
                    <label for="backendHost">Enter your Directus backend URL here </label>
                    <input type="text" id="backendHost" v-model="backendHost" @input="updateScript" />
                  </div>
                  <div class="script-output">
                    <textarea rows="5" cols="50" readonly>{{ scriptTag }}</textarea>
                  </div>
                  <div class="script-form-group-btn">
                    <button @click="copyScript">Copy Script</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chatbox-preview-wrapper">
            <!-- Chat widget -->
            <div
              v-if="activeTab === 'widgetsTab'"
              :class="['chatbox-container', chatWidgetSettings.widgetIconAlignment || 'widget-bottom-right']"
            >
              <div class="container">
                <div class="chatBoxHeader">
                  <img :src="support_executive_image" />
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
              <img class="chatbox-logo" :src="company_logo" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="['collection-type-cta-wrapper', { 'justify-start': activeTab === 'widgetsTab' }]">
      <button @click="refreshData">Refresh Data</button>
      <button @click="updateSettings">Update</button>
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
      activeTab: "collectionsTab",
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
      // fields dialog
      fieldsDialogVisible: false,
      fieldsDialogIndex: DEFAULT_WIDGET_POSITION.value,
      // svg/icons
      editIconSvgBase64:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xOTlfNTIxMCkiPgo8cmVjdCB4PSI2IiB5PSI2IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSIxNSIgZmlsbD0id2hpdGUiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTk5XzUyMTApIj4KPHBhdGggZD0iTTIzLjgwMDQgMTUuNjExOEMyMy45NzU1IDE1LjQzNjcgMjQuNzE3IDE0LjY4NiAyNC45NDU3IDE0LjU5MTNDMjUuMTc0NSAxNC40OTY1IDI1LjQxOTcgMTQuNDQ3OCAyNS42NjczIDE0LjQ0NzhDMjUuOTE0OSAxNC40NDc4IDI2LjE2MDEgMTQuNDk2NSAyNi4zODg5IDE0LjU5MTNDMjYuNjE3NyAxNC42ODYgMjYuODI1NiAxNC44MjQ5IDI3LjAwMDcgMTVDMjcuMTc1NyAxNS4xNzUxIDI3LjMxNDYgMTUuMzgzIDI3LjQwOTQgMTUuNjExOEMyNy41MDQyIDE1Ljg0MDYgMjcuNTUyOSAxNi4wODU3IDI3LjU1MjkgMTYuMzMzNEMyNy41NTI5IDE2LjU4MSAyNy41MDQyIDE2LjgyNjIgMjcuNDA5NCAxNy4wNTVDMjcuMzE0NiAxNy4yODM3IDI2LjM3NTUgMTguMDI1IDI2LjIwMDQgMTguMjAwMU0yMy44MDA0IDE1LjYxMThMMTUuMzM0IDI0TDE0LjMzNCAyNy42NjY3TDE4LjAwMDcgMjYuNjY2N0wyNi4yMDA0IDE4LjIwMDFNMjMuODAwNCAxNS42MTE4TDI2LjIwMDQgMTguMjAwMSIgc3Ryb2tlPSIjNjg4MUZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzE5OV81MjEwIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMjg5ODk2IDAgMCAwIDAgMC40Mzk4ODUgMCAwIDAgMCAwLjUwNDE2NyAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTk5XzUyMTAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTk5XzUyMTAiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTk5XzUyMTAiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMyAxMykiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
      isDropdownVisible: false,
      selectedPosition: null,
    };
  },
  inject: ["api"],
  methods: {
    async updateSettings() {
      let collectionSettings = {};

      // check collections array and prepare collectionSettings object
      for (const coll of this.collections) {
        if (coll.isEnabled) {
          collectionSettings[coll.collection] = {
            isEnabled: coll.isEnabled,
            fields: coll.fields.length ? coll.fields.filter((f) => f.isEnabled) : [],
          };
        }
      }

      // check if chatbot header image is changed
      if (this.isSupportExecutiveImageChanged) {
        const formData = new FormData();
        formData.append("file", this.isSupportExecutiveImageChanged);

        await this.api.post("/files", formData);

        await this.api.patch(`/items/${gptSettingsCollectionName}`, {
          support_executive_image: this.support_executive_image,
        });
      }

      // check if chat widget icon is changed
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
      this.chatWidgetSettings.colors[key];
      // console.log(`Selected color for ${key}: ${selectedColor}`);
    },

    getColorCode(color) {
      // Returns the hex code of the provided color
      return color ? color.toUpperCase() : "";
    },

    // fields dialog
    openFieldsDialog(index) {
      this.fieldsDialogIndex = index;
      this.fieldsDialogVisible = true;
    },

    fieldsCloseDialog() {
      this.fieldsDialogVisible = false;
    },

    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },

    selectOption(position) {
      this.chatWidgetSettings.widgetIconAlignment = position.value;
    },
  },
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
          let collectionFields = await this.api.get(`/fields/${coll.collection}`);

          let fieldsArr = [];

          for (let field of collectionFields.data.data) {
            if (field.meta.field !== "id") {
              // add property for isEnabled
              let isFieldEnabled = false;
              if (this.collectionSettings[coll.collection] && this.collectionSettings[coll.collection]["fields"]) {
                const checkIsFieldEnabled = this.collectionSettings[coll.collection]["fields"].find(
                  (f) => f.id == field.meta.id,
                );
                if (checkIsFieldEnabled) {
                  isFieldEnabled = true;
                }
              }

              fieldsArr.push({ id: field.meta.id, field: field.meta.field, isEnabled: isFieldEnabled });
            }
          }

          this.collections.push({
            collection: coll.collection,
            isEnabled: this.collectionSettings[coll.collection]
              ? this.collectionSettings[coll.collection]["isEnabled"]
              : false,
            fields: fieldsArr,
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
  watch: {
    collections: {
      deep: true, // Watch for nested changes within collections
      handler(newCollections) {
        for (const collection of newCollections) {
          const isEnabled = collection.fields.some((field) => field.isEnabled);

          if (isEnabled) {
            collection.isEnabled = isEnabled;
          } else {
            collection.isEnabled = false;
          }
        }
      },
    },
    chatWidgetSettings: {
      deep: true,
      handler(newChatWidgetSettings) {
        this.selectedPosition = WIDGET_POSITION_OPTIONS.find(
          (p) => p.value === newChatWidgetSettings.widgetIconAlignment,
        ).label;
      },
    },
  },
};
</script>

<style scoped>
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
  padding: 8px 10px;
  text-decoration: none;
  color: #32324d;
  cursor: pointer;
  text-transform: uppercase;
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
  margin-top: 40px;
}

.script-output textarea {
  width: 100%;
  padding: 5px 24px 5px 6px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
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
  width: 38px;
  height: 38px;
  border-radius: 50%; /* Make the color picker circular */
  appearance: none;
}

/* chat widget */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

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
  margin: 0;
  background-color: v-bind("chatWidgetSettings.colors.headerBackground");
  display: flex;
  align-items: center;
  padding: 10px;
}

.chatBoxHeader img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 16px;
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
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  background-color: white;
  border-radius: 8px;
  margin-right: 8px;
  box-shadow: 0px 0px 10px 2px #dfdfdfe3;
}

.askButton {
  background-color: #576cfe;
  color: white;
  font-size: 14px;
  padding: 6px 16px;
  border: 2px solid transparent;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 0;
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

/* Collection Type Styling  */
.tabs {
  padding: 0px 20px 0px 20px;
}

.tabs .tob-tabs {
  border-bottom: 1px solid #ccc;
}

.tab-content {
  padding: 20px 0px 0px 0px !important;
}

.switch {
  width: 46px;
  height: 25px;
}

.slider:before {
  height: 18px;
  width: 18px;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Setting Type Styling  */

.v-list-item-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.v-list-item-title {
  text-transform: capitalize;
}

.v-list-item {
  padding: 12px 4px !important;
  border-bottom: 1px solid #efefef;
  border-radius: 0px !important;
  margin: 0px 0px !important;
  display: flex;
  align-items: center;
  justify-content: space-between !important;
}

.collection-type-cta-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 15px;
  padding: 20px 20px 10px 20px;
}

.collection-type-cta-wrapper button {
  margin-top: 0px;
  background-color: #6644ff;
  padding: 6px 10px;
  border-radius: 6px;
  color: #fff;
}

.setting-list-wrapper {
  margin-bottom: 28px !important;
}

.setting-list-wrapper svg {
  width: 16px;
  height: 16px;
  position: relative;
  top: 4px;
  left: 4px;
  cursor: pointer;
}

.setting-list-wrapper svg path {
  fill: #8e8ea9;
}

.setting-list-heading {
  font-size: 14px;
  color: #32324d;
  display: inline-block;
  padding-bottom: 4px;
}

.setting-list-input-field {
  position: relative;
}

.setting-list-input-field input {
  width: 100%;
  padding: 5px 24px 5px 6px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.setting-list-input-field button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
  margin-top: 0px;
}

.setting-list-info {
  font-size: 12px;
  color: #666687;
  line-height: 1;
  padding-top: 6px;
  font-weight: 400;
}

/* Setting Type Styling  */
.inner-tab-content-wrapper {
  margin-top: 16px;
}

.inner-tab-content {
  display: flex;
  margin-bottom: 40px;
  column-gap: 70px;
}

.chat-logo-inner {
  position: relative;
  width: 80px;
}
.chat-logo-inner img:first-of-type {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 100%;
}

.chat-logo-inner img:last-of-type {
  position: absolute;
  right: 4px;
  bottom: -6px;
  cursor: pointer;
}

.inner-tab-content h5 {
  font-size: 14px;
  padding-bottom: 4px;
  color: #32324d;
  line-height: 1;
}

.inner-tab-content p {
  font-size: 12px;
  padding-bottom: 14px;
  color: #9ca3af;
  font-weight: 400;
}

.support-msg-wrapper label {
  display: block;
  font-size: 15px;
  padding-bottom: 6px;
  color: #32324d;
}

.support-msg-wrapper input {
  width: 100%;
  padding: 5px 24px 5px 6px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.appearance-position-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 44px;
  column-gap: 36px;
  column-gap: 144px;
}

.appearance-position-wrapper p {
  display: block;
  font-size: 15px;
  padding-bottom: 6px;
  color: #32324d;
}

.color-picker-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.color-picker-wrapper .color-picker {
  width: 50%;
}

.color-picker {
  margin-bottom: 36px !important;
  display: flex;
  align-items: center;
  column-gap: 14px;
}

.color-picker label {
  width: fit-content;
  display: block;
  font-size: 15px;
  padding-bottom: 6px;
  color: #32324d;
  line-height: 1;
}

.custom-rounded-color-picker {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #ccc;
}

.custom-rounded-color-picker::-webkit-color-swatch {
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
}

.custom-rounded-color-picker::-webkit-color-swatch-wrapper {
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  width: max-content;
  background-color: #1b1735;
  color: #fff;
  text-align: center;
  padding: 1px 6px;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  z-index: 1;
  font-size: 12px;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
}

/* Setting Styling */

.script-form h2 {
  display: block;
  font-size: 15px;
  padding-bottom: 14px;
  color: #32324d;
}

.script-form-group {
  margin-bottom: 20px;
}

.script-form-group label {
  display: block;
  font-size: 15px;
  padding-bottom: 10px;
  color: #32324d;
  line-height: 1;
}

.script-form-group input {
  width: 100%;
  padding: 5px 24px 5px 6px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.script-form-group-btn button {
  margin-top: 0px;
  background-color: #6644ff;
  padding: 6px 10px;
  border-radius: 6px;
  color: #fff;
  margin-top: 14px;
}

.widget-main-wrapper {
  display: flex;
  min-height: calc(100vh - 250px);
}

.inner-tabs {
  width: 50%;
}
.chatbox-preview-wrapper {
  width: 50%;
}

.chatbox-logo {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
}

.widget-top-left {
  flex-direction: column-reverse;
  display: flex;
}

.widget-top-left .chatbox-logo {
  margin-bottom: 10px;
}

.widget-top-right {
  flex-direction: column-reverse;
  align-items: flex-end;
  display: flex;
}

.widget-top-right .chatbox-logo {
  margin-bottom: 10px;
}

.widget-middle-left {
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
}

.widget-middle-left .chatbox-logo {
  margin-right: 10px;
}

.widget-middle-right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.widget-middle-right .chatbox-logo {
  margin-left: 10px;
}

.widget-bottom-left {
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.widget-bottom-left .chatbox-logo {
  margin-top: 10px;
}

.widget-bottom-right {
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.widget-bottom-right .chatbox-logo {
  margin-top: 10px;
}

.justify-start {
  justify-content: flex-start;
}

/* position dropdown styles */

.custom-dropdown {
  position: relative;
  width: 200px;
}

.custom-dropdown .selected-option {
  cursor: pointer;
  padding: 7px 10px;
  border: 1px solid #6644ff;
  border-radius: 4px;
  color: #32324d;
  font-size: 15px;
}

.custom-dropdown .options {
  display: none;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #6644ff;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  top: 100%;
  margin-top: 4px;
  overflow: hidden;
}

.custom-dropdown .options.show {
  display: block;
}

.custom-dropdown .options li {
  padding: 12px 10px;
  cursor: pointer;
  display: block;
  margin-right: 0;
  line-height: 1;
  border-bottom: 1px solid #efefef;
  color: #32324d;
}

.options li:hover {
  background-color: #f4f4f4;
}

.custom-dropdown .arrow {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #6644ff;
  transform: rotateX(0deg) translateY(0px);
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
}
.custom-dropdown .expanded {
  transform: rotateX(180deg) translateY(2px);
}

.setting-button {
  display: flex;
  align-items: center;
  column-gap: 8px;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
}

.setting-button svg {
  width: 12px;
}

.setting-button span {
  font-size: 12px;
}

/* Modal Styling */
@media (min-width: 600px) {
  .container .v-card {
    min-width: 830px;
    max-width: 830px;
    overflow: hidden;
  }
}

.container .v-card .v-card-title {
  background-color: #f6f6f9;
  margin-top: 0;
  padding: 20px 24px;
  color: #32324d;
  font-size: 16px;
}

.main-modal-wrapper .v-card-actions {
  padding: 20px 24px;
  background-color: #f6f6f9;
}

.main-modal-wrapper .modal-close-button {
  background-color: #6644ff;
  padding: 6px 10px;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.main-modal-wrapper .modal-body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
  padding: 20px;
  overflow: auto;
  max-height: 60vh;
}

.main-modal-wrapper .v-list-item {
  padding: 24px 20px !important;
  flex-basis: calc(50% - 10px);
  flex-shrink: unset;
  flex-grow: unset;
  border-bottom: none;
  box-shadow: 0px 0px 8px 2px #eaeaeab5;
  border-radius: 2px !important;
}

.redSettingsBtn {
  background-color: rgb(231, 205, 205);
}

.greenSettingsBtn {
  background-color: rgb(212, 235, 211);
}
</style>
