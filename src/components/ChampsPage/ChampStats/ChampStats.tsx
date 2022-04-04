import { FC } from 'react';
import { ChampionModel, Displayed } from '../../../models';
import classes from './ChampStats.module.scss';

type Props = {
  champ: ChampionModel;
  lvl: number;
};

const ChampStats: FC<Props> = (props) => {
  const { champ, lvl } = props;
  return (
    <div className={classes.stats} key={champ.name}>
      <h3>
        {champ.name} на {lvl} уровне
      </h3>
      <ul key={champ.name}>
        <li>
          {Displayed.attackDamage} : {champ.attackDamage}
        </li>
        <li>
          {Displayed.attackSpeed} : {champ.attackSpeed}
        </li>
        <li>
          {Displayed.armor} : {champ.armor}
        </li>
        <li>
          {Displayed.magicResistance} : {champ.magicResistance}
        </li>
        <li>
          {Displayed.health} : {champ.health}
        </li>
      </ul>
    </div>
  );
};

export default ChampStats;
