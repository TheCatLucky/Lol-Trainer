import { FC } from 'react';
import classes from './Shop.module.scss';
import ItemModel from './../../../models/ItemModel';

type Props = {
  items: ItemModel[];
};

const Shop: FC<Props> = (props) => {
  const { items } = props;
  return (
    <div className={classes.wrapper}>
      {items.map((item) => (
        <img src={item.img} alt={item.name} key={item.name} />
      ))}
    </div>
  );
};

export default Shop;
