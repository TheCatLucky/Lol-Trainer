import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>Lol Trainer</h1>
      <nav className={classes.navigation}>
        <Link to="/champStats">Статистики персонажей</Link>
        <Link to="/itesmStats">Статистики предметов</Link>
        <Link to="/formField">Form Field</Link>
      </nav>
    </div>
  );
};

export default Header;
