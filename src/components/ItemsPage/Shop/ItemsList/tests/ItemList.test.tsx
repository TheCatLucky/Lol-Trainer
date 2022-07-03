import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { itemsList } from '../../../../../data';
import ItemList from '../ItemList';

/* eslint-disable no-console */
const renderComponent = (
  <BrowserRouter>
    <ItemList chooseItemLeftClick={() => {

      console.log('first');

    }}
    chooseItemRightClick={() => {

      console.log('first');

    }}
    items={itemsList}
    />
  </BrowserRouter>
);

describe('Компонент ChampsPage', () => {

  beforeEach(() => {

    const intersectionObserverMock = () => ({
      observe: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

  });

  it('отображает все предметы', () => {

    render(renderComponent);
    const items = screen.getAllByRole('img');
    expect(items.length).toBe(37);

  });

  it('при наведении на предмет показывает его статистики', async () => {

    render(renderComponent);

    const items = screen.getAllByRole('img');

    await userEvent.hover(items[0]);
    const itemName = screen.getByText('Axiom Arc');
    const itemCost = screen.getByText(/Стоимость предмета/i);

    expect(itemName).toBeInTheDocument();
    expect(itemCost.innerHTML).toEqual('Стоимость предмета : 3000');

  });

  it('при быстром перемещение с предмета на предмет изменяет показываемое описание', async () => {

    render(renderComponent);

    const items = screen.getAllByRole('img');

    await userEvent.hover(items[1]);
    const firstItem = screen.getByText(/Sword/i);
    expect(firstItem).toBeInTheDocument();

    await userEvent.hover(items[2]);
    const secondItem = screen.getByText(/Greaves/i);
    expect(secondItem).toBeInTheDocument();

    await userEvent.hover(items[3]);
    await userEvent.hover(items[4]);
    await userEvent.hover(items[5]);
    await userEvent.hover(items[6]);

    const sixthItem = screen.getByText(/Blood/i);
    expect(sixthItem).toBeInTheDocument();

  });

});
