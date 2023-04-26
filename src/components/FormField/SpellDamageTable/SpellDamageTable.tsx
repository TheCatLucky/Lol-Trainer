import { FC, useEffect, useState } from 'react';

import { ChampionModel, Spell } from '../../../models';
import classes from './SpellDamageTable.module.scss';

type Props = {
  champion: ChampionModel;
  skillLvl: number;
  spell: Spell;
};

const SpellDamageTable: FC<Props> = (props) => {
  const { champion, skillLvl, spell } = props;
  const { abilityDamage, magicPenetration, magicFlatPenetration, attackDamage } = champion.stats;
  const baseMagicResistance = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [damage, setDamage] = useState([0]);

  useEffect(() => {
    const QspellDamage: number[] = [];

    baseMagicResistance.forEach((mres) => {
      const spelldmg = spell.baseDamage[skillLvl - 1] + spell.scaleAp[skillLvl - 1] * abilityDamage;
      const baseDamage =
        spelldmg *
          (100 / (100 + Math.max(mres * (1 - magicPenetration) - magicFlatPenetration, 0))) +
        spelldmg;

      const defaultAttack = baseDamage;

      QspellDamage.push(Math.floor(defaultAttack));
    });

    setDamage(QspellDamage);
  }, [skillLvl, champion]);

  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead>
          <tr>
            <td />
            <td colSpan={11}>Урон {spell.name}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Мрез</td>
            {
              baseMagicResistance.map((mres, index) => (
                <td key={index}>{mres}</td>
              ))
            }
          </tr>
          <tr>
            <td>Урон</td>
            {
              damage?.map((dmg, index) => (
                <td key={index}>{dmg}</td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpellDamageTable;
