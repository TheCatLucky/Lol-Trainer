import { FC, useEffect, useRef, useState } from 'react';

import { ItemModel, StatsEnum } from '../../../../models';
import classes from './ItemList.module.scss';

type Props = {
  curentItem: ItemModel;
};

const Popup: FC<Props> = (props) => {
  const { curentItem } = props;

  const [ifRightSide, setIsRightSide] = useState(true);
  const itemRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.intersectionRatio !== 1) {
        setIsRightSide(false);
      }
    });

    itemRef.current && observer.observe(itemRef.current);

    return () => {
      itemRef.current && observer.unobserve(itemRef.current);
    };
  }, [itemRef.current]);

  return (
    <div className={ifRightSide ? classes.popupRight : classes.popupLeft}
      ref={itemRef}
    >
      {curentItem?.name}
      <ul>
        <li>Стоимость предмета : {curentItem.cost}</li>
        {
          curentItem?.stats.map((field) => {
            if (
              field.name === StatsEnum.attackSpeed
            || field.name === StatsEnum.critChance
            ) {
              return (
                <li key={field.name}>
                  {field.displayName} : {field.value * 100}%
                </li>
              );
            }

            return (
              <li key={field.name}>
                {field.displayName} : {field.value}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Popup;
