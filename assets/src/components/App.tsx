import * as React from 'react';

export interface IAppProps { appName: string; }

export const App = (props: IAppProps) => <h1>Hello from {props.appName}!</h1>;
