import { FC, useState, useEffect } from 'react';
import { ChampionModel } from '../../../models';
import classes from './DPSTable.module.scss';

type Props = {
  champion: ChampionModel;
};
const DPSTable: FC<Props> = (props) => {
  const { champion } = props;
  const { attackDamage, attackSpeed, critDamage, critChance } = champion;
  const armorResistance = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [damage, setDamage] = useState([0]);
  const [criticalDamage, setCriticalDamage] = useState([0]);
  const [dps, setDps] = useState([0]);

  useEffect(() => {
    // проследить кол-во рендеров
    const nonCritDmg: number[] = [];
    const critDMG: number[] = [];
    const dpsDMG: number[] = [];
    armorResistance.forEach((armor) => {
      critDMG.push(Math.floor(+attackDamage * (100 / (100 + armor)) * critDamage));
      nonCritDmg.push(Math.floor(+attackDamage * (100 / (100 + armor))));
      dpsDMG.push(
        Math.floor(
          +attackDamage * (100 / (100 + armor)) * critDamage * +attackSpeed * (1 + +critChance),
        ),
      );
    });

    console.log(nonCritDmg);
    setDamage(nonCritDmg);
    setCriticalDamage(critDMG);
    setDps(dpsDMG);
  }, [champion]);
  console.log(damage);
  return (
    <div>
      <table className={classes.table}>
        <thead>
          <tr>
            <td colSpan={12}>Расчет урона в зависимости от сопортивлений</td>
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
