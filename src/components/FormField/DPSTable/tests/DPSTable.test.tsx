import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { champsList } from '../../../../data';
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
    expect(damageArray[0].innerHTML).toBe('53');
    expect(damageArray[10].innerHTML).toBe('26');
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
    expect(damageArray[0].innerHTML).toBe('35');
    expect(damageArray[10].innerHTML).toBe('17');
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
    expect(damageArray[0].innerHTML).toBe('91');
    expect(damageArray[10].innerHTML).toBe('45');
  });
  it('отображает dps', () => {
    render(Akshan);
    const damageArray = screen.getAllByTestId('dpsDMG');
    expect(damageArray[0].innerHTML).toBe('33');
    expect(damageArray[10].innerHTML).toBe('16');
  });
});
