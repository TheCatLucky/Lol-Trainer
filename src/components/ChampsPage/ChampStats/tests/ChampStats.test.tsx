import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChampStats from '../ChampStats';

const champion = {
  name: 'Ahri',
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
};
const renderComponent = (
  <BrowserRouter>
    <ChampStats lvl={1} champion={champion} />
  </BrowserRouter>
);
describe('Компонент ChampStats', () => {
  it('отображает имя персонажа', () => {
    render(renderComponent);

    const optionName = screen.getByText(/Ahri/i);

    expect(optionName).toBeInTheDocument();
  });
  it('отображает статистику персонажа', () => {
    render(renderComponent);

    const attackDamage = screen.getByText(/Физический урон/i);
    const attackSpeed = screen.getByText(/Скорость атаки/i);
    const armor = screen.getByText(/Броня/i);
    const magicResistance = screen.getByText(/Сопротивление магии/i);
    const health = screen.getByText(/Здоровье/i);
    const critChance = screen.getByText(/Шанс критического удара/i);
    const critDamage = screen.getByText(/Множитель критического удара/i);
    const lethality = screen.getByText(/Смертоносность/i);

    expect(attackDamage).toBeInTheDocument();
    expect(attackSpeed).toBeInTheDocument();
    expect(armor).toBeInTheDocument();
    expect(magicResistance).toBeInTheDocument();
    expect(health).toBeInTheDocument();
    expect(critChance).toBeInTheDocument();
    expect(critDamage).toBeInTheDocument();
    expect(lethality).toBeInTheDocument();
    expect(attackDamage.innerHTML).toEqual('Физический урон : 0');
  });
});
