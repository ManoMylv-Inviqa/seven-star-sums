import React from 'react';
import './Button.css';
import { getCssClasses } from '../../../helpers/helpers';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  handler(): void;
  modifiers?: string | string[];
  buttonId?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type, handler, modifiers, buttonId }) => {
  const CSSclass = getCssClasses('btn', modifiers);

  return (
    <button key={buttonId} type={type} className={CSSclass} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
