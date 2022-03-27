import { champsList, itemsList } from '../../data';
import { ChampionsStore, ItemsStore } from '../../store';
import AppRouter from '../AppRouter';
import Footer from '../../ui/Footer';
import Header from '../../ui/Header';
import classes from './App.module.scss';

function App() {
  const champsStore = new ChampionsStore(champsList);
  const itemsStore = new ItemsStore(itemsList);
  return (
    <div className={classes.wrapper}>
      <Header />
      <AppRouter champsStore={champsStore} itemsStore={itemsStore.items} />
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
