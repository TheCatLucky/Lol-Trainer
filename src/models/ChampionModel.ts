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
   * Физический урон на 1 уровне
   */
  attackDamageLvl1: number;

  /**
   * Физический урон на 18 уровне
   */
  attackDamageLvl18: number;

  /**
   * Скорость атаки
   */
  attackSpeedBase: number;

  /**
   * Бонус скорости атаки к 18 уровню
   */
  attackSpeedBonus: number;

  /**
   * Множитель бонусов скорости атаки от предметов
   */
  attackSpeedRatio: number;

  /**
   * Множитель критического урона
   */
  critDamage: number;

  /**
   * Количество здоровья на 1 уровне
   */
  healthLvl1: number;

  /**
   * Количество здоровья на 18 уровне
   */
  healthLvl18: number;

  /**
   * Физическое сопротивление на 1 уровне
   */
  armorLvl1: number;

  /**
   * Физическое сопротивление на 18 уровне
   */
  armorLvl18: number;

  /**
   * Магическое сопротивление на 1 уровне
   */
  magicResistanceLvl1: number;

  /**
   * Магическое сопротивление на 18 уровне
   */
  magicResistanceLvl18: number;

  constructor(data: ChampionModel) {
    this.name = data.name;
    this.attackDamageLvl1 = data.attackDamageLvl1;
    this.attackDamageLvl18 = data.attackDamageLvl18;
    this.attackSpeedBase = data.attackSpeedBase;
    this.attackSpeedBonus = data.attackSpeedBonus;
    this.attackSpeedRatio = data.attackSpeedRatio;
    this.critDamage = data.critDamage;
    this.healthLvl1 = data.healthLvl1;
    this.healthLvl18 = data.healthLvl18;
    this.armorLvl1 = data.armorLvl1;
    this.armorLvl18 = data.armorLvl18;
    this.magicResistanceLvl1 = data.magicResistanceLvl1;
    this.magicResistanceLvl18 = data.magicResistanceLvl18;
  }
}

export default ChampionModel;
