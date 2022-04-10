import React, { FC } from 'react';
import classes from './MyButton.module.scss';

type Props = {
  children: React.ReactChild;
  onClick: () => void;
};

const MyButton: FC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};
export default MyButton;
