import { FC, useEffect, useState } from 'react';

import { ChampionModel } from '../../../models';
import classes from './DPSTable.module.scss';

type Props = {
  champion: ChampionModel;
};

const DPSTable: FC<Props> = (props) => {
  const { champion } = props;
  const {
    attackDamage,
    attackSpeed,
    critDamage,
    critChance,
    armorFlatPenetration,
    armorPenetration,
  } = champion.stats;
  const baseArmorResistance = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [damage, setDamage] = useState([0]);
  const [criticalDamage, setCriticalDamage] = useState([0]);
  const [dps, setDps] = useState([0]);

  useEffect(() => {
    const nonCritDmg: number[] = [];
    const critDMG: number[] = [];
    const dpsDMG: number[] = [];

    baseArmorResistance.forEach((armor) => {
      const baseDamage =
        attackDamage *
        (100 / (100 + Math.max(armor * (1 - armorPenetration) - armorFlatPenetration, 0)));

      const defaultAttack = baseDamage;
      const critAttack = baseDamage * critDamage;

      nonCritDmg.push(Math.floor(defaultAttack));
      critDMG.push(Math.floor(critAttack));
      dpsDMG.push(
        Math.floor((defaultAttack * (1 - critChance) + critAttack * critChance) * attackSpeed),
      );
    });

    setDamage(nonCritDmg);
    setCriticalDamage(critDMG);
    setDps(dpsDMG);
  }, [champion]);

  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead>
          <tr>
            <td />
            <td colSpan={11}>Расчет урона в зависимости от сопортивлений</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Армор</td>
            {
              baseArmorResistance.map((arm, index) => (
                <td key={index}>{arm}</td>
              ))
            }
          </tr>
          <tr>
            <td>Урон</td>
            {
              damage?.map((dmg, index) => (
                <td data-testid="baseDMG"
                  key={index}
                >
                  {dmg}
                </td>
              ))
            }
          </tr>
          <tr>
            <td>Критический урон</td>
            {
              criticalDamage?.map((dmg, index) => (
                <td data-testid="critDMG"
                  key={index}
                >
                  {dmg}
                </td>
              ))
            }
          </tr>
          <tr>
            <td>Урон в секунду</td>
            {
              dps?.map((dmg, index) => (
                <td data-testid="dpsDMG"
                  key={index}
                >
                  {dmg}
                </td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DPSTable;
