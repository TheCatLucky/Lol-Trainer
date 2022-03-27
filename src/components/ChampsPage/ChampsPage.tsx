import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import { Options } from '../../models';
import { ChampionsStore } from '../../store';
import { MyButton, MyInput, MySelect } from '../../ui';
import classes from './ChampsPage.module.scss';
import ChampStats from './ChampStats';

type Props = {
  champsStore: ChampionsStore;
};

const ChampsPage: FC<Props> = (props) => {
  const { champsStore } = props;

  const [selectedChamp, setselectedChamp] = useState('');
  const [showAll, setShowAll] = useState(false);

  const showAllChamps = () => {
    setShowAll(!showAll);
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
  return (
    <div className={classes.wrapper}>
      <MyInput type='text' placeholder='введите текст' />
      <MySelect
        defaultValue='выберте персонажа'
        options={optionsChamps}
        value={selectedChamp}
        onChange={setselectedChamp}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <div className={classes.content}>
        {!showAll &&
          champsStore.champions.map((champ) => {
            if (champ.name === selectedChamp) {
              return <ChampStats champ={champ} />;
            }
            return null;
          })}
        {!!showAll &&
          champsStore.champions.map((champ) => {
            return <ChampStats champ={champ} key={champ.name} />;
          })}
      </div>
    </div>
  );
};

export default observer(ChampsPage);
