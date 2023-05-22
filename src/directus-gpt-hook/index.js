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
import { defineHook } from "@directus/extensions-sdk";

/**
 * Ensure the required collection, permission and API Key fields exist in settings
 */
export default defineHook(({ init }, { services, database, getSchema }) => {
  const { FieldsService, CollectionsService, PermissionsService } = services;
  init("routes.custom.after", async () => {
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

    for (const gptSettingField of gptSettingsFields) {
      await ensureField(gptSettingField, service);
    }

    for (const gptUserConversationField of gptUserConversationFields) {
      await ensureField(gptUserConversationField, service);
    }
  });

  async function ensureField(field, service) {
    const found = await service.readOne(field.collection, field.field).catch(() => false);
    if (!found) await service.createField(field.collection, field);
  }
});
