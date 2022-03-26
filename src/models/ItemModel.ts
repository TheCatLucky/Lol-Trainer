/**
 * Модель элемента категории.
 */
class ItemModel {
  /**
   * Название персонажа
   */
  name: string;

  /**
   * Шанс нанесения критического урона
   */
  critChance?: number;

  /**
   * Скорость атаки
   */
  attackSpeed?: number;

  /**
   * Физический урон
   */
  attackDamage?: number;

  /**
   * Магический урон
   */
  abilityDamage?: number;

  /**
   * Физическое сопротивление
   */
  armor?: number;

  /**
   * Магическое сопротивление
   */
  magicResistance?: number;

  /**
   * Здоровье
   */
  health?: number;

  /**
   * Смертоносность
   */
  lethality?: number;

  /**
   * Физическое пробивание
   */
  armorPenetration?: number;

  /**
   * Магическое пробивание flat
   */
  magicFlatPenetration?: number;

  /**
   * Магическое пробивание в процентах
   */
  magicPenetration?: number;

  constructor(data: ItemModel) {
    this.name = data.name;
  }
}

export default ItemModel;
