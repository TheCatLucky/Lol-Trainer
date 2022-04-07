import React, { FC } from 'react';
import classes from './MyInput.module.scss';

type Props = {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (lvl: number) => void;
  min?: number;
  max?: number;
};

const MyInput: FC<Props> = (props) => {
  const { type, placeholder, value, onChange, min, max } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.currentTarget.value));
  };
  const classNames = [];

  if (type === 'string') {
    classNames.push(classes.string);
  } else if (type === 'number') {
    classNames.push(classes.number);
  }

  return (
    <input
      className={classNames.join(' ')}
      value={value}
      placeholder={placeholder}
      type={type}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};
export default MyInput;
