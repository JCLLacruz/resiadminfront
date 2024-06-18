import React, { FC, ReactNode } from 'react';
import './Button.scss';

interface ButtonPropsInterface {
  text: ReactNode;
}

const Button: FC<ButtonPropsInterface>= ({text}) => {
  return (
    <button>{text}</button>
  );
};

export default Button;
