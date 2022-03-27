import Displayed from './DisplayedEnum';
import StatsEnum from './StatsEnum';

/**
 * Модель предмета.
 */
class ItemModel {
  /**
   * Название предмета
   */
  name: string;

  stats: {
    name: StatsEnum;
    displayName: Displayed;
    value: number;
  }[];

  constructor(data: ItemModel) {
    this.name = data.name;
    this.stats = data.stats;
  }
}

export default ItemModel;
