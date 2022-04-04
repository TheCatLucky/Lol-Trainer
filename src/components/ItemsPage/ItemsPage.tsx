import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import { ItemModel, Options } from '../../models';
import { MyButton, MyInput, MySelect } from '../../ui';

import classes from './ItemsPage.module.scss';
import ItemStats from './ItemStats';

type Props = {
  itemsStore: ItemModel[];
};

const ItemsPage: FC<Props> = (props) => {
  const { itemsStore } = props;

  const [selectedItem, setSelectedItem] = useState('');
  const [showAll, setShowAll] = useState(false);

  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  const optionsItems: Options = useMemo(
    () =>
      itemsStore.map((item) => {
        return {
          value: item.name,
          name: item.name,
        };
      }),
    [itemsStore],
  );
  return (
    <div className={classes.wrapper}>
      <MySelect
        defaultValue='выберте предмет'
        options={optionsItems}
        value={selectedItem}
        onChange={setSelectedItem}
      />
      <MyButton onClick={showAllChamps}>{showAll ? 'Убрать' : 'Показать всех'}</MyButton>
      <br />
      <div className={classes.content}>
        {!showAll &&
          itemsStore.map((item) => {
            if (item.name === selectedItem) {
              return <ItemStats item={item} />;
            }

            return null;
          })}

        {!!showAll && itemsStore.map((item) => <ItemStats item={item} key={item.name} />)}
      </div>
    </div>
  );
};

export default observer(ItemsPage);
