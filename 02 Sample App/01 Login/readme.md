# 01 Login

We will take as startup point sample _00 Boilerplate_.

In this sample we are going to implement a Login component with React.

Summary steps:

- Build login component.
- Interact with fake API.
- Login notification displaying on success or fail.

## Steps to build it

- Delete _./src/hello.tsx_ file.

- Create a first version of _Login page_:

### ./src/pages/login/page.tsx

```javascript
import * as React from 'react';

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div>Header Component</div>
            <div>Form Component</div>
          </div>
        </div>
      </div>
    </div>
  );
};

```
- Create _./src/app.tsx_ file like App entry point where calls to pages:

```javascript
import * as React from 'react';
import {LoginPage} from './pages/login/page';

export const App = () => {
  return (
    <div className="container-fluid">
     <LoginPage />
    </div>
  );
}

```

- Update _./src/index.tsx_ to use App component:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import {HelloComponent} from './hello';
+ import {App} from './app';

ReactDOM.render(
-  <HelloComponent />,
+  <App />,
  document.getElementById('root'),
);

```
