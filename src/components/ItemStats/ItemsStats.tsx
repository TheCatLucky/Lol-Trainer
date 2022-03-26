import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Options } from '../../models/FormField';
import { ItemsStore } from '../../store';
import MyButton from '../../ui/MyButton';
import MyInput from '../../ui/MyInput';
import MySelect from '../../ui/MySelect';
import classes from './ItemsStats.module.scss';

type Props = {
  itemsStore: ItemsStore;
};

const ItemsStats: FC<Props> = (props) => {
  const { itemsStore } = props;

  const [selectedChamp, setselectedChamp] = useState('');
  const [showAll, setShowAll] = useState(false);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

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
  return (
    <div className={classes.wrapper}>
      <MyInput type='text' placeholder='введите текст' />
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsItems}
        value={selectedChamp}
        onChange={setselectedChamp}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <div className={classes.content}>
        {!showAll &&
          itemsStore.items.map((item) => {
            if (item.name === selectedChamp) {
              return (
                <div className={classes.stats} key={item.name}>
                  <h3>{item.name}</h3>
                  <ul key={item.name}>
                    {item.critChance && <li>Шанс критического удара: {item.critChance}</li>}
                    {item.attackSpeed && <li>Скорость атаки: {item.attackSpeed}</li>}
                    {item.attackDamage && <li>Физический урон: {item.attackDamage}</li>}
                    {item.abilityDamage && <li>Магический урон: {item.abilityDamage}</li>}
                    {item.armor && <li>Броня: {item.armor}</li>}
                    {item.magicResistance && (
                      <li>Магическое сопротивление: {item.magicResistance}</li>
                    )}
                    {item.health && <li>Здоровье: {item.health}</li>}
                    {item.lethality && <li>Смертоносность : {item.lethality}</li>}
                    {item.armorPenetration && (
                      <li>Физическое пробивание: {item.armorPenetration}</li>
                    )}
                    {item.magicFlatPenetration && (
                      <li>Магическое пробивание flat: {item.magicFlatPenetration}</li>
                    )}
                    {item.magicPenetration && (
                      <li>Магическое пробивание: {item.magicPenetration}</li>
                    )}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        {!!showAll &&
          itemsStore.items.map((item) => {
            return (
              <div className={classes.stats} key={item.name}>
                <h3>{item.name}</h3>
                <ul>
                  {item.critChance && <li>Шанс критического удара: {item.critChance}</li>}
                  {item.attackSpeed && <li>Скорость атаки: {item.attackSpeed}</li>}
                  {item.attackDamage && <li>Физический урон: {item.attackDamage}</li>}
                  {item.abilityDamage && <li>Магический урон: {item.abilityDamage}</li>}
                  {item.armor && <li>Броня: {item.armor}</li>}
                  {item.magicResistance && (
                    <li>Магическое сопротивление: {item.magicResistance}</li>
                  )}
                  {item.health && <li>Здоровье: {item.health}</li>}
                  {item.lethality && <li>Смертоносность : {item.lethality}</li>}
                  {item.armorPenetration && <li>Физическое пробивание: {item.armorPenetration}</li>}
                  {item.magicFlatPenetration && (
                    <li>Магическое пробивание flat: {item.magicFlatPenetration}</li>
                  )}
                  {item.magicPenetration && <li>Магическое пробивание: {item.magicPenetration}</li>}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default observer(ItemsStats);
