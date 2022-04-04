import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState, useEffect } from 'react';
import { Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyButton, MyInput, MySelect } from '../../ui';
import classes from './ChampsPage.module.scss';
import ChampStats from './ChampStats';

type Props = {
  champsStore: ChampionsStore;
};

const ChampsPage: FC<Props> = (props) => {
  const { champsStore } = props;
  const { setChampions, champions } = champsStore;

  const [selectedChamp, setselectedChamp] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [champLvl, setChampLvl] = useState(1);

  useEffect(() => {
    setChampions(champions, champLvl);
  }, [champLvl]);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  const handleSelect = (champName: string) => {
    setselectedChamp(champName);
    setShowAll(false);
  };

  const optionsChamps: Options = useMemo(
    () =>
      champions.map((champ) => {
        return {
          value: champ.name,
          name: champ.name,
        };
      }),
    [champions],
  );

  return (
    <div className={classes.wrapper}>
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsChamps}
        value={selectedChamp}
        onChange={handleSelect}
      />
      <MyInput
        type='number'
        min={1}
        max={18}
        placeholder='введите уровен персонажа'
        value={champLvl}
        onChange={setChampLvl}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <div className={classes.content}>
        {!showAll &&
          champions.map((champ) => {
            if (champ.name === selectedChamp) {
              return <ChampStats champ={champ} lvl={champLvl} key={champ.name} />;
            }
            return null;
          })}
        {!!showAll &&
          champions.map((champ) => {
            return <ChampStats champ={champ} lvl={champLvl} key={champ.name} />;
          })}
      </div>
    </div>
  );
};

export default observer(ChampsPage);
