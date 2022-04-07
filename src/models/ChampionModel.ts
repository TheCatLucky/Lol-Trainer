/**
 * Модель чемпиона.
 */
class ChampionModel {
  [index: string]: string | number;

  /**
   * Название персонажа
   */
  name: string;

  /**
   * Базовый физический урон
   */
  attackDamageBase: number;

  /**
   * Скейл физического урона
   */
  attackDamageScale: number;

  /**
   * Текущий физический урон
   */
  attackDamage: number;

  /**
   * Базовый магический урон
   */
  abilityDamageBase: number;

  /**
   * Текущий магический урон
   */
  abilityDamage: number;

  /**
   * Базовая скорость атаки
   */
  attackSpeedBase: number;

  /**
   * Скейл скорости атаки
   */
  attackSpeedScale: number;

  /**
   * Множитель бонусов скорости атаки от предметов и уровня
   */
  attackSpeedRatio: number;

  /**
   * Текущая скорость атаки
   */
  attackSpeed: number;

  /**
   * Смертоносность
   */
  lethality: number;

  /**
   * Физическое пробивание
   */
  armorPenetration: number;

  /**
   * Магическое пробивание flat
   */
  magicFlatPenetration: number;

  /**
   * Магическое пробивание
   */
  magicPenetration: number;

  /**
   * Шанс критического урона
   */
  critChance: number;

  /**
   * Множитель критического урона
   */
  critDamage: number;

  /**
   * Базовое количество здоровья
   */
  healthBase: number;

  /**
   * Скейл здоровья
   */
  healthScale: number;

  /**
   * Текущее здоровье
   */
  health: number;

  /**
   * Базовое физическое сопротивление
   */
  armorBase: number;

  /**
   * Скейл физического сопротивления
   */
  armorScale: number;

  /**
   * Текущее физическое сопротивление
   */
  armor: number;

  /**
   * Магическое сопротивление Базовый
   */
  magicResistanceBase: number;

  /**
   * Скейл магического сопротивления
   */
  magicResistanceScale: number;

  /**
   * Текущее магическое сопротивление
   */
  magicResistance: number;

  constructor(data: ChampionModel) {
    this.name = data.name;
    this.attackDamageBase = data.attackDamageBase;
    this.attackDamageScale = data.attackDamageScale;
    this.attackDamage = data.attackDamage;
    this.abilityDamageBase = data.abilityDamageBase;
    this.abilityDamage = data.abilityDamage;
    this.attackSpeedBase = data.attackSpeedBase;
    this.attackSpeedScale = data.attackSpeedScale;
    this.attackSpeedRatio = data.attackSpeedRatio;
    this.attackSpeed = data.attackSpeed;
    this.lethality = data.lethality;
    this.armorPenetration = data.armorPenetration;
    this.magicFlatPenetration = data.magicFlatPenetration;
    this.magicPenetration = data.magicPenetration;
    this.critChance = data.critChance;
    this.critDamage = data.critDamage;
    this.healthBase = data.healthBase;
    this.healthScale = data.healthScale;
    this.health = data.health;
    this.armorBase = data.armorBase;
    this.armorScale = data.armorScale;
    this.armor = data.armor;
    this.magicResistanceBase = data.magicResistanceBase;
    this.magicResistanceScale = data.magicResistanceScale;
    this.magicResistance = data.magicResistance;
  }
}

export default ChampionModel;
