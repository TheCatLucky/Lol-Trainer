import { FC } from 'react';
import Portal from '../Portal';
import classes from './Popup.module.scss';

type Props = {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

const Popup: FC<Props> = (props) => {
  const { children, isOpened, onClose } = props;
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.container}>
        <div className={classes.overlay}
          role="button"
          tabIndex={0}
          onClick={onClose}
        />
        {children}
      </div>
    </Portal>
  );
};
export default Popup;
