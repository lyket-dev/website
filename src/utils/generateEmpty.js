import randToken from "rand-token";
import config from "config";

export function generateEmptyAccessToken() {
  return {
    type: "access_token",
    attributes: {
      name: "",
      can_access_cda: true,
      can_access_cda_preview: true,
      can_access_cma: true,
    },
    relationships: {
      role: {
        data: null,
      },
    },
  };
}

export function generateEmptyField(fieldType) {
  const validators = {};

  if (fieldType === "slug") {
    validators.unique = {};
  }

  return {
    type: "field",
    attributes: {
      label: "",
      api_key: "",
      hint: "",
      field_type: fieldType,
      validators,
      localized: false,
      appearance: null,
    },
  };
}

export function generateEmptyItem(
  locales,
  fields,
  itemType,
  modularBlock = false
) {
  const attributes = fields.reduce((acc, field) => {
    let value;
    if (field.attributes.localized) {
      value = locales.reduce((acc2, locale) => {
        const def = field.attributes.default_value
          ? field.attributes.default_value[locale]
          : null;
        return { [locale]: def, ...acc2 };
      }, {});
    } else {
      value = field.attributes.default_value || null;
    }
    return {
      [field.attributes.api_key]: value,
      ...acc,
    };
  }, {});

  if (!modularBlock && itemType.attributes.sortable) {
    attributes.position = 0;
  }

  return {
    type: "item",
    attributes,
    locales:
      !modularBlock && itemType.attributes.all_locales_required
        ? locales
        : [locales[0]],
    relationships: {
      item_type: {
        data: { type: "item_type", id: itemType.id },
      },
    },
  };
}

export function generateEmptyItemType(modularBlock = false) {
  return {
    type: "item_type",
    attributes: {
      name: "",
      api_key: "",
      sortable: false,
      tree: false,
      singleton: false,
      modular_block: modularBlock,
      draft_mode_active: false,
      ordering_direction: null,
      all_locales_required: true,
      collection_appearance: "table",
    },
    relationships: {
      ordering_field: {
        data: null,
      },
      title_field: {
        data: null,
      },
    },
  };
}

export function generateEmptyMenuItem() {
  return {
    type: "menu_item",
    attributes: {
      label: "",
      position: 0,
      external_url: null,
      open_in_new_tab: true,
    },
    relationships: {
      item_type: {
        data: null,
      },
      parent: {
        data: null,
      },
    },
  };
}

export function generateEmptyRole(primaryEnvironmentId) {
  return {
    type: "role",
    attributes: {
      name: null,
      can_edit_schema: false,
      can_edit_site: false,
      can_manage_users: false,
      can_manage_access_tokens: false,
      can_perform_site_search: false,
      can_edit_favicon: false,
      can_manage_webhooks: false,
      can_manage_build_triggers: false,
      can_manage_sso: false,
      can_edit_environment: false,
      can_manage_environments: false,
      can_manage_shared_filters: false,
      environments_access: "primary_only",
      positive_item_type_permissions: [
        {
          environment: primaryEnvironmentId,
          item_type: null,
          action: "all",
          on_creator: "anyone",
        },
      ],
      negative_item_type_permissions: [],
      positive_build_trigger_permissions: [{ build_trigger: null }],
      negative_build_trigger_permissions: [],
    },
  };
}

export function generateEmptyPlugin() {
  return {
    type: "plugin",
    attributes: {
      name: "",
      url: "",
      plugin_type: "field_editor",
      field_types: [],
      parameter_definitions: {
        global: [
          {
            id: "developmentMode",
            label: "Development mode?",
            type: "boolean",
            hint: "Enable development logs on the console",
          },
        ],
        instance: [],
      },
    },
  };
}

export function generateEmptyInvitation() {
  return {
    type: "site_invitation",
    attributes: {
      email: "",
    },
    relationships: {
      role: {
        data: {
          type: "role",
          id: null,
        },
      },
    },
  };
}

export function generateEmptyBuildTrigger(adapter) {
  const token = randToken.generate(10);
  const domain = config.webhooksApiDomain || "https://webhooks.datocms.com";
  const webhookUrl =
    adapter === "zeit"
      ? `${domain}/zeit-deploy-results`
      : `${domain}/${token}/deploy-results`;

  return {
    type: "build_trigger",
    attributes: {
      name: "",
      indexing_enabled: false,
      autotrigger_on_scheduled_publications: false,
      frontend_url: "",
      adapter: null,
      adapter_settings: null,
      webhook_token: token,
      webhook_url: webhookUrl,
    },
  };
}

export function generateEmptyItemTypeFilter(itemTypeId, filter) {
  return {
    type: "item_type_filter",
    attributes: {
      name: "",
      filter,
      shared: false,
    },
    relationships: {
      item_type: {
        data: {
          id: itemTypeId,
          type: "item_type",
        },
      },
    },
  };
}

export function generateEmptyUploadFilter(filter) {
  return {
    type: "upload_filter",
    attributes: {
      name: "",
      filter,
      shared: false,
    },
  };
}

export function generateEmptyWebhook() {
  return {
    type: "webhook",
    attributes: {
      name: "",
      url: "",
      headers: [],
      events: [],
      http_basic_user: "",
      http_basic_password: "",
    },
  };
}
