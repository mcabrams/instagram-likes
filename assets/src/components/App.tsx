import * as React from 'react';
import { InstagramLogin } from './InstagramLogin';

export interface IAppProps { appName: string; }

export const App: React.SFC<IAppProps> = (props) => {
  return (
    <div>
      <h1>Hello from {props.appName}!</h1>
      <InstagramLogin />
    </div>
  );
};
