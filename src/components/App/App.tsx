import { useEffect, useState } from 'react';
import { riotAPI } from '../../api';
import { champsList, itemsList } from '../../data';
import { ChampionsStore, ItemsStore } from '../../store';
import Footer from '../../ui/Footer';
import Header from '../../ui/Header';
import AppRouter from '../AppRouter';
import classes from './App.module.scss';

function App() {
  const [champsStore,setChampsStore] = useState<ChampionsStore>(new ChampionsStore(champsList));

  const getData = async () => {
    const data = await riotAPI.getRuChamps().then(data => data);
    setChampsStore( new ChampionsStore(data));
  };

  useEffect(() => {
    getData();
  },[]);

  const itemsStore = new ItemsStore(itemsList);

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.content}>
        <AppRouter champsStore={champsStore}
          itemsStore={itemsStore.items} />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
