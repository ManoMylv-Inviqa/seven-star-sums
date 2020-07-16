import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { StatusState } from '../../types/types';
import { useStatus } from '../../context/StatusContext';

const withAnimation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  showStatus: StatusState['gameStatus']
) => (props: P): JSX.Element => {
  const { gameStatus } = useStatus();
  const show = gameStatus === showStatus;

  return (
    <CSSTransition mountOnEnter unmountOnExit in={show} timeout={1200} classNames="slide-anim">
      <WrappedComponent {...props} />
    </CSSTransition>
  );
};

export default withAnimation;
