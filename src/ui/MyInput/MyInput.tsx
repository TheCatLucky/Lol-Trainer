import React, { FC } from 'react';
import classes from './MyInput.module.scss';

type Props = {
  type: string;
  placeholder: string;
};

const MyInput: FC<Props> = (props) => {

  return <input className={classes.input} {...props} />;
};
export default MyInput;
