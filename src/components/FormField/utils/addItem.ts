import { Dispatch, SetStateAction } from 'react';
import { ItemModel, SelectedItems } from '../../../models';

type Props = {
  itemsToApply: SelectedItems;
  item: ItemModel;
  addItemFunction: Dispatch<SetStateAction<SelectedItems>>;
};
const addItem = (props: Props) => {
  const { itemsToApply, item, addItemFunction } = props;
  const actions = {
    maxItems: itemsToApply && itemsToApply.items.length >= 6,
    haveMythic: item.isMythic && itemsToApply.haveMythic,
    alreadyHaveThisLegenday:
      item.legendaryID && itemsToApply.legendaryIDs.includes(item.legendaryID),
  };
  if (actions.maxItems) {
    return;
  } else if (actions.haveMythic) {
    return;
  } else if (actions.alreadyHaveThisLegenday) {
    return;
  } else if (item.isMythic) {
    addItemFunction({
      ...itemsToApply,
      items: [...itemsToApply.items, item],
      legendaryIDs: item.legendaryID
        ? [...itemsToApply.legendaryIDs, item.legendaryID]
        : [...itemsToApply.legendaryIDs],
      haveMythic: true,
    });
  } else if (item.legendaryID) {
    addItemFunction({
      ...itemsToApply,
      items: [...itemsToApply.items, item],
      legendaryIDs: [...itemsToApply.legendaryIDs, item.legendaryID],
    });
  } else {
    addItemFunction({
      ...itemsToApply,
      items: [...itemsToApply.items, item]
    });
  }
};

export default addItem;
