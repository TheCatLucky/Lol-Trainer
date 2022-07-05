import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useState } from 'react';
import { Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyButton, MyInput, MySelect } from '../../ui/uiKit';
import classes from './ChampsPage.module.scss';
import ChampStats from './ChampStats';

type Props = {
  champsStore: ChampionsStore;
};

const ChampsPage: FC<Props> = (props) => {
  const { champsStore } = props;
  const { sortChampsByASAsc, sortChampsByASDesc, sortChampsByADAsc, sortChampsByADDesc, sortChampsByHPAsc, sortChampsByHPDesc, sortChampsByNameAsc, sortChampsByNameDesc, champions, setChampions } = champsStore;

  const [selectedChamp, setSelectedChamp] = useState('');
  const [sortFunc, setSortFunc] = useState('Сортировка по имени ↑');

  const [showAll, setShowAll] = useState(false);
  const [champLvl, setChampLvl] = useState(1);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  const handleSelect = (champName: string) => {
    setSelectedChamp(champName);
    setShowAll(false);
  };

  const handleLvlChange = (lvl: number) => {
    setChampLvl(lvl);
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

  const optionsSort = useMemo(() => {
    return [
      {
        value: 'Сортировка по имени ↑',
        name: 'Сортировка по имени ↑'
      },
      {
        value: 'Сортировка по имени ↓',
        name: 'Сортировка по имени ↓'
      },
      {
        value: 'Сортировка по АС ↑',
        name: 'Сортировка по АС ↑'
      },
      {
        value: 'Сортировка по АС ↓',
        name: 'Сортировка по АС ↓'
      },
      {
        value: 'Сортировка по АД ↑',
        name: 'Сортировка по АД ↑'
      },
      {
        value: 'Сортировка по АД ↓',
        name: 'Сортировка по АД ↓'
      },
      {
        value: 'Сортировка по ХП ↑',
        name: 'Сортировка по ХП ↑'
      },
      {
        value: 'Сортировка по ХП ↓',
        name: 'Сортировка по ХП ↓'
      }];
  }, []);

  /**
   * Изменение статистик ВСЕХ персонажей в сторе
   */
  useEffect(() => {
    setChampions(champions, champLvl);
  }, [champLvl]);

  useEffect(() => {
    const sortFuncObj: {[index: string]: () => void, } = {
      'Сортировка по АС ↑': function () { sortChampsByASAsc(champions, champLvl)},
      'Сортировка по АС ↓': function () { sortChampsByASDesc(champions, champLvl)},
      'Сортировка по АД ↑': function () { sortChampsByADAsc(champions, champLvl)},
      'Сортировка по АД ↓': function () { sortChampsByADDesc(champions, champLvl)},
      'Сортировка по ХП ↑': function () { sortChampsByHPAsc(champions, champLvl)},
      'Сортировка по ХП ↓': function () { sortChampsByHPDesc(champions, champLvl)},
      'Сортировка по имени ↑': function () { sortChampsByNameAsc(champions, champLvl)},
      'Сортировка по имени ↓': function () {sortChampsByNameDesc(champions, champLvl)}
    };

    sortFuncObj[sortFunc]();
  }, [sortFunc]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.menu}>
        <div className={classes.column}>
          <MySelect defaultValue='выберте персонажа'
            options={optionsChamps}
            value={selectedChamp}
            onChange={handleSelect}
          />
          <MyInput max={18}
            min={1}
            placeholder='введите уровен персонажа'
            type='number'
            value={champLvl}
            onChange={handleLvlChange}
          />
          <MyButton onClick={showAllChamps}>
            {showAll ? 'Убрать' : 'Показать всех'}
          </MyButton>
        </div>
        {showAll && <div className={classes.column}>
          <MySelect defaultValue='тип сортировки'
            options={optionsSort}
            value={sortFunc}
            onChange={setSortFunc}
          />
        </div>}
      </div>
      <br />
      <div className={classes.content}>
        {!showAll &&
          champions.map((champ) => {
            if (champ.name === selectedChamp) {
              return <ChampStats champion={champ}
                key={champ.name}
                lvl={champLvl} />;
            }

            return null;
          })}
        {showAll &&
          champions.map((champ) => {
            return <ChampStats champion={champ}
              key={champ.name}
              lvl={champLvl} />;
          })}
      </div>
    </div>
  );
};

export default observer(ChampsPage);
