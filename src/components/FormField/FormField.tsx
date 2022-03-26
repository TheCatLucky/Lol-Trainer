import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import { Options } from '../../models/FormField';
import { ChampionsStore, ItemsStore } from '../../store';
import MyButton from '../../ui/MyButton';
import MyCheckBox from '../../ui/MyCheckBox';
import MyInput from '../../ui/MyInput';
import MySelect from '../../ui/MySelect';
import classes from './FormField.module.scss';

type Props = {
  champsStore: ChampionsStore;
  itemsStore: ItemsStore;
};

const FormField: FC<Props> = (props) => {
  const { champsStore, itemsStore } = props;
  const [compareFirst, setCompareFirst] = useState('');
  const [compareSecond, setCompareSecond] = useState<string[]>();
  const [selected, setSeleted] = useState(new Array(itemsStore.items.length).fill(false));
  const [applyOnChamp, setApplyOnChamp] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const showall = () => {
    setShowAll(!showAll);
  };

  const showSelected = () => {
    const res = selected
      .map((el, index) => {
        if (el === true) return itemsStore.items[index].name;
        return '';
      })
      .filter((item) => item !== '');
    console.log(res);
    setApplyOnChamp(res);
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
  const optionsItems: Options = useMemo(
    () =>
      itemsStore.items.map((item) => {
        return {
          value: item.name,
          name: item.name,
        };
      }),
    [itemsStore],
  );

  const checked = (position: number) => {
    const updatedChecked = selected.map((item, index) => (index === position ? !item : item));
    setSeleted(updatedChecked);
  };

  return (
    <div className={classes.wrapper}>
      <MyInput type='text' placeholder='введите текст' />
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsChamps}
        value={compareFirst}
        onChange={setCompareFirst}
      />
      <MyButton onClick={showall}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <MyButton onClick={showSelected}>Показать выбранные</MyButton>
      <div className={classes.itemsList}>
        {itemsStore.items.map((item, index) => (
          <div className={classes.items} key={item.name}>
            <MyCheckBox type='checkbox' onChange={(e) => checked(index)} />
            {item.name}
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default observer(FormField);
