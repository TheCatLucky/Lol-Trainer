import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { champsList } from '../../../../data';
import TestsValues from '../../../../models/enums/TestsEnum';
import { ChampionsStore } from '../../../../store';
import DPSTable from '../DPSTable';
const champsStore = new ChampionsStore(champsList);
const Ahri = (
  <BrowserRouter>
    <DPSTable champion={champsStore.champions[0]} />
  </BrowserRouter>
);
const Akshan = (
  <BrowserRouter>
    <DPSTable champion={champsStore.champions[3]} />
  </BrowserRouter>
);
describe('Компонент DPSTable Ahri', () => {
  it('отображает базовый урон', () => {
    render(Ahri);
    const damageArray = screen.getAllByTestId('baseDMG');
    expect(damageArray[0].innerHTML).toBe(TestsValues.ahri_BaseDmg_ZeroArmor);
    expect(damageArray[10].innerHTML).toBe(TestsValues.ahri_BaseDmg_100Armor);
  });

  it('отображает критический урон', () => {
    render(Ahri);
    const damageArray = screen.getAllByTestId('critDMG');
    expect(damageArray[0].innerHTML).toBe('92');
    expect(damageArray[10].innerHTML).toBe('46');
  });
  it('отображает dps', () => {
    render(Ahri);
    const damageArray = screen.getAllByTestId('dpsDMG');
    expect(damageArray[0].innerHTML).toBe(TestsValues.ahri_DpsDmg_ZeroArmor);
    expect(damageArray[10].innerHTML).toBe(TestsValues.ahri_DpsDmg_100Armor);
  });
});

describe('Компонент DPSTable Akshan', () => {
  it('отображает базовый урон', () => {
    render(Akshan);
    const damageArray = screen.getAllByTestId('baseDMG');
    expect(damageArray[0].innerHTML).toBe('52');
    expect(damageArray[10].innerHTML).toBe('26');
  });

  it('отображает критический урон', () => {
    render(Akshan);
    const damageArray = screen.getAllByTestId('critDMG');
    expect(damageArray[0].innerHTML).toBe(TestsValues.akshan_BaseDmg_ZeroArmor);
    expect(damageArray[10].innerHTML).toBe(TestsValues.akshan_BaseDmg_100Armor);
  });
  it('отображает dps', () => {
    render(Akshan);
    const damageArray = screen.getAllByTestId('dpsDMG');
    expect(damageArray[0].innerHTML).toBe(TestsValues.akshan_DpsDmg_ZeroArmor);
    expect(damageArray[10].innerHTML).toBe(TestsValues.akshan_DpsDmg_100Armor);
  });
});
