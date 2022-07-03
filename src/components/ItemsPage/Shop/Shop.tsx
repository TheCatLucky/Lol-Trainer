import { FC } from 'react';
import ItemModel from './../../../models/ItemModel';
import ItemList from './ItemsList';
import classes from './Shop.module.scss';

type Props = {
  items: ItemModel[];
};

const Shop: FC<Props> = (props) => {
  const { items } = props;

  return (
    <div className={classes.wrapper}>
      <ItemList chooseItemLeftClick={() => {
        console.log('first');
      }}
      chooseItemRightClick={() => {
        console.log('first');
      }}
      items={items}
      />
    </div>
  );
};

export default Shop;
