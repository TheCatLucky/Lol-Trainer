/**
 * Опции с персонажами
 */

import { ItemModel, LegendaryIDs } from '.';

export type Options = {
  value: string;
  name: string;
}[];

export type SelectedItems = {
  items: ItemModel[];
  haveMythic: boolean;
  legendaryIDs: LegendaryIDs[];
};
