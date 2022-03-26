import { action, configure, makeObservable } from 'mobx';
import { ItemModel } from '../models';

configure({
  enforceActions: 'always',
});

class ItemsStore {
  /**
   * Список предметов
   */
  items: ItemModel[] = [];

  constructor(items: ItemModel[]) {
    makeObservable(this, {
      setItems: action.bound,
    });
    this.setItems(items);
  }

  setItems(data: ItemModel[]): void {
    this.items = data;
  }
}

export default ItemsStore;
