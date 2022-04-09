import { action, configure, makeObservable, observable, toJS } from 'mobx';
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
      champToCompare: observable,
      setChampions: action.bound,
      setChampsToCompare: action.bound,
      setCompareChampionsStats: action.bound,
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

  setChampions(champions: ChampionModel[], lvl = 1): void {
    this.champions = champions.map((champion) => ({
      ...champion,
      attackDamage: this.calcAd(champion, lvl),
      attackSpeed: this.calcBaseAsWithLvl(champion, lvl),
      health: this.calcHealth(champion, lvl),
      armor: this.calcArmor(champion, lvl),
      magicResistance: this.calcMagicResist(champion, lvl),
    }));
  }

  setChampsToCompare(champ: ChampionModel): void {
    this.champToCompare = [
      {
        champion: { ...champ },
        id: 1,
        equipment: {
          items: [],
          haveMythic: false,
          legendaryIDs: [],
        },
      },
      {
        champion: { ...champ },
        id: 2,
        equipment: {
          items: [],
          haveMythic: false,
          legendaryIDs: [],
        },
      },
    ];
  }

  setCompareChampionsStats(
    championStats: ChampionModel,
    champId: number,
    items: SelectedItems,
  ): void {
    this.champToCompare = this.champToCompare.map((champion) => {
      if (champId === champion.id) {
        return {
          champion: { ...championStats },
          id: champId,
          equipment: { ...items },
        };
      } else {
        return {
          champion: { ...champion.champion },
          id: champion.id,
          equipment: { ...champion.equipment },
        };
      }
    });
  }

  calcNewStats(
    baseStats: ChampionModel,
    items: SelectedItems,
    champId: number,
    champLvl: number,
  ): void {
    let newStats = { ...baseStats };
    items.items.forEach((item) => {
      item.stats.forEach((field) => {
        if (field.name === StatsEnum.attackSpeed) {
          const newAS = this.calcAsWithItems(
            newStats[field.name],
            field.value,
            newStats.attackSpeedRatio,
          );
          return (newStats = {
            ...newStats,
            [field.name]: newAS,
          });
        }
        if (field.name === StatsEnum.lethality) {
          const armorFlatPen = this.calcArmFlatPen(newStats[field.name] + field.value, champLvl);
          return (newStats = {
            ...newStats,
            [field.name]: newStats[field.name] + field.value,
            armorFlatPenetration: armorFlatPen,
          });
        }
        return (newStats = {
          ...newStats,
          [field.name]: newStats[field.name] + field.value,
        });
      });
    });
    this.setCompareChampionsStats(newStats, champId, items);
  }

  calcGrowth(scale: number, lvl: number): number {
    return scale * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  calcAd(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.attackDamageScale, lvl);
    return Math.trunc(champion.attackDamageBase + growth);
  }

  calcBaseAsWithLvl(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.attackSpeedScale, lvl);
    return (
      Math.floor((champion.attackSpeedBase + growth * champion.attackSpeedRatio) * 1000) / 1000
    );
  }

  calcArmor(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.armorScale, lvl);
    return Math.trunc(champion.armorBase + growth);
  }

  calcMagicResist(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.magicResistanceScale, lvl);
    return Math.trunc(champion.magicResistanceBase + growth);
  }

  calcHealth(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.healthScale, lvl);
    return Math.trunc(champion.healthBase + growth);
  }

  calcArmFlatPen(lethality: number, lvl: number): number {
    return Math.floor(lethality * (0.6 + (0.4 * lvl) / 18) * 100) / 100;
  }

  calcAsWithItems(currentAS: number, itemAS: number, asRatio: number): number {
    return Math.floor((currentAS + itemAS * asRatio) * 1000) / 1000;
  }
}

export default ChampionsStore;
