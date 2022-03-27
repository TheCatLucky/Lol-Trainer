import { FC } from 'react';
import { ItemModel, StatsEnum } from '../../../models';
import classes from './ItemStats.module.scss';

type Props = {
  item: ItemModel;
};

const ItemStats: FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className={classes.stats} key={item.name}>
      <h3>{item.name}</h3>
      <ul key={item.name}>
        {item.stats.map((field) => {
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
      </ul>
    </div>
  );
};

export default ItemStats;
