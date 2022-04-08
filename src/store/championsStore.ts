import { action, configure, makeObservable } from 'mobx';
import { ChampionModel } from '../models';

configure({
  enforceActions: 'always',
});

//ToDo: куда-то сетить выбранного персонажа, чтобы не изменять весь стор.
class ChampionsStore {
  /**
   * Список чемпионов
   */
  champions: ChampionModel[] = [];

  champToCompare: ChampionModel | null = null;

  constructor(champions: ChampionModel[]) {
    makeObservable(this, {
      setChampions: action.bound,
      calcAd: action.bound,
      calcBaseAsWithLvl: action.bound,
      calcAsWithItems: action.bound,
      calcArmor: action.bound,
      calcArmFlatPen: action.bound,
      calcMagicResist: action.bound,
      calcHealth: action.bound,
    });
    this.setChampions(champions);
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
