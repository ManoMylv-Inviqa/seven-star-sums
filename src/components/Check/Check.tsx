import React from 'react';
import Button from '../_atoms/Button/Button';
import '../Answers/Answers.css';
import withAnimation from '../../HOCs/withAnimation/withAnimation';

interface CheckProps extends React.HTMLAttributes<HTMLDivElement> {
  yesClicked(): void;
  noClicked(): void;
}

const Check: React.FC<CheckProps> = ({ yesClicked, noClicked }) => {
  const modifiers = 'horizontal';
  return (
    <div className="container answer-container flex-order--3">
      <div>
        <h4 className="white-text">Are you sure?</h4>
      </div>
      <Button type="button" handler={yesClicked} modifiers={modifiers}>
        Yes
      </Button>
      <Button type="button" handler={noClicked} modifiers={modifiers}>
        No
      </Button>
    </div>
  );
};

export default withAnimation(Check, 'confirmAnswer');
