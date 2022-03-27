import React, { FC } from 'react';
import { Options } from '../../models';
import classes from './MySelect.module.scss';

type Props = {
  options: Options;
  defaultValue: string;
  value: string | string[];
  onChange: (item: string) => void;
};

const MySelect: FC<Props> = (props) => {
  const { options, defaultValue, onChange } = props;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value);
  };
  return (
    <select className={classes.select} onChange={handleSelect}>
      <option disabled>{defaultValue}</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default MySelect;
