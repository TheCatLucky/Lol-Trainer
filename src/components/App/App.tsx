import { champsList, itemsList } from '../../data';
import { ChampionsStore, ItemsStore } from '../../store';
import AppRouter from '../AppRouter';
import Footer from '../Footer';
import FormField from '../FormField';
import Header from '../Header';
import classes from './App.module.scss';

function App() {
  const champsStore = new ChampionsStore(champsList);
  const itemsStore = new ItemsStore(itemsList);
  return (
    <div className={classes.wrapper}>
      <Header />
      <AppRouter champsStore={champsStore} itemsStore={itemsStore} />
      {/* <FormField champsStore={champsStore} itemsStore={itemsStore} /> */}
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
