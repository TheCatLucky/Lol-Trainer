import React, { FC } from 'react';
import classes from './MyInput.module.scss';

type Props = {
  type: 'string' | 'number';
  placeholder: string;
  value: string | number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const MyInput: FC<Props> = (props) => {
  const { type, placeholder, value, onChange, min, max } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (max && Number(event.currentTarget.value) > max) {
      onChange(Number(max));
    } else if (type === 'number') {
      onChange(Number(event.currentTarget.value));
    }
  };
  const classNames = [];

  if (type === 'string') {
    classNames.push(classes.string);
  } else if (type === 'number') {
    classNames.push(classes.number);
  }

  return (
    <input className={classNames.join(' ')}
      max={max}
      min={min}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};
export default MyInput;
