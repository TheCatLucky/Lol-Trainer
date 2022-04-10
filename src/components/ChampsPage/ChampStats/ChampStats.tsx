import { FC } from 'react';
import { ChampionModel, Displayed } from '../../../models';
import classes from './ChampStats.module.scss';

type Props = {
  champion: ChampionModel;
  lvl: number;
};

const ChampStats: FC<Props> = (props) => {
  const { champion, lvl } = props;
  return (
    <div className={classes.stats} key={champion.name}>
      <h3>
        {champion.name} на {lvl} уровне
      </h3>
      <ul key={champion.name}>
        <li>
          {Displayed.attackDamage} : {champion.attackDamage}
        </li>
        <li>
          {Displayed.attackSpeed} : {champion.attackSpeed}
        </li>
        <li>
          {Displayed.armor} : {champion.armor}
        </li>
        <li>
          {Displayed.magicResistance} : {champion.magicResistance}
        </li>
        <li>
          {Displayed.health} : {champion.health}
        </li>
        <li>
          {Displayed.critChance} : {champion.critChance}
        </li>
        <li>
          {Displayed.critDamage} : {champion.critDamage}
        </li>
        <li>
          {Displayed.lethality} : {champion.lethality}
        </li>
      </ul>
    </div>
  );
};

export default ChampStats;
