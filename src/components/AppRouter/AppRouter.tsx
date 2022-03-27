import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ItemModel } from '../../models';
import { ChampionsStore } from '../../store';
import ChampsPage from '../ChampsPage';
import FormField from '../FormField';
import ItemsPage from '../ItemsPage';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

const AppRouter: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;

  return (
    <div>
      <Routes>
        <Route path='/' element={<p> Привет!</p>} />
        <Route path='/champStats' element={<ChampsPage champsStore={champsStore} />} />
        <Route path='/itesmStats' element={<ItemsPage itemsStore={itemsStore} />} />
        <Route
          path='/formField'
          element={<FormField itemsStore={itemsStore} champsStore={champsStore} />}
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
