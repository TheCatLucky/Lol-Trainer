import Displayed from './enums/DisplayedEnum';
import StatsEnum from './enums/StatsEnum';

/**
 * Модель предмета.
 */
class ItemModel {
  /**
   * Название предмета
   */
  name: string;

  /**
   * Цена предмета
   */
  cost: number;

  stats: {
    name: StatsEnum;
    displayName: Displayed;
    value: number;
  }[];

  constructor(data: ItemModel) {
    this.name = data.name;
    this.stats = data.stats;
    this.cost = data.cost;
  }
}

export default ItemModel;
