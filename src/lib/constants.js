export const gptUserConversationCollectionName = "gpt-user-conversations";

export const gptSettingsCollectionName = "gpt_settings";

export const groupField = {
  collection: "directus_settings",
  field: "directus_gpt_settings",
  type: "alias",
  schema: null,
  meta: {
    collection: "directus_settings",
    field: "directus_gpt_settings",
    special: ["alias", "no-data", "group"],
    interface: "group-detail",
    options: { headerIcon: "rocket_launch" },
    display: null,
    display_options: null,
    readonly: false,
    hidden: false,
    sort: null,
    width: "full",
    translations: null,
    note: null,
    conditions: null,
    required: false,
    validation: null,
    validation_message: null,
  },
};

export const gptSettingsCollectionObj = {
  collection: gptSettingsCollectionName,
  meta: {
    icon: "settings_suggest",
    singleton: true,
  },
  schema: {
    name: gptUserConversationCollectionName,
    comment: "Storage directus gpt settings",
    fields: [],
  },
};

export const gptSettingsPermissions = [
  {
    collection: gptSettingsCollectionName,
    action: "create",
    fields: "*",
    permissions: {},
    validation: {},
  },
  {
    collection: gptSettingsCollectionName,
    action: "read",
    fields: "*",
    permissions: {},
    validation: {},
  },
  {
    collection: gptSettingsCollectionName,
    action: "update",
    fields: "*",
    permissions: {},
    validation: {},
  },
];

