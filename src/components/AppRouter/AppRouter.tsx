import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChampionsStore, ItemsStore } from '../../store';
import ChampsStats from '../ChampStats';
import ItemsStats from '../ItemStats';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemsStore;
};

const AppRouter: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;

  return (
    <div>
      <Routes>
        <Route path='/' element={<p> Привет!</p>} />
        <Route path='/champStats' element={<ChampsStats champsStore={champsStore} />} />
        <Route path='/itesmStats' element={<ItemsStats itemsStore={itemsStore} />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
