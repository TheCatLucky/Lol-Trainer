import { action, configure, makeObservable, observable } from 'mobx';
import { ChampionModel, SelectedItems, StatsEnum } from '../models';

configure({
  enforceActions: 'always',
});

type ChampionsToCompare = {
  champion: ChampionModel;
  id: number;
  equipment: SelectedItems;
};
//ToDo: куда-то сетить выбранного персонажа, чтобы не изменять весь стор.
class ChampionsStore {
  /**
   * Список чемпионов
   */
  champions: ChampionModel[] = [];

  champToCompare: ChampionsToCompare[] = [];

  constructor(champions: ChampionModel[]) {
    makeObservable(this, {
      champions: observable,
      champToCompare: observable,
      setChampions: action.bound,
      setChampsToCompare: action.bound,
      calcAd: action.bound,
      calcBaseAsWithLvl: action.bound,
      calcAsWithItems: action.bound,
      calcArmor: action.bound,
      calcArmFlatPen: action.bound,
      calcMagicResist: action.bound,
      calcHealth: action.bound,
      calcNewStats: action.bound,
    });
    this.setChampions(champions);
    this.setChampsToCompare(champions[0]);
  }

  /**
   * @param champions Массив чемпионов
   * @param lvl Уровень персонажа
   */
  setChampions(champions: ChampionModel[], lvl = 1): void {
    this.champions = champions.map((champion) => ({
      ...champion,
      stats: {
        ...champion.stats,
        attackDamage: this.calcAd(champion, lvl),
        attackSpeed: this.calcBaseAsWithLvl(champion, lvl),
        health: this.calcHealth(champion, lvl),
        armor: this.calcArmor(champion, lvl),
        magicResistance: this.calcMagicResist(champion, lvl),
      },
    }));
  }
  /**
   * @param champ Чемпион для сравнения
   */
  setChampsToCompare(champ: ChampionModel): void {
    this.champToCompare = [
      {
        champion: {
          ...champ
        },
        id: 1,
        equipment: {
          items: [],
          haveMythic: false,
          legendaryIDs: [],
        },
      },
      {
        champion: {
          ...champ
        },
        id: 2,
        equipment: {
          items: [],
          haveMythic: false,
          legendaryIDs: [],
        },
      },
    ];
  }
  /**
   *
   * @param championStats Статистики чемпиона
   * @param champId ID чемпиона
   * @param items Объект с  предметами
   */
  setCompareChampionsStats(
    championStats: ChampionModel,
    champId: number,
    items: SelectedItems,
  ): void {
    this.champToCompare = this.champToCompare.map((champion) => {
      if (champId === champion.id) {
        return {
          champion: {
            ...championStats
          },
          id: champId,
          equipment: {
            ...items
          },
        };
      } else {
        return {
          champion: {
            ...champion.champion
          },
          id: champion.id,
          equipment: {
            ...champion.equipment
          },
        };
      }
    });
  }
  /**
   *
   * @param baseStats Базовые статистики
   * @param items Объект с предметами
   * @param champId ID чемпиона
   * @param champLvl Уровень чемпиона
   */
  calcNewStats(
    baseStats: ChampionModel,
    items: SelectedItems,
    champId: number,
    champLvl: number,
  ): void {
    let newStats = {
      ...baseStats
    };
    items.items.forEach((item) => {
      item.stats.forEach((field) => {
        switch (field.name) {
        case StatsEnum.attackSpeed: {
          const newAS = this.calcAsWithItems(
            newStats.stats[field.name],
            field.value,
            newStats.stats.attackSpeedRatio,
          );

          return (newStats = {
            ...newStats,
            stats: {
              ...newStats.stats,
              [field.name]: newAS,
            },
          });
        }

        case StatsEnum.lethality: {
          const armorFlatPen = this.calcArmFlatPen(
            newStats.stats[field.name] + field.value,
            champLvl,
          );

          return (newStats = {
            ...newStats,
            stats: {
              ...newStats.stats,
              [field.name]: newStats.stats[field.name] + field.value,
              armorFlatPenetration: armorFlatPen,
            },
          });
        }

        default:
          return (newStats = {
            ...newStats,
            stats: {
              ...newStats.stats,
              [field.name]: newStats.stats[field.name] + field.value,
            },
          });
        }
      });
    });
    this.setCompareChampionsStats(newStats, champId, items);
  }

  /**
   * @param scale Прирост за уровень
   * @param lvl Уровень персонажа
   */
  calcGrowth(scale: number, lvl: number): number {
    return scale * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  /**
   * @param champion Чемпион
   * @param lvl Уровень чемпиона
   */
  calcAd(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.scale.attackDamage, lvl);

    return Math.round(champion.base.attackDamage + growth);
  }

  calcBaseAsWithLvl(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.scale.attackSpeed, lvl);

    return (
      Math.round((champion.base.attackSpeed + growth * champion.stats.attackSpeedRatio) * 1000) /
      1000
    );
  }

  //TODO переделать расчет армора с учетом новых характеристик:
  // базовый армор, текущий базовый, текущий бонусный и общий армор.
  calcArmor(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.scale.armor, lvl);

    return Math.round(champion.base.armor + growth);
  }

  calcMagicResist(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.scale.magicResistance, lvl);

    return Math.round(champion.base.magicResistance + growth);
  }

  calcHealth(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.scale.health, lvl);

    return Math.round(champion.base.health + growth);
  }

  calcArmFlatPen(lethality: number, lvl: number): number {
    return Math.round(lethality * (0.6 + (0.4 * lvl) / 18) * 100) / 100;
  }

  calcAsWithItems(currentAS: number, itemAS: number, asRatio: number): number {
    return Math.round((currentAS + itemAS * asRatio) * 1000) / 1000;
  }
}

export default ChampionsStore;
