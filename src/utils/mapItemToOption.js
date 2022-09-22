import buildTitleFromValue from "utils/buildTitleFromValue";
import getFieldValue from "utils/getFieldValue";
import itemStatus from "utils/itemStatus";
import { getTitleFieldForItemType } from "utils/storeQueries";

export default function mapItemToOption(item, state) {
  const itemTypeId = item.relationships.item_type.data.id;
  const itemType = state.itemTypes[itemTypeId];
  const titleField = getTitleFieldForItemType(state, itemType);
  const showStatus = itemType.attributes.draft_mode_active;
  const { locales } = state.site.attributes;

  const title =
    buildTitleFromValue(getFieldValue(item, titleField, locales), titleField) ||
    `Record #${item.id}`;

  return {
    value: item.id,
    label: title,
    itemTypeName: itemType.attributes.name,
    status: showStatus && itemStatus(item),
    url: `/editor/item_types/${itemType.id}/items/${item.id}/edit`,
    itemTypeId,
  };
}
