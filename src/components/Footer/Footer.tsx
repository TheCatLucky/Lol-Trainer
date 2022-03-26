import React, { FC } from 'react';
import classes from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.footer}>©Савицкий Евгений</p>
    </div>
  );
};

export default Footer;
