# 01 Login

We will take as startup point sample _00 Boilerplate_.

In this sample we are going to implement a Login component with React.

Summary steps:

- Build login component.
- Interact with fake API.
- Login notification displaying on success or fail.

## Steps to build it

- Delete _./src/hello.tsx_ and _./src/helloStyles.css_ files.

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

### ./src/appStyles.css
```css
.app {
  margin-top: 20px;
}

```

### ./src/app.tsx
```javascript
import * as React from 'react';
import {LoginPage} from './pages/login/page';
const classNames: any = require('./appStyles');

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPage />
    </div>
  );
}

```

- Update _./src/index.tsx_ to use App component:

### ./src/index.tsx
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

- Now, we can start to implement Login Header like:

### ./src/pages/login/components/header.tsx
```javascript
import * as React from 'react';

export const HeaderComponent = () => {
  return (
    <div className="panel-heading">
      <h3 className="panel-title">
        <p>Please sign in</p>
        <p>(login: admin / pwd: test)</p>
      </h3>
    </div>
  );
};

```

- And using it in LoginPage

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
+ import {HeaderComponent} from './components/header';

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
-            <div>Header Component</div>
-            <HeaderComponent />
            <div>Form Component</div>
          </div>
        </div>
      </div>
    </div>
  );
};

```

- We need a model to bind to our login form like:

### ./src/models/loginCredential.ts
```javascript
export class LoginCredential {
  login: string;
  password: string;

  constructor() {
    this.login = '';
    this.password = '';
  }
}

```

- And build our _Form Component_:

### ./src/pages/login/components/form.tsx
```javascript
import * as React from 'react';
import {LoginCredential} from '../../../models/loginCredential';

interface Props {
  loginCredential: LoginCredential;
  updateLoginInfo: (fieldName: string, value: string) => void;
}

export const FormComponent = (props: Props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

  return (
    <div className="panel-body">
      <form role="form">
        <div className="form-group">
          <label htmlFor="login">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            label="login"
            placeholder="Login"
            name="login"
            value={props.loginCredential.login}
            onChange={updateLoginInfo.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            label="Password"
            placeholder="Password"
            name="password"
            value={props.loginCredential.password}
            onChange={updateLoginInfo.bind(this)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success btn-block"
        >
          Login
        </button>
      </form>
    </div>
  );
};

```

- Now it's time to give state to our **Login Page** and pass properties to **FormComponent**:

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
import {HeaderComponent} from './components/header';
+ import {LoginCredential} from '../../models/loginCredential';
+ import {FormComponent} from './components/form';

+ interface State {
+   loginCredential: LoginCredential;
+ }

- export const LoginPage = () => {
+ export class LoginPage extends React.Component <{}, State> {  
+   constructor() {
+     super();
+      
+     this.state = {
+       loginCredential: new LoginCredential(),
+     };
+   }
+
+   private updateLoginInfo(fieldName: string, value: string) {
+     this.setState({
+       loginCredential: {
+         ...this.state.loginCredential,
+         [fieldName]: value,
+       }
+     });
+   }
+
+   public render() {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <HeaderComponent />
-              <div>Form Component</div>
+              <FormComponent
+                loginCredential={this.state.loginCredential}
+                updateLoginInfo={this.updateLoginInfo.bind(this)}
+              />
            </div>
          </div>
        </div>
      );
  }
};

```
