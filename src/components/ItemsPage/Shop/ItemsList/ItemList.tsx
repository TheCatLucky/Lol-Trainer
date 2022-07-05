import { FC, memo, useState } from 'react';
import { ItemModel } from '../../../../models';
import classes from './ItemList.module.scss';
import Popup from './Popup';

type Props = {
  items: ItemModel[];
  /**
   * Выбор предмета для левого персонажа
   */
  chooseItemLeftClick: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: ItemModel
  ) => void;

  /**
   * Выбор предмета для правого персонажа
   */
  chooseItemRightClick: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: ItemModel
  ) => void;
};

const ItemList: FC<Props> = (props) => {
  const { items, chooseItemLeftClick, chooseItemRightClick } = props;

  const [curentItem, setCurrentItem] = useState<ItemModel | null>(null);

  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        {items.map((item) => (
          <div key={item.name}>
            <img alt={item.name}
              key={item.name}
              src={item.img}
              onClick={(event) => chooseItemLeftClick(event, item)}
              onContextMenu={(event) => chooseItemRightClick(event, item)}
              onMouseEnter={() => setCurrentItem(item)}
              onMouseLeave={() => setCurrentItem(null)}
            />
            {curentItem?.name === item.name && (
              <Popup curentItem={curentItem} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ItemList);
