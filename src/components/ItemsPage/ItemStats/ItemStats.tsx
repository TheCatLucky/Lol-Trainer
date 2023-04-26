import { FC } from 'react';

import { ItemModel, StatsEnum } from '../../../models';
import classes from './ItemStats.module.scss';

type Props = {
  item: ItemModel;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: ItemModel) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, item: ItemModel) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable: boolean;
};

const ItemStats: FC<Props> = (props) => {
  const { item, onDragStart, onDragEnd, onDragLeave, onDragOver, onDrop, draggable } = props;

  return (
    <div className={classes.stats}
      draggable={draggable}
      key={item.name}
      onDragEnd={(e) => onDragEnd(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
      onDragStart={(e) => onDragStart(e, item)}
      onDrop={(e) => onDrop(e, item)}
    >
      <h3>{item.name}</h3>
      <ul key={item.name}>
        {
          item.stats.map((field) => {
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
          })
        }
      </ul>
    </div>
  );
};

export default ItemStats;
