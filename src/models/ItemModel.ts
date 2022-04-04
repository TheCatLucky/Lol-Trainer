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
   * Изображение предмета
   */
  img: string;
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
    this.img = data.img;
    this.cost = data.cost;
  }
}

export default ItemModel;
