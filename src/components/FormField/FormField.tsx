import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ChampionModel, ItemModel, Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyInput, MySelect } from '../../ui/uiKit';
import ChampStats from '../ChampsPage/ChampStats';
import ItemsList from '../ItemsPage/Shop/ItemsList';
import DPSTable from './DPSTable';
import classes from './FormField.module.scss';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

//ToDo: селектор для выбора отображаемой таблицы
//ToDo: идентификаторы для всех предметов
//ToDo: uniqID для мифических предметов && предметов с одинаковой пасссивкой
//ToDo: поле legendary для легендарных предметов

const FormField: FC<Props> = (props) => {
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
  const [selectedItems, setSelectedItems] = useState<ItemModel[]>([]);
  const [champLvl, setChampLvl] = useState(1);
  const [compareFirst, setCompareFirst] = useState('Ahri');

  /**
   * Устанавливает выбранного персонажа с его начальными характеристиками
   */
  const setChampAndBaseStats = useCallback(
    (champ: string) => {
      const champISelect = champions.filter((char) => {
        if (char.name === champ) {
          return char;
        }

        return null;
      });
      console.log('setChampAndBaseStats', champISelect[0].attackDamage);
      setBaseChampStats(champISelect[0]);
      setCompareFirst(champ);
    },
    [champions],
  );

  const chooseItemClick = (e: React.MouseEvent, item: ItemModel) => {
    e.preventDefault();
    if (selectedItems && selectedItems.length >= 6) {
      console.log('много предметов');
      return;
    } else if (selectedItems) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([item]);
    }
  };

  const removeItem = (index: number) => {
    const newArr = [...selectedItems];
    newArr.splice(index, 1);
    setSelectedItems(newArr);
  };
  /**
   * Показывает статы персонажей с выбранными предметами
   */
  const summItemsStats = useCallback(() => {
    let newStats = { ...baseChampStats };
    if (selectedItems) {
      selectedItems.forEach((item) => {
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
    }

    console.log(newStats.attackDamage, 'статы с итемами');
    setStatsWithItems(newStats);
  }, [baseChampStats, itemsStore, selectedItems]);

  useEffect(() => {
    summItemsStats();
  }, [summItemsStats]);

  useEffect(() => {
    setChampAndBaseStats(compareFirst);
  }, [compareFirst, setChampAndBaseStats]);

  const handleLvlChange = (lvl: number) => {
    setChampLvl(lvl);
    setChampions(champions, lvl);
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
        onChange={setChampAndBaseStats}
      />
      <MyInput
        type='number'
        min={1}
        max={18}
        placeholder='введите уровен персонажа'
        value={champLvl}
        onChange={handleLvlChange}
      />
      <div className={classes.itemsList}>
        <ItemsList items={itemsStore} chooseItemClick={chooseItemClick} />
      </div>
      <div className={classes.content}>
        <div>
          <ChampStats champ={statsWithItems} lvl={champLvl} />
          {selectedItems?.map((item, index) => (
            <img
              src={item.img}
              alt={item.name}
              key={item.name + index}
              onClick={() => removeItem(index)}
            />
          ))}
        </div>
        <DPSTable champion={statsWithItems} />
      </div>
    </div>
  );
};

export default observer(FormField);
