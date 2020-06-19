import React from 'react';
import './Button.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  handler(): void;
  modifiers?: string | string[];
}

const Button: React.FC<ButtonProps> = ({ children, type, handler, modifiers }) => {
  let CSSclass = '';
  if (typeof modifiers === 'string') {
    CSSclass = `btn btn--${modifiers}`;
  }
  if (typeof modifiers === 'object' && modifiers !== null) {
    const expandedModifiers = modifiers.map((modifier) => `btn--${modifier}`).join(' ');
    CSSclass = `btn ${expandedModifiers}`;
  }

  return (
    <button type={type} className={CSSclass} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
