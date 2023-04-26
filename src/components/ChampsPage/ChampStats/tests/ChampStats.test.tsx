import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ChampionModel } from '../../../../models';
import ChampStats from '../ChampStats';

const champion: ChampionModel = {
  name: 'Ари',
  base: {
    attackDamage: 53,
    abilityDamage: 0,
    attackSpeed: 0.668,
    health: 500,
    armor: 18,
    magicResistance: 30,
  },
  scale: {
    attackDamage: 3,
    attackSpeed: 0.02,
    health: 82,
    armor: 3.5,
    magicResistance: 0.5,
  },
  stats: {
    attackDamage: 0,
    abilityDamage: 0,
    attackSpeedRatio: 0.668,
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
  spells: [
    {
      name: 'Q',
      img: 'Q',
      baseDamage: [40, 65, 90, 115, 140],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.4, 0.4, 0.4, 0.4, 0.4],
    },
    {
      name: 'W',
      img: 'W',
      baseDamage: [80, 120, 160, 200, 240],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.48, 0.48, 0.48, 0.48, 0.48],
    },
    {
      name: 'E',
      img: 'E',
      baseDamage: [80, 110, 140, 170, 200],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.6, 0.6, 0.6, 0.6, 0.6],
    },
    {
      name: 'R',
      img: 'R',
      baseDamage: [60, 90, 120],
      scaleAd: [0, 0, 0, 0, 0],
      scaleAp: [0.35, 0.35, 0.35],
    },
  ],
};
const renderComponent = (
  <BrowserRouter>
    <ChampStats champion={champion}
      lvl={1}
    />
  </BrowserRouter>
);

describe('Компонент ChampStats', () => {
  beforeEach(() => {
    render(renderComponent);
    const intersectionObserverMock = () => ({
      observe: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
  });

  it('отображает имя персонажа', () => {
    const optionName = screen.getByText(/Ари/i);
    expect(optionName).toBeInTheDocument();
  });

  it('отображает статистику персонажа', () => {

    const attackDamage = screen.getByText(/Физический урон/i);
    const abilityDamage = screen.getByText(/Магический урон/i);
    const attackSpeed = screen.getByText(/Скорость атаки/i);
    const armor = screen.getByText(/Броня/i);
    const magicResistance = screen.getByText(/Сопротивление магии/i);
    const health = screen.getByText(/Здоровье/i);

    expect(attackDamage).toBeInTheDocument();
    expect(abilityDamage).toBeInTheDocument();
    expect(attackSpeed).toBeInTheDocument();
    expect(armor).toBeInTheDocument();
    expect(magicResistance).toBeInTheDocument();
    expect(health).toBeInTheDocument();
    expect(attackDamage.innerHTML).toEqual('Физический урон : 0');
  });
});
