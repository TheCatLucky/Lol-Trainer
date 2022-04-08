import { FC } from 'react';
import classes from './Shop.module.scss';
import ItemModel from './../../../models/ItemModel';
import ItemList from './ItemsList';

type Props = {
  items: ItemModel[];
};

const Shop: FC<Props> = (props) => {
  const { items } = props;
  return (
    <div className={classes.wrapper}>
      <ItemList items={items} chooseItemLeftClick={() => {}} chooseItemRightClick={() => {}} />
    </div>
  );
};

export default Shop;
