# 02 Navigation

We will take as startup point sample _01 Login_.

In this sample we will start using React-Router (SPA navigation).

Summary steps:

- Define routes.
- Update components.
- Navigate from LoginPage to a blank list page.

## Steps to build it

- We will start to define route constants file:

### ./src/common/constants/routeConstants.ts
```javascript
export const routeConstants = {
  default: '/',
  login: '/login',
};

```

- And now create AppRoutes component where we can define which route maps to component:

### ./src/routes.tsx
```javascript
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
  </Route>
);

```

- Due to we are render LoginPageContainer inside App component via React-Router, we need to update App component:

### ./src/app.tsx
```javascript
import * as React from 'react';
- import {LoginPageContainer} from './pages/login/pageContainer';
const classNames: any = require('./appStyles');

// With this.props.children we are placing App children components
// where we want to render it.
- export const App = () => {
+ export class App extends React.Component<{}, {}> {
+   public render() {
      return (
        <div className={`container-fluid ${classNames.app}`}>
-         <LoginPageContainer />
+         {this.props.children}
        </div>
      );
+   }
}

```

- And finally, we only need to update _index.tsx_ entry point:

### ./src/index.tsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import {App} from './app';
+ import {Router, hashHistory} from 'react-router';
+ import {AppRoutes} from './routes';

ReactDOM.render(
-  <App />,
+  <Router history={hashHistory} routes={AppRoutes} />,
  document.getElementById('root'),
);

```
