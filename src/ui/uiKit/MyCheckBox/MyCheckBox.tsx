import React, { FC } from 'react';

import classes from './MyCheckBox.module.scss';

type Props = {
  type: string;
  onChange: (e: any) => void;
};

const MyCheckBox: FC<Props> = (props) => {
  return (
    <input
      className={classes.input}
      {...props}
    />
  );
};

export default MyCheckBox;
