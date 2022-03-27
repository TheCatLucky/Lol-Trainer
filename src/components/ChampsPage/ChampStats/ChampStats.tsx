import { FC } from 'react';
import { ChampionModel } from '../../../models';
import classes from './ChampStats.module.scss';

type Props = {
  champ: ChampionModel;
};

const ChampStats: FC<Props> = (props) => {
  const { champ } = props;

  return (
    <div className={classes.stats} key={champ.name}>
      <h3>{champ.name}</h3>
      <ul key={champ.name}>
        <li>Ад на 1 уровне: {champ.attackDamageLvl1}</li>
        <li>Ас на 1 уровне: {champ.attackSpeed}</li>
        <li>Броня на 1 уровне: {champ.armorLvl1}</li>
        <li>Магическое сопротивление на 1 уровне: {champ.magicResistanceLvl1}</li>
        <li>Хп на 1 уровне : {champ.healthLvl1}</li>
      </ul>
    </div>
  );
};

export default ChampStats;