export const gptSettingsFields = [
  {
    collection: gptSettingsCollectionName,
    field: "OpenAI_API_Key",
    type: "string",
    schema: {
      name: "Open_AI_API_Key",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "OpenAI_API_Key",
      special: null,
      interface: "input",
      options: { masked: true },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Used to get text embeddings using 'text-embedding-ada-002' and for searching with 'gpt-3.5-turbo'.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "Pinecone_API_Key",
    type: "string",
    schema: {
      name: "Pinecone_API_Key",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Pinecone_API_Key",
      special: null,
      interface: "input",
      options: { masked: true },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Used to store the data of enabled content types and find the similarities using cosine metrics.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },

  {
    collection: gptSettingsCollectionName,
    field: "Pinecone_Index_Name",
    type: "string",
    schema: {
      name: "Pinecone_Index_Name",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Pinecone_Index_Name",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Enter your pinecone index name in which data will be inserted.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },

  {
    collection: gptSettingsCollectionName,
    field: "Pinecone_Environment",
    type: "string",
    schema: {
      name: "Pinecone_Environment",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Pinecone_Environment",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Enter the environment of your pinecone index for e.g. 'us-west4-gcp'.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },

  {
    collection: gptSettingsCollectionName,
    field: "Ably_API_Key_for_publish_message_purpose",
    type: "string",
    schema: {
      name: "Ably_API_Key_for_publish_message_purpose",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Ably_API_Key_for_publish_message_purpose",
      special: null,
      interface: "input",
      options: { masked: true },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Used for sending the retrieved tokens from ChatGPT to the ChatBox.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "Ably_API_Key_for_subscribe_message_purpose",
    type: "string",
    schema: {
      name: "Ably_API_Key_for_subscribe_message_purpose",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      max_length: 255,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Ably_API_Key_for_subscribe_message_purpose",
      special: null,
      interface: "input",
      options: { masked: true },
      display: null,
      display_options: null,
      readonly: false,
      hidden: false,
      width: "full",
      translations: null,
      note: "Enter Ably API Key here which has only the Subscribe permission. This will be used in ChatBox to subscribe to the tokens sent from ChatGPT.",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "collection_settings",
    type: "text",
    schema: {
      name: "collection_settings",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "collection_settings",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Store collection settings",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "Frontend_Host",
    type: "text",
    schema: {
      name: "Frontend_Host",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Frontend_Host",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Frontend host URL",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "Backend_Host",
    type: "text",
    schema: {
      name: "Backend_Host",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "Backend_Host",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Directus backend host URL",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "chat_widget_settings",
    type: "text",
    schema: {
      name: "chat_widget_settings",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "chat_widget_settings",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Chat widget settings",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "support_executive_image",
    type: "text",
    schema: {
      name: "support_executive_image",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "support_executive_image",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Chat widget settings",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
  {
    collection: gptSettingsCollectionName,
    field: "company_logo",
    type: "text",
    schema: {
      name: "company_logo",
      table: gptSettingsCollectionName,
      data_type: "varchar",
      default_value: null,
      numeric_precision: null,
      numeric_scale: null,
      is_generated: false,
      generation_expression: null,
      is_nullable: true,
      is_unique: false,
      is_primary_key: false,
      has_auto_increment: false,
      foreign_key_column: null,
      foreign_key_table: null,
    },
    meta: {
      collection: gptSettingsCollectionName,
      field: "company_logo",
      special: null,
      interface: "input",
      options: { masked: false },
      display: null,
      display_options: null,
      readonly: false,
      hidden: true,
      width: "full",
      translations: null,
      note: "Chat widget settings",
      conditions: null,
      required: false,
      validation: null,
      validation_message: null,
    },
  },
];

export const gptUserConversationCollectionObj = {
  collection: gptUserConversationCollectionName,
  meta: {
    icon: "forum",
  },
  schema: {
    name: gptUserConversationCollectionName,
    comment: "Storage for user and gpt conversations",
    fields: [],
  },
};

export const gptUserConversationsPermissions = [
  {
    collection: gptUserConversationCollectionName,
    action: "create",
    fields: "*",
    permissions: {},
    validation: {},
  },
  {
    collection: gptUserConversationCollectionName,
    action: "read",
    fields: "*",
    permissions: {},
    validation: {},
  },
  {
    collection: gptUserConversationCollectionName,
    action: "update",
    fields: "*",
    permissions: {},
    validation: {},
  },
];

export const gptUserConversationFields = [
  {
    field: "entry",
    type: "text",
    collection: gptUserConversationCollectionName,
    meta: {
      collection: gptUserConversationCollectionName,
      field: "entry",
      special: null,
      interface: "input",
      options: {},
      hidden: false,
      width: "full",
      note: "Conversation text",
    },
    schema: {
      name: "entry",
      table: gptUserConversationCollectionName,
      data_type: "text",
    },
  },
  {
    field: "speaker",
    type: "string",
    collection: gptUserConversationCollectionName,
    meta: {
      collection: gptUserConversationCollectionName,
      field: "speaker",
      hidden: false,
    },
    schema: {
      name: "speaker",
      table: gptUserConversationCollectionName,
      data_type: "string",
    },
  },
  {
    field: "user_id",
    type: "string",
    collection: gptUserConversationCollectionName,
    meta: {
      collection: gptUserConversationCollectionName,
      field: "user_id",
      hidden: false,
    },
    schema: {
      name: "user_id",
      table: gptUserConversationCollectionName,
      data_type: "string",
    },
  },
  {
    field: "created_at",
    type: "dateTime",
    collection: gptUserConversationCollectionName,
    meta: {
      default: "CURRENT_TIMESTAMP",
      special: ["date-created"],
      hidden: false,
    },
    schema: {
      name: "created_at",
      table: gptUserConversationCollectionName,
      data_type: "dateTime",
    },
  },
  {
    field: "updated_at",
    type: "dateTime",
    collection: gptUserConversationCollectionName,
    meta: {
      default: "CURRENT_TIMESTAMP",
      on_update: true,
      special: ["date-updated", "date-created"],
      hidden: false,
    },
    schema: {
      name: "updated_at",
      table: gptUserConversationCollectionName,
      data_type: "dateTime",
    },
  },
];

export const DEFAULT_COLOR_OPTIONS = {
  headerBackground: "#FFFFFF",
  headerText: "#000000",
  agentMessageBackground: "#E2E8F0",
  agentText: "#000000",
  visitorMessageBackground: "#2563EB",
  visitorText: "#FFFFFF",
};

export const DEFAULT_WIDGET_POSITION = {
  label: "Bottom Right",
  value: "widget-bottom-right",
};

export const WIDGET_POSITION_OPTIONS = [
  {
    label: "Top Left",
    value: "widget-top-left",
  },
  {
    label: "Top Right",
    value: "widget-top-right",
  },
  {
    label: "Middle Left",
    value: "widget-middle-left",
  },
  {
    label: "Middle Right",
    value: "widget-middle-right",
  },
  {
    label: "Bottom Left",
    value: "widget-bottom-left",
  },
  {
    label: "Bottom Right",
    value: "widget-bottom-right",
  },
];

export const DEFAULT_HEADER_CONTENT = "Please fill out the form below for Sid to start helping you.";

export const WIDGET_DISABLE_POSITIONS = [1, 4, 7];

export const WIDGET_POSITIONS = [
  {
    label: "Top Left",
    value: "widget-top-left",
  },
  {
    label: "Top Center",
    value: "tc",
  },
  {
    label: "Top Right",
    value: "widget-top-right",
  },
  {
    label: "Middle Left",
    value: "widget-middle-left",
  },
  {
    label: "Middle Center",
    value: "mc",
  },
  {
    label: "Middle Right",
    value: "widget-middle-right",
  },
  {
    label: "Bottom Left",
    value: "widget-bottom-left",
  },
  {
    label: "Bottom Center",
    value: "bc",
  },
  {
    label: "Bottom Right",
    value: "widget-bottom-right",
  },
];

export const MAX_IMAGE_SIZE_MB = 0.5;
