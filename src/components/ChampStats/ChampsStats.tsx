import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Options } from '../../models/FormField';
import { ChampionsStore } from '../../store';
import MyButton from '../../ui/MyButton';
import MyInput from '../../ui/MyInput';
import MySelect from '../../ui/MySelect';
import classes from './ChampsStats.module.scss';

type Props = {
  champsStore: ChampionsStore;
};

const ChampsStats: FC<Props> = (props) => {
  const { champsStore } = props;

  const [selectedChamp, setselectedChamp] = useState('');
  const [showAll, setShowAll] = useState(false);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  const optionsChamps: Options = useMemo(
    () =>
      champsStore.champions.map((champ) => {
        return {
          value: champ.name,
          name: champ.name,
        };
      }),
    [champsStore],
  );
  return (
    <div className={classes.wrapper}>
      <MyInput type='text' placeholder='введите текст' />
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsChamps}
        value={selectedChamp}
        onChange={setselectedChamp}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <div className={classes.content}>
        {!showAll &&
          champsStore.champions.map((champ) => {
            if (champ.name === selectedChamp) {
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
            }
            return null;
          })}
        {!!showAll &&
          champsStore.champions.map((champ) => {
            return (
              <div className={classes.stats} key={champ.name}>
                <h3>{champ.name}</h3>
                <ul>
                  <li>Ад на 1 уровне: {champ.attackDamageLvl1}</li>
                  <li>Ас на 1 уровне: {champ.attackSpeed}</li>
                  <li>Броня на 1 уровне: {champ.armorLvl1}</li>
                  <li>Магическое сопротивление на 1 уровне: {champ.magicResistanceLvl1}</li>
                  <li>Хп на 1 уровне : {champ.healthLvl1}</li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default observer(ChampsStats);
