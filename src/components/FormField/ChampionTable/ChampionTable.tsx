import { Dispatch, FC, SetStateAction, useState } from 'react';

import { ChampionModel, SelectedItems } from '../../../models';
import ChampStats from '../../ChampsPage/ChampStats';
import ChampSkills from '../ChampSkills';
import DPSTable from '../DPSTable';
import SpellDamageTable from '../SpellDamageTable';
import { removeItem } from '../utils';
import classes from './ChampionTable.module.scss';

type Props = {
  champion: ChampionModel;
  selectedItems: SelectedItems;
  setSelectedItems: Dispatch<SetStateAction<SelectedItems>>;
  champLvl: number;
};

const ChampionTable: FC<Props> = (props) => {
  const { champion, selectedItems, setSelectedItems, champLvl } = props;
  const [QLvl, setQLvl] = useState(0);
  const [WLvl, setWLvl] = useState(0);
  const [ELvl, setELvl] = useState(0);
  const [RLvl, setRLvl] = useState(0);

  return (
    <div className={classes.wrapper}>
      <div>
        <ChampStats champion={champion}
          lvl={champLvl}
        />
        <div className={classes.skillsWrapper}>
          <ChampSkills ELvl={ELvl}
            QLvl={QLvl}
            RLvl={RLvl}
            WLvl={WLvl}
            champLvl={champLvl}
            champion={champion}
            setELvl={setELvl}
            setQLvl={setQLvl}
            setRLvl={setRLvl}
            setWLvl={setWLvl}
          />
        </div>
        <div className={classes.items}>
          {
            selectedItems.items.map((item, index) => (
              <img alt={item.name}
                key={item.name + index}
                src={item.img}
                onClick={() => removeItem(setSelectedItems, selectedItems, index, item)}
              />
            ))
          }
        </div>
      </div>
      <div>
        <DPSTable champion={champion} />
        {
          QLvl > 0 && (
            <SpellDamageTable champion={champion}
              skillLvl={QLvl}
              spell={champion.spells[0]}
            />
          )
        }
        {
          WLvl > 0 && (
            <SpellDamageTable champion={champion}
              skillLvl={WLvl}
              spell={champion.spells[1]}
            />
          )
        }
        {
          ELvl > 0 && (
            <SpellDamageTable champion={champion}
              skillLvl={ELvl}
              spell={champion.spells[2]}
            />
          )
        }
        {
          RLvl > 0 && (
            <SpellDamageTable champion={champion}
              skillLvl={RLvl}
              spell={champion.spells[3]}
            />
          )
        }
      </div>
    </div>
  );
};

export default ChampionTable;
