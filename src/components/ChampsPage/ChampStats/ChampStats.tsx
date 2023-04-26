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
    <div className={classes.stats}
      key={champion.name}
    >
      <h3>
        {champion.name} на {lvl} уровне
      </h3>
      <ul key={champion.name}>
        <li>
          {Displayed.attackDamage} : {champion.stats.attackDamage}
        </li>
        <li>
          {Displayed.abilityDamage} : {champion.stats.abilityDamage}
        </li>
        <li>
          {Displayed.attackSpeed} : {champion.stats.attackSpeed}
        </li>
        <li>
          {Displayed.armor} : {champion.stats.armor}
        </li>
        <li>
          {Displayed.magicResistance} : {champion.stats.magicResistance}
        </li>
        <li>
          {Displayed.health} : {champion.stats.health}
        </li>
        {/*         <li>
          {Displayed.critChance} : {champion.stats.critChance}
        </li>
        <li>
          {Displayed.critDamage} : {champion.stats.critDamage}
        </li>
        <li>
          {Displayed.lethality} : {champion.stats.lethality}
        </li> */}
      </ul>
    </div>
  );
};

export default ChampStats;
