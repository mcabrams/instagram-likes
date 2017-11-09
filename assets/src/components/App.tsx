import * as React from "react";

export interface AppProps { appName: string; }

export const App = (props: AppProps) => <h1>Hello from {props.appName}!</h1>;
