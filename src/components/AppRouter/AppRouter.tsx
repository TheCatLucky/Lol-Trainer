import { observer } from 'mobx-react-lite';
import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ItemModel } from '../../models';
import { ChampionsStore } from '../../store';

const ChampsPage = lazy(() => import('../ChampsPage'));
const FormField = lazy(() => import('../FormField'));
const ItemsPage = lazy(() => import('../ItemsPage'));

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

const AppRouter: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;

  return (
    <div>
      <Suspense fallback={<h1>Загрузка...</h1>}>
        {/*
      todo:
      Сделать компонент лоадер */}

        <Routes>
          <Route element={<p> Привет!</p>} path="/" />

          <Route
            element={<ChampsPage champsStore={champsStore} />}
            path="/champStats"
          />

          <Route
            element={<ItemsPage itemsStore={itemsStore} />}
            path="/itesmStats"
          />

          <Route
            element={
              <FormField
                champsStore={champsStore}
                itemsStore={itemsStore}
              />
            }
            path="/formField"
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default observer(AppRouter);
