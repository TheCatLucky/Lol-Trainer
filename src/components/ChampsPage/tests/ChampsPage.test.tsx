import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { champsList } from '../../../data';
import { ChampionsStore } from '../../../store';
import ChampsPage from '../ChampsPage';

const champsStore = new ChampionsStore(champsList);
const renderComponent = (
  <BrowserRouter>
    <ChampsPage champsStore={champsStore} />
  </BrowserRouter>
);
describe('Компонент ChampsPage', () => {
  it('отображает имя персонажа', () => {
    render(renderComponent);
    const optionName = screen.getByText(/Ahri/i);

    expect(optionName).toBeInTheDocument();
  });
  it('отображает статистику персонажа при клике', async () => {
    render(renderComponent);

    const button = screen.getByText(/Показать всех/i);
    await userEvent.click(button);
    const attackDamage = screen.getAllByText(/Физический урон/i);
    const attackSpeed = screen.getAllByText(/Скорость атаки/i);
    const armor = screen.getAllByText(/Броня/i);
    const magicResistance = screen.getAllByText(/Сопротивление магии/i);
    const health = screen.getAllByText(/Здоровье/i);
    const critChance = screen.getAllByText(/Шанс критического удара/i);
    const critDamage = screen.getAllByText(/Множитель критического удара/i);
    const lethality = screen.getAllByText(/Смертоносность/i);

    expect(attackDamage[0]).toBeInTheDocument();
    expect(attackSpeed[0]).toBeInTheDocument();
    expect(armor[0]).toBeInTheDocument();
    expect(magicResistance[0]).toBeInTheDocument();
    expect(health[0]).toBeInTheDocument();
    expect(critChance[0]).toBeInTheDocument();
    expect(critDamage[0]).toBeInTheDocument();
    expect(lethality[0]).toBeInTheDocument();
  });
  it('правильно отображает данные при изменении', async () => {
    render(renderComponent);

    const button = screen.getByText(/Показать всех/i);
    await userEvent.click(button);

    const attackDamage = screen.getAllByText(/Физический урон/i);
    expect(attackDamage[0]).toBeInTheDocument();
    expect(attackDamage[0].innerHTML).toEqual('Физический урон : 53');

    const input = screen.getByDisplayValue('1');
    await userEvent.type(input, '{backspace}2');

    const armor = screen.getAllByText(/Броня/i);
    expect(armor[0]).toBeInTheDocument();
    expect(armor[0].innerHTML).toEqual('Броня : 20');
    expect(armor[1].innerHTML).toEqual('Броня : 40');
  });
  it('при выборе одонго персонажа отображает только его статистику и изменяет её', async () => {
    render(renderComponent);

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Aatrox');

    const champNameOnScreen = screen.getByText(/на 1 уровне/i);
    const attackDamage = screen.getAllByText(/Физический урон/i);

    expect(champNameOnScreen).toBeInTheDocument();
    expect(attackDamage[0].innerHTML).toEqual('Физический урон : 60');

    const input = screen.getByDisplayValue('1');
    await userEvent.type(input, '{backspace}22');

    expect(attackDamage[0].innerHTML).toEqual('Физический урон : 145');
  });
});
