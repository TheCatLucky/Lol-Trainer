import { Dispatch, FC, SetStateAction } from 'react';
import { ChampionModel, SelectedItems } from '../../../models';
import ChampStats from '../../ChampsPage/ChampStats';
import DPSTable from '../DPSTable';
import { removeItem } from '../utils';
import classes from './ChampionTable.module.scss';

type Props = {
  championStats: ChampionModel;
  selectedItems: SelectedItems;
  setSelectedItems: Dispatch<SetStateAction<SelectedItems>>;
  champLvl: number;
};
const ChampionTable: FC<Props> = (props) => {
  const { championStats, selectedItems, setSelectedItems, champLvl } = props;

  return (
    <div className={classes.wrapper}>
      <div>
        <ChampStats champion={championStats} lvl={champLvl} />
        <div className={classes.items}>
          {selectedItems.items.map((item, index) => (
            <img
              src={item.img}
              alt={item.name}
              key={item.name + index}
              onClick={() => removeItem(setSelectedItems, selectedItems, index, item)}
            />
          ))}
        </div>
      </div>
      <DPSTable champion={championStats} />
    </div>
  );
};

export default ChampionTable;
