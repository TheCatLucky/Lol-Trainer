/**
 * Модель чемпиона.
 */
export type Spell = {
  name: string;
  img: string;
  baseDamage: number[];
  scaleAp: number[];
  scaleAd: number[];
};
class ChampionModel {
  [index: string]: string | number | Record<string, unknown> | Spell[];

  /**
   * Название персонажа
   */
  name: string;

  base: {
    /**
     * Базовый физический урон
     */
    attackDamage: number;

    /**
     * Базовый магический урон
     */
    abilityDamage: number;

    /**
     * Базовая скорость атаки
     */
    attackSpeed: number;

    /**
     * Базовое количество здоровья
     */

    health: number;
    /**
     * Базовое физическое сопротивление
     */
    armor: number;

    /**
     * Магическое сопротивление Базовый
     */
    magicResistance: number;
  };

  scale: {
    /**
     * Скейл физического урона
     */
    attackDamage: number;

    /**
     * Скейл скорости атаки
     */
    attackSpeed: number;

    /**
     * Скейл здоровья
     */
    health: number;

    /**
     * Скейл физического сопротивления
     */
    armor: number;

    /**
     * Скейл магического сопротивления
     */
    magicResistance: number;
  };

  stats: {
    /**
     * Текущий физический урон
     */
    attackDamage: number;

    /**
     * Текущий магический урон
     */
    abilityDamage: number;

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
     * Физическое пробивание flat
     */
    armorFlatPenetration: number;

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
     * Текущее здоровье
     */
    health: number;

    /**
     * Текущее общее физическое сопротивление
     */
    armor: number;

    /**
     * Текущее дополнительное физическое сопротивление
     */
    armorBonus: number;

    /**
     * Текущее базовое физическое сопротивление
     */
    armorBaseCurrent: number;

    /**
     * Текущее магическое сопротивление
     */
    magicResistance: number;
  };

  spells: Spell[];

  constructor(data: ChampionModel) {
    this.name = data.name;
    this.base = data.base;
    this.scale = data.scale;
    this.stats = data.stats;
    this.spells = data.spells;
  }
}

export default ChampionModel;
