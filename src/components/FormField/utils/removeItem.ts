import { SetStateAction } from 'react';
import { ItemModel, SelectedItems } from '../../../models';

const removeItem = (
  removeItemSet: (value: SetStateAction<SelectedItems>) => void,
  removeObj: SelectedItems,
  index: number,
  item: ItemModel,
) => {
  const newItems = [...removeObj.items];
  newItems.splice(index, 1);
  if (item.isMythic) {
    removeItemSet({
      ...removeObj,
      items: newItems,
      haveMythic: false,
      legendaryIDs: removeObj.legendaryIDs.filter((id) => id !== item.legendaryID),
    });
  } else if (item.legendaryID) {
    removeItemSet({
      ...removeObj,
      items: newItems,
      legendaryIDs: removeObj.legendaryIDs.filter((id) => id !== item.legendaryID),
    });
  } else {
    removeItemSet({
      ...removeObj,
      items: newItems
    });
  }
};
export default removeItem;
