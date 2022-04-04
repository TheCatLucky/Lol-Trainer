import { action, configure, makeObservable } from 'mobx';
import { ChampionModel } from '../models';

configure({
  enforceActions: 'always',
});

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
      critChance: 0,
      abilityDamage: 0,
      lethality: 0,
      armorPenetration: 0,
      magicFlatPenetration: 0,
      magicPenetration: 0,
      attackDamage: this.calcAd(champion, lvl),
      attackSpeed: this.calcAs(champion, lvl),
      health: this.calcHealth(champion, lvl),
      armor: this.calcArmor(champion, lvl),
      magicResistance: this.calcMagicResist(champion, lvl),
    }));
    console.log(this.champions[0].armor, 'хранилище', lvl, 'уровень');
  }

  calcGrowth(diff: number, lvl: number): number {
    return diff * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  calcAd(champion: ChampionModel, lvl: number): number {
    const diff = (champion.attackDamageLvl18 - champion.attackDamageLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(champion.attackDamageLvl1 + growth);
  }

  calcAs(champion: ChampionModel, lvl: number): number {
    const diff = champion.attackSpeedBonus / 1700;
    const growth = this.calcGrowth(diff, lvl);
    return (
      Math.floor((champion.attackSpeedBase + growth * champion.attackSpeedRatio) * 1000) / 1000
    );
  }

  calcArmor(champion: ChampionModel, lvl: number): number {
    const diff = (champion.armorLvl18 - champion.armorLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(champion.armorLvl1 + growth);
  }

  calcMagicResist(champion: ChampionModel, lvl: number): number {
    const diff = (champion.magicResistanceLvl18 - champion.magicResistanceLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(champion.magicResistanceLvl1 + growth);
  }

  calcHealth(champion: ChampionModel, lvl: number): number {
    const diff = (champion.healthLvl18 - champion.healthLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(champion.healthLvl1 + growth);
  }
}

export default ChampionsStore;
