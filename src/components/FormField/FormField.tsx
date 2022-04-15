import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import { ChampionModel, ItemModel, Options, SelectedItems } from '../../models';
import { ChampionsStore } from '../../store';
import { MyInput, MySelect } from '../../ui/uiKit';
import ItemsList from '../ItemsPage/Shop/ItemsList';
import ChampionTable from './ChampionTable';
import classes from './FormField.module.scss';
import { addItem } from './utils';

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
      setSelectedItems({
        items: selectedItems.items,
        haveMythic: false,
        legendaryIDs: selectedItems.legendaryIDs,
      });
      setSelectedItems2({
        items: selectedItems2.items,
        haveMythic: false,
        legendaryIDs: selectedItems2.legendaryIDs,
      });
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
    if (e.type === 'contextmenu') {
      addItemFunction = setSelectedItems2;
      itemsToApply = selectedItems2;
    }
    addItem({
      itemsToApply,
      item,
      addItemFunction,
    });
  };

  /**
   * Изменение статистик персонажей в зависимости от выбранных предметов и уровня
   */
  useEffect(() => {
    console.log('первые вычисления');
    calcNewStats(baseChampStats, selectedItems, 1, champLvl);
  }, [selectedItems]);

  useEffect(() => {
    console.log('вторые вычисления');
    calcNewStats(baseChampStats, selectedItems2, 2, champLvl);
  }, [selectedItems2]);

  useEffect(() => {
    setChampAndBaseStats(compare);
  }, [compare, setChampAndBaseStats]);

  //TODO  придумать как исправить этот костыль
  useEffect(() => {
    setChampions(champions);
  }, []);

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
        placeholder='введите уровень персонажа'
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

export default observer(FormField);
