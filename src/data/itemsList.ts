import { Displayed, ItemModel, StatsEnum } from '../models';

const itemsList: ItemModel[] = [
  {
    name: 'B.F.Sword',
    stats: [
      {
        name: StatsEnum.attackDamage,
        displayName: Displayed.attackDamage,
        value: 40,
      },
    ],
  },
  {
    name: 'Axiom Arc',
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
    name: 'Berserker`s Greaves',
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
];

export default itemsList;
