import { Displayed, ItemModel, StatsEnum } from '../models';

const itemsList: ItemModel[] = [
  {
    name: 'Axiom Arc',
    cost: 3000,
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
    name: 'Bloodthirster ',
    cost: 3400,
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
    cost: 1100,
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
    cost: 2600,
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
    cost: 600,
    stats: [
      {
        name: StatsEnum.critChance,
        displayName: Displayed.critChance,
        value: 0.15,
      },
    ],
  },
  {
    name: ' Cull',
    cost: 450,
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
    cost: 300,
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
    cost: 3300,
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
    cost: 3300,
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
    cost: 450,
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
    cost: 3100,
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
    cost: 3100,
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
    cost: 2900,
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
    cost: 2800,
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
    cost: 800,
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
    cost: 3400,
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
    cost: 3300,
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
    cost: 2800,
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
    cost: 2600,
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
    cost: 1000,
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
    cost: 1300,
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
    cost: 2800,
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
    cost: 3400,
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
    cost: 3400,
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
    cost: 1100,
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
    cost: 700,
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
    cost: 3400,
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
    cost: 1450,
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
    cost: 350,
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
