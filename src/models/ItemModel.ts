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

  /**
   * Изображение предмета
   */
  img: string;

  /**
   * Идентификатор предмета
   */
  id: number;

  /**
   * Идентификатор легендарного предмета
   */
  legendaryID?: number;

  /**
   * Является предмет мифическим
   */
  isMythic?: boolean;

  stats: {
    name: StatsEnum;
    displayName: Displayed;
    value: number;
  }[];

  constructor(data: ItemModel) {
    this.name = data.name;
    this.cost = data.cost;
    this.img = data.img;
    this.id = data.id;
    this.stats = data.stats;
  }
}

export default ItemModel;
