import React from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

type IProps =  {
  className?: string
  animation?: AnimationName
} & CSSTransitionProps

const Transition: React.FC<IProps> = (props) => {
  const {
    className,
    animation,
    children,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames={className ? className : animation}
      {...restProps}
    >
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true
}

export default Transition