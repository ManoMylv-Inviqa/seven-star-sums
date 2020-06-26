import React from 'react';
import Button from '../../../UI/atoms/Button/Button';

interface AnswerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: number;
  clicked(): void;
}

const Answer: React.FC<AnswerProps> = ({ value, clicked }) => {
  const modifiers = ['round', 'round-large'];
  return (
    <Button type="button" handler={clicked} modifiers={modifiers}>
      {value}
    </Button>
  );
};

export default Answer;
