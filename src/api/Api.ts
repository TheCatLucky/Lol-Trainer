import axios from 'axios';
import { spells } from '../data/spellList';
import { ChampionModel } from '../models';
import { ApiResponse } from '../models/ApiResponse';

const version = '12.12.1';

export const riotAPI = {
  getRuChamps() {

    const champs: ChampionModel[] = [];

    return axios.get<ApiResponse>(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/champion.json`).then((data) => {
      const champPool = data.data.data;
      const keys = Object.keys(champPool);

      keys.forEach(key => {
        const champ = champPool[key];
        const stats = champ.stats;
        const champion: ChampionModel = {
          name: champ.name,
          base: {
            attackDamage: stats.attackdamage,
            abilityDamage: 0,
            attackSpeed: stats.attackspeed,
            health: stats.hp,
            armor: stats.armor,
            magicResistance: stats.spellblock
          },
          scale: {
            attackDamage: stats.attackdamageperlevel,
            attackSpeed: stats.attackspeedperlevel / 100,
            health: stats.hpperlevel,
            armor: stats.armorperlevel,
            magicResistance: stats.spellblockperlevel
          },
          stats: {
            attackDamage: 0,
            abilityDamage: 0,
            attackSpeedRatio: stats.attackspeed,
            attackSpeed: 0,
            lethality: 0,
            armorFlatPenetration: 0,
            armorPenetration: 0,
            magicFlatPenetration: 0,
            magicPenetration: 0,
            critChance: 0,
            critDamage: 1.75,
            health: 0,
            armor: 0,
            armorBonus: 0,
            armorBaseCurrent: 0,
            magicResistance: 0,
          },
          spells: spells['Ahri']
        };
        if(champ.name === 'Акшан') {
          champion.stats.attackSpeedRatio = 0.4;
        };

        champs.push(champion);
      });

      return champs.sort((a, b) => {
        const collator = new Intl.Collator('ru');

        return collator.compare(a.name, b.name);
      });
    });
  },

  getEuChamps() {
    return axios.get<ApiResponse>( `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).then((data) => {
      return data.data.data;
    });
  }
};