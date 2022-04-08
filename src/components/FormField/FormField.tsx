import { observer } from 'mobx-react-lite';
import { FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { ChampionModel, ItemModel, LegendaryIDs, Options, StatsEnum } from '../../models';
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

const FormField: FC<Props> = (props) => {
  type SelectedItems = {
    items: ItemModel[];
    haveMythic: boolean;
    legendaryIDs: LegendaryIDs[];
  };
  const { champsStore, itemsStore } = props;
  const { setChampions, champions, calcArmFlatPen, calcAsWithItems } = champsStore;
  /**
   * Начальные статы для расчет
   */
  const [baseChampStats, setBaseChampStats] = useState<ChampionModel>(() => champions[0]);
  const [champLvl, setChampLvl] = useState(1);
  const [compare, setCompare] = useState('Ahri');
  /**
   * Статы после применения предметов
   */
  const [statsWithItems, setStatsWithItems] = useState<ChampionModel>(() => champions[0]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    items: [],
    haveMythic: false,
    legendaryIDs: [],
  });
  /**
   * Статы после применения предметов
   */
  const [statsWithItems2, setStatsWithItems2] = useState<ChampionModel>(() => champions[0]);
  const [selectedItems2, setSelectedItems2] = useState<SelectedItems>({
    items: [],
    haveMythic: false,
    legendaryIDs: [],
  });

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
      setBaseChampStats(champISelect[0]);
      setCompare(champ);
    },
    [champions],
  );

  /**
   * Выбор предмета для персонажа
   */
  const chooseItemLeftClick = (e: React.MouseEvent, item: ItemModel) => {
    e.preventDefault();
    let addItemFunction = setSelectedItems;
    let addObj = selectedItems;
    if (e.type === 'contextmenu') {
      addItemFunction = setSelectedItems2;
      addObj = selectedItems2;
    }
    const actions = {
      maxItems: addObj && addObj.items.length >= 6,
      haveMythic: item.isMythic && addObj.haveMythic,
      alreadyHaveThisLegenday: item.legendaryID && addObj.legendaryIDs.includes(item.legendaryID),
    };
    if (actions.maxItems) {
      return;
    } else if (actions.haveMythic) {
      console.log('есть мифик');
      return;
    } else if (actions.alreadyHaveThisLegenday) {
      console.log('есть похожий легендарный предмет');
      return;
    } else if (item.isMythic) {
      addItemFunction({
        ...addObj,
        items: [...addObj.items, item],
        legendaryIDs: item.legendaryID
          ? [...addObj.legendaryIDs, item.legendaryID]
          : [...addObj.legendaryIDs],
        haveMythic: true,
      });
    } else if (item.legendaryID) {
      addItemFunction({
        ...addObj,
        items: [...addObj.items, item],
        legendaryIDs: [...addObj.legendaryIDs, item.legendaryID],
      });
    } else {
      addItemFunction({ ...addObj, items: [...addObj.items, item] });
    }
  };

  const removeItem = (
    removeItemSet: (value: SetStateAction<SelectedItems>) => void,
    removeObj: SelectedItems,
    index: number,
  ) => {
    const newItems = [...removeObj.items];
    newItems.splice(index, 1);
    removeItemSet({ ...removeObj, items: newItems });
  };
  /**
   * Показывает статы персонажей с выбранными предметами
   */
  const summItemsStats = useCallback(() => {
    let newStats = { ...baseChampStats };
    let newStats2 = { ...baseChampStats };
    if (selectedItems) {
      console.log('зашел в 1');
      selectedItems.items.forEach((item) => {
        item.stats.forEach((field) => {
          if (field.name === StatsEnum.attackSpeed) {
            const newAS = calcAsWithItems(
              newStats[field.name],
              field.value,
              newStats.attackSpeedRatio,
            );
            return (newStats = {
              ...newStats,
              [field.name]: newAS,
            });
          }
          if (field.name === StatsEnum.lethality) {
            const armorFlatPen = calcArmFlatPen(newStats[field.name] + field.value, champLvl);
            return (newStats = {
              ...newStats,
              [field.name]: newStats[field.name] + field.value,
              armorFlatPenetration: armorFlatPen,
            });
          }
          return (newStats = {
            ...newStats,
            [field.name]: newStats[field.name] + field.value,
          });
        });
      });
    }
    if (selectedItems2) {
      console.log('зашел в 2');
      selectedItems2.items.forEach((item) => {
        item.stats.forEach((field) => {
          if (field.name === StatsEnum.attackSpeed) {
            const newAS = calcAsWithItems(
              newStats2[field.name],
              field.value,
              newStats2.attackSpeedRatio,
            );
            return (newStats2 = {
              ...newStats2,
              [field.name]: newAS,
            });
          }
          if (field.name === StatsEnum.lethality) {
            const armorFlatPen = calcArmFlatPen(newStats2[field.name] + field.value, champLvl);
            return (newStats2 = {
              ...newStats2,
              [field.name]: newStats2[field.name] + field.value,
              armorFlatPenetration: armorFlatPen,
            });
          }
          return (newStats2 = {
            ...newStats2,
            [field.name]: newStats2[field.name] + field.value,
          });
        });
      });
    }

    setStatsWithItems(newStats);
    setStatsWithItems2(newStats2);

    console.log(newStats, 'первая');
    console.log(newStats2, 'вторая');
  }, [baseChampStats, itemsStore, selectedItems, selectedItems2]);

  useEffect(() => {
    summItemsStats();
  }, [summItemsStats]);

  useEffect(() => {
    setChampAndBaseStats(compare);
  }, [compare, setChampAndBaseStats]);

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
        value={compare}
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
        <ItemsList
          items={itemsStore}
          chooseItemLeftClick={chooseItemLeftClick}
          chooseItemRightClick={chooseItemLeftClick}
        />
      </div>
      <div className={classes.content}>
        <div>
          <ChampStats champ={statsWithItems} lvl={champLvl} />
          {selectedItems.items.map((item, index) => (
            <img
              src={item.img}
              alt={item.name}
              key={item.name + index}
              onClick={() => removeItem(setSelectedItems, selectedItems, index)}
            />
          ))}
        </div>
        <DPSTable champion={statsWithItems} />
        <div>
          <ChampStats champ={statsWithItems2} lvl={champLvl} />
          {selectedItems2.items.map((item, index) => (
            <img
              src={item.img}
              alt={item.name}
              key={item.name + index}
              onClick={() => removeItem(setSelectedItems2, selectedItems2, index)}
            />
          ))}
        </div>
        <DPSTable champion={statsWithItems2} />
      </div>
    </div>
  );
};

export default observer(FormField);
