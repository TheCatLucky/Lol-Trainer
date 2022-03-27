import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useState } from 'react';
import { ChampionModel, ItemModel, Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyButton, MyCheckBox, MySelect } from '../../ui';
import classes from './FormField.module.scss';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemModel[];
};

const FormField: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;

  const [champStats, setChampStats] = useState<ChampionModel>(champsStore.champions[0]);
  const [selectedChamp, setSelectedChamp] = useState<ChampionModel>(champsStore.champions[0]);

  const [compareFirst, setCompareFirst] = useState('');
  const [selected, setSeleted] = useState(new Array(itemsStore.length).fill(false));
  const [appliedOnChamp, setAppliedOnChamp] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    summItemsStats();
  }, [appliedOnChamp]);

  const showSelectedItems = () => {
    const res = selected
      .map((el, index) => {
        if (el === true) return itemsStore[index].name;
        return '';
      })
      .filter((item) => item !== '');

    champsStore.champions.filter((champ) => {
      if (champ.name === compareFirst) {
        setChampStats(champ);
      }
    });

    setAppliedOnChamp(res);
  };

  const setChamp = (champ: string) => {
    const champISelect = champsStore.champions.filter((char) => {
      if (char.name === champ) {
        return char;
      }

      return null;
    });

    setCompareFirst(champ);
    setChampStats(champISelect[0]);
  };

  const summItemsStats = () => {
    let newStats = { ...champStats };

    const itemsForCount = itemsStore.filter((item) => {
      if (appliedOnChamp.includes(item.name)) {
        return item;
      }

      return null;
    });

    itemsForCount.forEach((item) => {
      item.stats.forEach((field) => {
        newStats = {
          ...newStats,
          [field.name]: +newStats[field.name] + field.value,
        };
      });
    });

    setSelectedChamp(newStats);
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

  const checked = (position: number) => {
    const updatedChecked = selected.map((item, index) => (index === position ? !item : item));
    setSeleted(updatedChecked);
  };

  return (
    <div className={classes.wrapper}>
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsChamps}
        value={compareFirst}
        onChange={setChamp}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
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
      {
        <div className={classes.content}>
          {!showAll &&
            champsStore.champions.map((champ) => {
              if (champ.name === compareFirst) {
                return (
                  <div className={classes.stats} key={champ.name}>
                    <h3>Статистики персонажа {champ.name}</h3>
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
                  <h3>Статистики персонажа {champ.name}</h3>
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
          {/* <div>{compareSecond}</div> */}
        </div>
      }
    </div>
  );
};

export default observer(FormField);
