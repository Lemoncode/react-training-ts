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
+            <HeaderComponent />
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
+ import {LoginCredential} from '../../models/loginCredential';
import {HeaderComponent} from './components/header';
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

- Before we will continue with connecting Login Component with API, we can refactor login form, to apply DRY principle:

### ./src/common/components/form/input.tsx

```javascript
import * as React from 'react';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
}

export const InputComponent = (props: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

```

- Now, we can reuse InputComponent:

### ./src/pages/login/components/form.tsx
```javascript
import * as React from 'react';
import {LoginCredential} from '../../../models/loginCredential';
+ import {InputComponent} from '../../../common/components/input';

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
-        <div className="form-group">
-          <label htmlFor="login">
-            Login
-          </label>
-          <input
-            type="text"
-            className="form-control"
-            placeholder="Login"
-            name="login"
-            value={props.loginCredential.login}
-            onChange={updateLoginInfo.bind(this)}
-          />
-        </div>
+        <InputComponent
+          label="Login"
+          type="text"
+          name="login"
+          placeholder="Login"
+          value={props.loginCredential.login}
+          onChange={updateLoginInfo.bind(this)}
+        />
-        <div className="form-group">
-          <label htmlFor="password">
-            Password
-          </label>
-          <input
-            type="password"
-            className="form-control"
-            placeholder="Password"
-            name="password"
-            value={props.loginCredential.password}
-            onChange={updateLoginInfo.bind(this)}
-          />
-        </div>
+        <InputComponent
+          label="Password"
+          type="password"
+          name="password"
+          placeholder="Password"
+          value={props.loginCredential.password}
+          onChange={updateLoginInfo.bind(this)}
+        />
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

## Create fake API

- First we are going to create LoginResponse model:

### ./src/models/userProfile.ts
```javascript
export class UserProfile {
  id: number;
  login: string;
  fullname: string;
  role: string;

  constructor() {
    this.id = 0;
    this.login = '';
    this.fullname = '';
    this.role = '';
  }
}

```

### ./src/models/loginResponse.ts
```javascript
import {UserProfile} from './userProfile';

export class LoginResponse {
  succeeded: boolean;
  userProfile: UserProfile;

  constructor() {
    this.succeeded = false;
    this.userProfile = new UserProfile();
  }
}

```

- Create mock data:

### ./src/rest-api/login/loginMockData.ts
```javascript
import {LoginResponse} from '../../models/loginResponse';

export const loginMockResponse: LoginResponse = {
  succeeded: true,
  userProfile: {
    id: 1,
    login: 'admin',
    fullname: 'Admin',
    role: 'admin',
  },
};

```

### ./src/rest-api/login/loginAPI.ts
```javascript
import {LoginCredential} from '../../models/loginCredential';
import {LoginResponse} from '../../models/loginResponse';
import {loginMockResponses} from './loginMockData';

class LoginAPI {
  public login(loginCredential: LoginCredential): Promise<LoginResponse> {
    let loginResponse = loginMockResponses.find((response) => {
      return response.userProfile.login === loginCredential.login;
    });

    if (!loginResponse || loginCredential.password !== 'test') {
      return Promise.reject<LoginResponse>('Invalid login or password');
    }

    return Promise.resolve(loginResponse);
  }
}

export const loginAPI = new LoginAPI();

```

- Now, we can request login in login Page using this API:

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
import {LoginCredential} from '../../models/loginCredential';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

interface State {
  loginCredential: LoginCredential;
}

export class LoginPage extends React.Component <{}, State> {
  constructor() {
    super();

    this.state = {
      loginCredential: new LoginCredential(),
    };
  }

  private updateLoginInfo(fieldName: string, value: string) {
    this.setState({
      loginCredential: {
        ...this.state.loginCredential,
        [fieldName]: value,
      }
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <HeaderComponent />
            <FormComponent
              loginCredential={this.state.loginCredential}
              updateLoginInfo={this.updateLoginInfo.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};

```
