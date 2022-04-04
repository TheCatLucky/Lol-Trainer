import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import { ItemModel, Options } from '../../models';
import { MyButton, MySelect } from '../../ui';
import Shop from '../FormField/Shop';

import classes from './ItemsPage.module.scss';
import ItemStats from './ItemStats';

type Props = {
  itemsStore: ItemModel[];
};

const ItemsPage: FC<Props> = (props) => {
  const { itemsStore } = props;

  const [selectedItem, setSelectedItem] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [currentItem, setCurrentItem] = useState<ItemModel | null>(null);
  const showAllChamps = () => {
    setShowAll(!showAll);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //console.log(e);
  };
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, item: ItemModel) => {
    setCurrentItem(item);
    console.log(item);
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    //console.log(e);
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, item: ItemModel) => {
    e.preventDefault();

    console.log(item);
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
              return (
                <ItemStats
                  item={item}
                  onDragStart={(e) => dragStartHandler(e, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, item)}
                  draggable={true}
                />
              );
            }

            return null;
          })}
        {!!showAll &&
          itemsStore.map((item) => (
            <ItemStats
              item={item}
              key={item.name}
              onDragStart={(e) => dragStartHandler(e, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
              draggable={true}
            />
          ))}
        <Shop items={itemsStore} />
      </div>
    </div>
  );
};

export default observer(ItemsPage);
