import * as React from 'react';
import LoginContainer from '../containers/LoginContainer';

export interface IAppProps { appName: string; }

export const App: React.SFC<IAppProps> = (props) => {
  return (
    <div>
      <h1>Hello from {props.appName}!</h1>
      <LoginContainer />
    </div>
  );
};
