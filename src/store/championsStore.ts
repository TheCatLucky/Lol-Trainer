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

  constructor(champions: ChampionModel[]) {
    makeObservable(this, {
      setChampions: action.bound,
      calcAd: action.bound,
      calcAs: action.bound,
      calcArmor: action.bound,
      calcMagicResist: action.bound,
      calcHealth: action.bound,
    });
    this.setChampions(champions);
  }

  setChampions(champions: ChampionModel[], lvl = 1): void {
    this.champions = champions.map((champion) => ({
      ...champion,
      attackDamage: this.calcAd(champion, lvl),
      attackSpeed: this.calcAs(champion, lvl),
      health: this.calcHealth(champion, lvl),
      armor: this.calcArmor(champion, lvl),
      magicResistance: this.calcMagicResist(champion, lvl),
    }));
    console.log(this.champions[0].armor, 'хранилище', lvl, 'уровень');
  }

  calcGrowth(scale: number, lvl: number): number {
    return scale * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  calcAd(champion: ChampionModel, lvl: number): number {
    const growth = this.calcGrowth(champion.attackDamageScale, lvl);
    return Math.trunc(champion.attackDamageBase + growth);
  }

  calcAs(champion: ChampionModel, lvl: number): number {
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
}

export default ChampionsStore;
