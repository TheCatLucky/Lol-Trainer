import { FC, useState } from 'react';
import { ItemModel, StatsEnum } from '../../../../models';
import classes from './ItemList.module.scss';

type Props = {
  items: ItemModel[];
};
const ItemList: FC<Props> = (props) => {
  const { items } = props;

  const [visible, setVisible] = useState(false);
  const [curentItem, setCurrentItem] = useState<ItemModel | null>(null);
  const onClickHandler = (item: ItemModel) => {
    setVisible(true);
    setCurrentItem(item);
  };
  return (
    <>
      {items.map((item) => (
        <div className={classes.item}>
          <img
            src={item.img}
            alt={item.name}
            key={item.name}
            onClick={() => {
              onClickHandler(item);
            }}
          />
          {curentItem?.name === item.name && (
            <div className={classes.popup}>
              {curentItem?.name}
              {curentItem?.stats.map((field) => {
                if (field.name === StatsEnum.attackSpeed || field.name === StatsEnum.critChance) {
                  return (
                    <li key={field.name}>
                      {field.displayName}: {field.value * 100}%
                    </li>
                  );
                }

                return (
                  <li key={field.name}>
                    {field.displayName}: {field.value}
                  </li>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ItemList;
