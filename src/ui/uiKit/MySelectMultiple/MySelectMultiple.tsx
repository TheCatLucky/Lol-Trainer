import React, { FC } from 'react';
import { Options } from '../../../models';
import classes from './MySelectMultiple.module.scss';

type Props = {
  options: Options;
  defaultValue: string;
  value: string[];
  onChange: (item: string) => void;
};

const MySelect: FC<Props> = (props) => {
  const { options, defaultValue, onChange } = props;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <select className={classes.select}
      onChange={handleSelect}>
      <option disabled>{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value}
          value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default MySelect;
