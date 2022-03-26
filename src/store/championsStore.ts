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
    });
    this.setChampions(champions);
  }

  setChampions(data: ChampionModel[]): void {
    this.champions = data.map((champ) => ({
      ...champ,
      critChance: 0,
      abilityDamage: 0,
      lethality: 0,
      armorPenetration: 0,
      magicFlatPenetration: 0,
      magicPenetration: 0,
    }));
  }

  calcAd(data: ChampionModel, lvl: number): number {
    const diff = (data.attackDamageLvl18 - data.attackDamageLvl1) / 17;
    return data.attackDamageLvl1 + diff * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
  }

  calcAs(data: ChampionModel, lvl: number): number {
    const diff = data.attackSpeedBonus / 100;
    return (
      data.attackSpeed + diff * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1)) * data.attackSpeedRatio
    );
  }
}

export default ChampionsStore;
