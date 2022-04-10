import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChampStats from '../ChampStats';

const champion = {
  name: 'Ahri',
  attackDamageBase: 53,
  attackDamageScale: 3,
  attackDamage: 0,
  abilityDamageBase: 0,
  abilityDamage: 0,
  attackSpeedBase: 0.668,
  attackSpeedScale: 0.02,
  attackSpeedRatio: 0.668,
  attackSpeed: 0,
  lethality: 0,
  armorFlatPenetration: 0,
  armorPenetration: 0,
  magicFlatPenetration: 0,
  magicPenetration: 0,
  critChance: 0,
  critDamage: 1.75,
  healthBase: 500,
  healthScale: 82,
  health: 0,
  armorBase: 18,
  armorScale: 3.5,
  armor: 0,
  magicResistanceBase: 30,
  magicResistanceScale: 0.5,
  magicResistance: 0,
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
