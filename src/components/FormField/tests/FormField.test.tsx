import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { champsList, itemsList } from '../../../data';
import { ChampionsStore, ItemsStore } from '../../../store';
import FormField from '../FormField';

const champsStore = new ChampionsStore(champsList);
const itemStore = new ItemsStore(itemsList);
const renderComponent = (
  <BrowserRouter>
    <FormField champsStore={champsStore} itemsStore={itemStore.items} />
  </BrowserRouter>
);
describe('Компонент FormField', () => {
  it('отображает базовый урон', () => {
    render(renderComponent);

    const baseDamageArray = screen.getAllByTestId('baseDMG');
    expect(baseDamageArray[0].innerHTML).toBe('53');
    expect(baseDamageArray[10].innerHTML).toBe('26');
  });

  it('отображает критический урон', () => {
    render(renderComponent);

    const critDamageArray = screen.getAllByTestId('critDMG');
    expect(critDamageArray[0].innerHTML).toBe('92');
    expect(critDamageArray[10].innerHTML).toBe('46');
  });
  it('отображает dps', () => {
    render(renderComponent);

    const dpsArray = screen.getAllByTestId('dpsDMG');
    expect(dpsArray[0].innerHTML).toBe('35');
    expect(dpsArray[10].innerHTML).toBe('17');
  });
  it('отображает верно статистику при изменении уровня', async () => {
    render(renderComponent);

    const input = screen.getByDisplayValue('1');
    await userEvent.type(input, '{backspace}10');

    const baseDamageArray = screen.getAllByTestId('baseDMG');
    expect(baseDamageArray[0].innerHTML).toBe('76');
    expect(baseDamageArray[10].innerHTML).toBe('38');

    const critDamageArray = screen.getAllByTestId('critDMG');
    expect(critDamageArray[0].innerHTML).toBe('133');
    expect(critDamageArray[10].innerHTML).toBe('66');

    const dpsArray = screen.getAllByTestId('dpsDMG');
    expect(dpsArray[0].innerHTML).toBe('58');
    expect(dpsArray[10].innerHTML).toBe('29');
  });
  it('отображает верно статистику при добавлении предметов', async () => {
    render(renderComponent);

    const input = screen.getByPlaceholderText('введите уровень персонажа');
    await userEvent.type(input, '{backspace}10');

    const baseDamageArray = screen.getAllByTestId('baseDMG');
    const critDamageArray = screen.getAllByTestId('critDMG');
    const dpsArray = screen.getAllByTestId('dpsDMG');

    const items = screen.getAllByRole('img');
    await userEvent.click(items[0]);

    expect(baseDamageArray[0].innerHTML).toBe('131');
    expect(baseDamageArray[10].innerHTML).toBe('68');
    expect(critDamageArray[0].innerHTML).toBe('229');
    expect(critDamageArray[10].innerHTML).toBe('119');
    expect(dpsArray[0].innerHTML).toBe('101');
    expect(dpsArray[10].innerHTML).toBe('52');

    await userEvent.click(items[2]);
    expect(dpsArray[0].innerHTML).toBe('131');
    expect(dpsArray[10].innerHTML).toBe('68');

    fireEvent.contextMenu(items[1]);
    expect(baseDamageArray[11].innerHTML).toBe('116');
    expect(baseDamageArray[21].innerHTML).toBe('58');
    expect(dpsArray[11].innerHTML).toBe('89');
    expect(dpsArray[21].innerHTML).toBe('44');

    fireEvent.contextMenu(items[6]);
    expect(baseDamageArray[11].innerHTML).toBe('171');
    expect(baseDamageArray[21].innerHTML).toBe('85');
    expect(dpsArray[11].innerHTML).toBe('151');
    expect(dpsArray[21].innerHTML).toBe('75');

    await userEvent.type(input, '{backspace}18');
    expect(baseDamageArray[0].innerHTML).toBe('159');
    expect(baseDamageArray[10].innerHTML).toBe('83');
    expect(dpsArray[0].innerHTML).toBe('179');
    expect(dpsArray[10].innerHTML).toBe('94');
    expect(baseDamageArray[11].innerHTML).toBe('199');
    expect(baseDamageArray[21].innerHTML).toBe('99');
    expect(dpsArray[11].innerHTML).toBe('204');
    expect(dpsArray[21].innerHTML).toBe('102');

    const leftChampionItems = screen.getAllByRole('img');

    await userEvent.click(leftChampionItems[34]);
    expect(baseDamageArray[0].innerHTML).toBe('104');
    expect(baseDamageArray[10].innerHTML).toBe('52');
    expect(dpsArray[0].innerHTML).toBe('117');
    expect(dpsArray[10].innerHTML).toBe('58');

    await userEvent.click(leftChampionItems[36]);
    expect(baseDamageArray[11].innerHTML).toBe('159');
    expect(baseDamageArray[21].innerHTML).toBe('79');
    expect(dpsArray[11].innerHTML).toBe('163');
    expect(dpsArray[21].innerHTML).toBe('81');

    await userEvent.type(input, '{backspace}{backspace}8');
    expect(baseDamageArray[0].innerHTML).toBe('70');
    expect(baseDamageArray[10].innerHTML).toBe('35');
    expect(dpsArray[0].innerHTML).toBe('68');
    expect(dpsArray[10].innerHTML).toBe('34');
    expect(baseDamageArray[11].innerHTML).toBe('125');
    expect(baseDamageArray[21].innerHTML).toBe('62');
    expect(dpsArray[11].innerHTML).toBe('107');
    expect(dpsArray[21].innerHTML).toBe('53');
  });

  it('не позволяет выбрать 2 уникальных предмета', async () => {
    render(renderComponent);

    const baseDamageArray = screen.getAllByTestId('baseDMG');
    const dpsArray = screen.getAllByTestId('dpsDMG');
    const items = screen.getAllByRole('img');

    const input = screen.getByPlaceholderText('введите уровень персонажа');
    await userEvent.type(input, '{backspace}1');

    await userEvent.click(items[0]);
    expect(baseDamageArray[0].innerHTML).toBe('108');
    expect(baseDamageArray[10].innerHTML).toBe('55');
    expect(dpsArray[0].innerHTML).toBe('72');
    expect(dpsArray[10].innerHTML).toBe('37');

    await userEvent.click(items[0]);
    expect(baseDamageArray[0].innerHTML).toBe('108');
    expect(baseDamageArray[10].innerHTML).toBe('55');
    expect(dpsArray[0].innerHTML).toBe('72');
    expect(dpsArray[10].innerHTML).toBe('37');
  });
  it('позволяет выбирать не уникальный предметы 2+ раз', async () => {
    render(renderComponent);

    const baseDamageArray = screen.getAllByTestId('baseDMG');
    const dpsArray = screen.getAllByTestId('dpsDMG');
    const items = screen.getAllByRole('img');

    await userEvent.click(items[1]);
    expect(baseDamageArray[0].innerHTML).toBe('93');
    expect(baseDamageArray[10].innerHTML).toBe('46');
    expect(dpsArray[0].innerHTML).toBe('62');
    expect(dpsArray[10].innerHTML).toBe('31');

    await userEvent.click(items[1]);
    expect(baseDamageArray[0].innerHTML).toBe('133');
    expect(baseDamageArray[10].innerHTML).toBe('66');
    expect(dpsArray[0].innerHTML).toBe('88');
    expect(dpsArray[10].innerHTML).toBe('44');
  });
});
