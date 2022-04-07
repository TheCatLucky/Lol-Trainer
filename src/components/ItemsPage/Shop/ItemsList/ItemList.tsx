import { FC, useState } from 'react';
import { ItemModel, StatsEnum } from '../../../../models';
import classes from './ItemList.module.scss';

type Props = {
  items: ItemModel[];
  chooseItemClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>, item: ItemModel) => void;
};
const ItemList: FC<Props> = (props) => {
  const { items, chooseItemClick } = props;

  const [curentItem, setCurrentItem] = useState<ItemModel | null>(null);

  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        {items.map((item) => (
          <div key={item.name}>
            <img
              src={item.img}
              alt={item.name}
              key={item.name}
              onMouseEnter={() => setCurrentItem(item)}
              onMouseLeave={() => setCurrentItem(null)}
              onClick={(event) => chooseItemClick(event, item)}
            />
            {curentItem?.name === item.name && (
              <div className={classes.popup}>
                {curentItem?.name}
                <ul>
                  <li>Стоимость предмета: {curentItem.cost}</li>
                  {curentItem?.stats.map((field) => {
                    if (
                      field.name === StatsEnum.attackSpeed ||
                      field.name === StatsEnum.critChance
                    ) {
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
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
