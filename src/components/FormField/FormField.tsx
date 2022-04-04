import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ChampionModel, ItemModel, Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyButton, MyCheckBox, MyInput, MySelect } from '../../ui';
import ChampStats from '../ChampsPage/ChampStats';
import classes from './FormField.module.scss';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

const FormField: FC<Props> = (props) => {
  console.log('рендер');
  const { champsStore, itemsStore } = props;
  const { setChampions, champions } = champsStore;
  /**
   * Начальные статы для расчет
   */
  const [baseChampStats, setBaseChampStats] = useState<ChampionModel>(() => champions[0]);
  /**
   * Статы после применения предметов
   */
  const [statsWithItems, setStatsWithItems] = useState<ChampionModel>(() => champions[0]);

  const [champLvl, setChampLvl] = useState(1);
  const [compareFirst, setCompareFirst] = useState('Ahri');
  const [selected, setSeleted] = useState(new Array(itemsStore.length).fill(false));

  /**
   * Устанавливает выбранного персонажа с его начальными характеристиками
   */
  const setChamp = useCallback(
    (champ: string) => {
      const champISelect = champions.filter((char) => {
        if (char.name === champ) {
          return char;
        }

        return null;
      });
      console.log('setChamp', champISelect[0].armor);
      setBaseChampStats(champISelect[0]);
      setCompareFirst(champ);
    },
    [champions],
  );

  /**
   * Показывает статы персонажей с выбранными предметами
   */
  const summItemsStats = useCallback(() => {
    let newStats = { ...baseChampStats };
    const res = selected
      .map((el, index) => {
        if (el === true) return itemsStore[index].name;
        return '';
      })
      .filter((item) => item !== '');

    champions.filter((champ) => {
      if (champ.name === compareFirst) {
        return setBaseChampStats(champ);
      }
    });
    const itemsForCount = itemsStore.filter((item) => {
      if (res.includes(item.name)) {
        return item;
      }

      return null;
    });

    itemsForCount.forEach((item) => {
      item.stats.forEach((field) => {
        if (field.name === 'attackSpeed') {
          const newAS =
            Math.floor((+newStats[field.name] + field.value * newStats.attackSpeedRatio) * 1000) /
            1000;
          return (newStats = {
            ...newStats,
            [field.name]: newAS,
          });
        }
        return (newStats = {
          ...newStats,
          [field.name]: +newStats[field.name] + field.value,
        });
      });
    });

    console.log(baseChampStats.armor, 'статы с итемами');
    setStatsWithItems(newStats);
  }, [baseChampStats, champions, itemsStore, selected, compareFirst]);

  useEffect(() => {
    setChamp(compareFirst);
    summItemsStats();
  }, [compareFirst, setChamp, summItemsStats]);

  /**
   * Показывает выбранные предметы
   */
  const showSelectedItems = () => {
    console.log('ничего');
  };

  const handleLvlChange = (lvl: number) => {
    setChampLvl(lvl);
    setChampions(champions, lvl);
  };

  const checked = (position: number) => {
    const updatedChecked = selected.map((item, index) => (index === position ? !item : item));
    setSeleted(updatedChecked);
    console.log('checked');
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
        value={compareFirst}
        onChange={setChamp}
      />
      <MyInput
        type='number'
        min={1}
        max={18}
        placeholder='введите уровен персонажа'
        value={champLvl}
        onChange={handleLvlChange}
      />
      <br />
      <MyButton onClick={showSelectedItems}>Показать статистики с предметами</MyButton>
      <div className={classes.itemsList}>
        {itemsStore.map((item, index) => (
          <div className={classes.items} key={item.name}>
            <MyCheckBox type='checkbox' onChange={() => checked(index)} />
            {item.name}
          </div>
        ))}
      </div>

      <div className={classes.content}>
        <div>
          <ChampStats champ={statsWithItems} lvl={champLvl} />
        </div>
      </div>
    </div>
  );
};

export default observer(FormField);
