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

  setChampions(data: ChampionModel[], lvl = 1): void {
    this.champions = data.map((champ) => ({
      ...champ,
      critChance: 0,
      abilityDamage: 0,
      lethality: 0,
      armorPenetration: 0,
      magicFlatPenetration: 0,
      magicPenetration: 0,
      attackDamage: this.calcAd(champ, lvl),
      attackSpeed: this.calcAs(champ, lvl),
      health: this.calcHealth(champ, lvl),
      armor: this.calcArmor(champ, lvl),
      magicResistance: this.calcMagicResist(champ, lvl),
    }));
    console.log(this.champions[0].armor, 'хранилище', lvl, 'уровень');
  }

  calcGrowth(diff: number, lvl: number): number {
    return diff * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  calcAd(data: ChampionModel, lvl: number): number {
    const diff = (data.attackDamageLvl18 - data.attackDamageLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(data.attackDamageLvl1 + growth);
  }

  calcAs(data: ChampionModel, lvl: number): number {
    const diff = data.attackSpeedBonus / 1700;
    const growth = this.calcGrowth(diff, lvl);
    return Math.floor((data.attackSpeedBase + growth * data.attackSpeedRatio) * 1000) / 1000;
  }

  calcArmor(data: ChampionModel, lvl: number): number {
    const diff = (data.armorLvl18 - data.armorLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(data.armorLvl1 + growth);
  }

  calcMagicResist(data: ChampionModel, lvl: number): number {
    const diff = (data.magicResistanceLvl18 - data.magicResistanceLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(data.magicResistanceLvl1 + growth);
  }

  calcHealth(data: ChampionModel, lvl: number): number {
    const diff = (data.healthLvl18 - data.healthLvl1) / 17;
    const growth = this.calcGrowth(diff, lvl);
    return Math.trunc(data.healthLvl1 + growth);
  }
}

export default ChampionsStore;
