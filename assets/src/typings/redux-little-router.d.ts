interface router {
  reducer: any;
  middleware: any;
  enhancer: any;
}

declare module 'redux-little-router' {
  import { AnyAction } from 'redux';

  export interface RouterState {
    hash: string;
    search: string;
    pathname: string;
    query: { [key: string]: string | number };
    params: { [key: string]: string | number };
  }

  export function routerForBrowser(routes: object): router;
  export function initializeCurrentLocation(routerState: RouterState): AnyAction;
}
