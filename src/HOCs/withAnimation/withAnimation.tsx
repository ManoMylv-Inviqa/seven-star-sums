import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { AppState } from '../../types/types';

interface WrappedProps {
  gameStatus: AppState['gameStatus'];
}

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const withAnimation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  showStatus: AppState['gameStatus']
) => (props: P & WrappedProps) => {
  const show = props.gameStatus === showStatus;

  return (
    <CSSTransition mountOnEnter unmountOnExit in={show} timeout={1200} classNames="slide-anim">
      <WrappedComponent {...props} />
    </CSSTransition>
  );
};

export default withAnimation;
