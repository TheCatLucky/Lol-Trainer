import { FC, useState, useEffect } from 'react';
import { ChampionModel } from '../../../models';
import classes from './DPSTable.module.scss';

type Props = {
  champion: ChampionModel;
};
const DPSTable: FC<Props> = (props) => {
  const { champion } = props;
  const { attackDamage, attackSpeed, critDamage, critChance } = champion;
  const armorResistance = [17, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  const [damage, setDamage] = useState([0]);
  const [criticalDamage, setCriticalDamage] = useState([0]);
  const [dps, setDps] = useState([0]);

  useEffect(() => {
    const nonCritDmg: number[] = [];
    const critDMG: number[] = [];
    const dpsDMG: number[] = [];
    armorResistance.forEach((armor) => {
      const defaultAttack = attackDamage * (100 / (100 + armor));
      const critAttack = attackDamage * (100 / (100 + armor)) * critDamage;
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
            <td></td>
            <td colSpan={11}>Расчет урона в зависимости от сопортивлений</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Армор</td>
            {armorResistance.map((arm, index) => (
              <td key={index}>{arm}</td>
            ))}
          </tr>
          <tr>
            <td>Урон</td>
            {damage?.map((dmg, index) => (
              <td key={index}>{dmg}</td>
            ))}
          </tr>
          <tr>
            <td>Критический урон</td>
            {criticalDamage?.map((dmg, index) => (
              <td key={index}>{dmg}</td>
            ))}
          </tr>
          <tr>
            <td>Урон в секунду</td>
            {dps?.map((dmg, index) => (
              <td key={index}>{dmg}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DPSTable;
