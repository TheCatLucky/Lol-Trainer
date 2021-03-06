import { Displayed, ItemModel, LegendaryIDs, StatsEnum } from '../models';
import {
  Axiom_Arc,
  BFSword,
  Berserkers,
  Black_Cleaver,
  Black_Mist_Scythe,
  Botrk,
  Bloodthirster,
  Caulfields_Warhammer,
  Chempunk_Chainsword,
  Cloak_of_Agility,
  Cull,
  Dagger,
  Deaths_Dance,
  Divine_Sunderer,
  Dorans_Blade,
  Duskblade_of_Draktharr,
  Eclipse,
  Edge_of_Night,
  Essence_Reaver,
  Executioners_Calling,
  Galeforce,
  Goredrinker,
  Guardian_Angel,
  Guinsoos_Rageblade,
  Hearthbound_Axe,
  Hexdrinker,
  Hullbreaker,
  Immortal_Shieldbow,
  Infinity_Edge,
  Ironspike_Whip,
  Kircheis_Shard,
  Kraken_Slayer,
  Last_Whisper,
  Long_Sword,
} from '../assets';

const itemsList: ItemModel[] = [
  {
    name: 'Axiom Arc',
    cost: 3000,
    id: 1,
    legendaryID: LegendaryIDs.axiom_arc,
    img: Axiom_Arc,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 55,
      },
      {
        name: StatsEnum.lethality,
        displayName: Displayed.lethality,
        value: 10,
      },
    ],
  },
  {
    name: 'B.F.Sword',
    cost: 1300,
    img: BFSword,
    id: 2,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 40,
      },
    ],
  },
  {
    name: 'Berserker`s Greaves',
    cost: 1100,
    img: Berserkers,
    id: 2,
    legendaryID: LegendaryIDs.boots,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.35,
      },
    ],
  },
  {
    name: 'Black Cleaver',
    cost: 3100,
    img: Black_Cleaver,
    id: 3,
    legendaryID: LegendaryIDs.black_cleaver,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 45,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 350,
      },
    ],
  },
  {
    name: 'Black Mist Scythe',
    cost: 400,
    img: Black_Mist_Scythe,
    id: 4,
    legendaryID: LegendaryIDs.jungle_or_support,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 20,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 75,
      },
    ],
  },
  {
    name: 'Blade of the Ruined King',
    cost: 3300,
    img: Botrk,
    id: 5,
    legendaryID: LegendaryIDs.botrk,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 40,
      },
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.25,
      },
    ],
  },
  {
    name: 'Bloodthirster',
    img: Bloodthirster,
    cost: 3400,
    id: 6,
    legendaryID: LegendaryIDs.bloodThister,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 55,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
    ],
  },
  {
    name: 'Caulfield`s Warhammer ',
    img: Caulfields_Warhammer,
    cost: 1100,
    id: 7,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 25,
      },
    ],
  },
  {
    name: 'Chempunk Chainsword',
    img: Chempunk_Chainsword,
    cost: 2600,
    id: 8,
    legendaryID: LegendaryIDs.chempunk_chainsword,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 45,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 250,
      },
    ],
  },
  {
    name: 'Cloak of Agility',
    img: Cloak_of_Agility,
    cost: 600,
    id: 9,
    stats: [
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.15,
      },
    ],
  },
  {
    name: 'Cull',
    img: Cull,
    cost: 450,
    id: 10,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 7,
      },
    ],
  },
  {
    name: 'Dagger',
    img: Dagger,
    cost: 300,
    id: 11,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.12,
      },
    ],
  },
  {
    name: 'Death`s Dance',
    img: Deaths_Dance,
    cost: 3300,
    id: 12,
    legendaryID: LegendaryIDs.death_dance,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 55,
      },
      {
        name: StatsEnum.armor,
        displayName: Displayed.armor,
        value: 45,
      },
    ],
  },
  {
    name: 'Divine Sunderer',
    img: Divine_Sunderer,
    cost: 3300,
    id: 13,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 40,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 300,
      },
    ],
  },
  {
    name: 'Doran`s Blade',
    img: Dorans_Blade,
    cost: 450,
    id: 14,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 8,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 40,
      },
    ],
  },
  {
    name: 'Duskblade of Draktharr',
    img: Duskblade_of_Draktharr,
    cost: 3100,
    id: 15,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 60,
      },
      {
        name: StatsEnum.lethality,
        displayName: Displayed.lethality,
        value: 18,
      },
    ],
  },
  {
    name: 'Eclipse',
    img: Eclipse,
    cost: 3100,
    id: 16,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 55,
      },
      {
        name: StatsEnum.lethality,
        displayName: Displayed.lethality,
        value: 18,
      },
    ],
  },
  {
    name: 'Edge of Night',
    img: Edge_of_Night,
    cost: 2900,
    id: 17,
    legendaryID: LegendaryIDs.edge_of_night,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 50,
      },
      {
        name: StatsEnum.lethality,
        displayName: Displayed.lethality,
        value: 10,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 325,
      },
    ],
  },
  {
    name: 'Essence Reaver',
    img: Essence_Reaver,
    cost: 2800,
    id: 18,
    legendaryID: LegendaryIDs.essence_reaver,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 45,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
    ],
  },
  {
    name: 'Executioner`s Calling',
    img: Executioners_Calling,
    cost: 800,
    id: 19,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 15,
      },
    ],
  },
  {
    name: 'Galeforce',
    img: Galeforce,
    cost: 3400,
    id: 20,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 60,
      },
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.2,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
    ],
  },
  {
    name: 'Goredrinker',
    img: Goredrinker,
    cost: 3300,
    id: 21,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 55,
      },
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 300,
      },
    ],
  },
  {
    name: 'Guardian Angel',
    img: Guardian_Angel,
    cost: 2800,
    id: 22,
    legendaryID: LegendaryIDs.guardian_angel,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 40,
      },
      {
        name: StatsEnum.armor,
        displayName: Displayed.armor,
        value: 40,
      },
    ],
  },
  {
    name: 'Guinsoo`s Rageblade',
    img: Guinsoos_Rageblade,
    cost: 2600,
    id: 23,
    legendaryID: LegendaryIDs.crit_modifier,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.45,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
    ],
  },
  {
    name: 'Hearthbound Axe',
    img: Hearthbound_Axe,
    cost: 1000,
    id: 24,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.15,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 0.15,
      },
    ],
  },
  {
    name: 'Hexdrinker',
    img: Hexdrinker,
    cost: 1300,
    id: 25,
    legendaryID: LegendaryIDs.lifeline,
    stats: [
      {
        name: StatsEnum.magicResistance,
        displayName: Displayed.magicResistance,
        value: 35,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 25,
      },
    ],
  },
  {
    name: 'Hullbreaker',
    img: Hullbreaker,
    cost: 2800,
    id: 26,
    legendaryID: LegendaryIDs.hullbreaker,
    stats: [
      {
        name: StatsEnum.health,
        displayName: Displayed.health,
        value: 400,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 50,
      },
    ],
  },
  {
    name: 'Immortal Shieldbow',
    img: Immortal_Shieldbow,
    cost: 3400,
    id: 27,
    legendaryID: LegendaryIDs.lifeline,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.2,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 50,
      },
    ],
  },
  {
    name: 'Infinity Edge',
    img: Infinity_Edge,
    cost: 3400,
    id: 28,
    legendaryID: LegendaryIDs.crit_modifier,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.2,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 70,
      },
    ],
  },
  {
    name: 'Ironspike Whip',
    img: Ironspike_Whip,
    cost: 1100,
    id: 29,
    legendaryID: LegendaryIDs.mythic_component,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 30,
      },
    ],
  },
  {
    name: 'Kircheis Shard',
    img: Kircheis_Shard,
    cost: 700,
    id: 30,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.15,
      },
    ],
  },
  {
    name: 'Kraken Slayer',
    img: Kraken_Slayer,
    cost: 3400,
    id: 31,
    isMythic: true,
    stats: [
      {
        name: StatsEnum.attackSpeed,
        displayName: Displayed.attackSpeed,
        value: 0.25,
      },
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.2,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 65,
      },
    ],
  },
  {
    name: 'Last Whisper',
    img: Last_Whisper,
    cost: 1450,
    id: 32,
    legendaryID: LegendaryIDs.last_wisper,
    stats: [
      {
        name: StatsEnum.armorPenetration,
        displayName: Displayed.armorPenetration,
        value: 0.2,
      },
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 20,
      },
    ],
  },
  {
    name: 'Long Sword',
    img: Long_Sword,
    cost: 350,
    id: 33,
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 10,
      },
    ],
  },
];

export default itemsList;
