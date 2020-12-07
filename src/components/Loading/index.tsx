import React from 'react';
import Loadable from 'react-loadable';

interface LoadingProps extends Loadable.LoadingComponentProps {
  [index: string]: any
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div>Loading...</div>
  )
}

export default Loading