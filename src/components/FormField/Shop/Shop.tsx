import { FC, useState } from 'react';
import classes from './Shop.module.scss';
import ItemModel from './../../../models/ItemModel';
import { StatsEnum } from '../../../models';
import ItemList from './ItemsList';

type Props = {
  items: ItemModel[];
};

const Shop: FC<Props> = (props) => {
  const { items } = props;
  return (
    <div className={classes.wrapper}>
      <ItemList items={items} />
    </div>
  );
};

export default Shop;
