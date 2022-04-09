import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import { ChampionModel, ItemModel, Options, SelectedItems } from '../../models';
import { ChampionsStore } from '../../store';
import { MyInput, MySelect } from '../../ui/uiKit';
import ItemsList from '../ItemsPage/Shop/ItemsList';
import ChampionTable from './ChampionTable';
import classes from './FormField.module.scss';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

//ToDo: селектор для выбора отображаемой таблицы

const FormField: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;
  const { setChampions, champions, champToCompare, setChampsToCompare, calcNewStats } = champsStore;

  /**
   * Начальные статы для расчет
   */
  const [baseChampStats, setBaseChampStats] = useState<ChampionModel>(() => champions[0]);
  const [champLvl, setChampLvl] = useState(1);
  const [compare, setCompare] = useState('Ahri');

  /**
   * Статы после применения предметов - первый персонаж
   */
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    items: [],
    haveMythic: false,
    legendaryIDs: [],
  });

  /**
   * Статы после применения предметов - второй персонаж
   */
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
      setChampsToCompare(champISelect[0]);
      setSelectedItems({ items: [], haveMythic: false, legendaryIDs: [] });
      setSelectedItems2({ items: [], haveMythic: false, legendaryIDs: [] });
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
    let itemsToApply = selectedItems;
    let champId = 1;
    if (e.type === 'contextmenu') {
      addItemFunction = setSelectedItems2;
      itemsToApply = selectedItems2;
      champId = 2;
    }
    const actions = {
      maxItems: itemsToApply && itemsToApply.items.length >= 6,
      haveMythic: item.isMythic && itemsToApply.haveMythic,
      alreadyHaveThisLegenday:
        item.legendaryID && itemsToApply.legendaryIDs.includes(item.legendaryID),
    };
    if (actions.maxItems) {
      return;
    } else if (actions.haveMythic) {
      return;
    } else if (actions.alreadyHaveThisLegenday) {
      return;
    } else if (item.isMythic) {
      addItemFunction({
        ...itemsToApply,
        items: [...itemsToApply.items, item],
        legendaryIDs: item.legendaryID
          ? [...itemsToApply.legendaryIDs, item.legendaryID]
          : [...itemsToApply.legendaryIDs],
        haveMythic: true,
      });
    } else if (item.legendaryID) {
      addItemFunction({
        ...itemsToApply,
        items: [...itemsToApply.items, item],
        legendaryIDs: [...itemsToApply.legendaryIDs, item.legendaryID],
      });
    } else {
      addItemFunction({ ...itemsToApply, items: [...itemsToApply.items, item] });
    }

    calcNewStats(baseChampStats, itemsToApply, champId, champLvl);
  };

  /**
   * Показывает статы персонажей с выбранными предметами
   */
  /* const summItemsStats = useCallback(() => {
    let newStats = { ...baseChampStats };
    let newStats2 = { ...baseChampStats };

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

    setCompareChampionsStats(newStats, 1, selectedItems);
    setCompareChampionsStats(newStats2, 2, selectedItems2);
  }, [baseChampStats, itemsStore, selectedItems, selectedItems2]); */

  /* useEffect(() => {
    summItemsStats();
  }, [summItemsStats]); */

  useEffect(() => {
    setChampAndBaseStats(compare);
  }, [compare, setChampAndBaseStats]);

  const handleLvlChange = (lvl: number) => {
    setChampLvl(lvl);
    setChampions(champions, lvl);
  };

  const optionsChamps: Options = champions.map((champ) => {
    return {
      value: champ.name,
      name: champ.name,
    };
  });

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
        <ChampionTable
          champLvl={champLvl}
          championStats={champToCompare[0].champion}
          selectedItems={champToCompare[0].equipment}
          setSelectedItems={setSelectedItems}
        />
        <ChampionTable
          champLvl={champLvl}
          championStats={champToCompare[1].champion}
          selectedItems={champToCompare[1].equipment}
          setSelectedItems={setSelectedItems2}
        />
      </div>
    </div>
  );
};

export default FormField;
