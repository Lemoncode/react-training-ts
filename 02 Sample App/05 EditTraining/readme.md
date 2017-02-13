# 05 EditTraining

We will take as startup point sample _04 TrainingListB_.

In this sample we will build an edit form and apply validations.

Summary steps:

- Navigate to edit training form by id.
- Build TrainingEditPage.
- Add form validations.

## Steps to build it

- We can start to create a blank TrainingEditPage, to work with navigation:

### ./src/pages/training/edit/page.tsx

```javascript
import * as React from 'react';

export const TrainingEditPage = () => {
  return (
    <div>Training Edit page</div>
  );
}

```

- Add route constant:

### ./src/common/constants/routeConstants.ts
```javascript
const trainingRoute = '/training';

export const routeConstants = {
  default: '/',
  training: {
    list: `${trainingRoute}/list`,
+   edit: `${trainingRoute}/edit`,
+   editWithParams: `${trainingRoute}/edit/:id`,
  },
};

```

- And route:

### ./src/routes.tsx
```javascript
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
import {TrainingListPageContainer} from './pages/training/list/pageContainer';
+ import {TrainingEditPage} from './pages/training/edit/page';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
+   <Route path={routeConstants.training.editWithParams} component={TrainingEditPage} />
  </Route>
);

```

- Finally, update _TrainingRowComponent_ to navigate to TrainingEditPage by training Id:

### ./src/pages/training/list/components/trainingRow.tsx
```javascript
import * as React from 'react';
+ import {Link} from 'react-router';
import {Training} from '../../../../models/training';
import {TableRowProps, TableRowComponent} from '../../../../common/components/tableRow';
const classNames: any = require('./trainingRowStyles');
+ import {routeConstants} from '../../../../common/constants/routeConstants';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
interface Props extends TableRowProps {
  rowData: Training;
}

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props: Props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
      // We have enable camelCase parser in webpack.config.js
      className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
-     <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
+     <Link
+       to={`${routeConstants.training.edit}/${props.rowData.id}`}
+       className=" btn btn-primary"
+     >
+       <i className="glyphicon glyphicon-pencil" />
+     </Link>
    </TableRowComponent>
  );
}

```

- Once we have navigation, we can start with creating _TrainingFormComponent_.

### ./src/common/components/input.tsx
```javascript
import * as React from 'react';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
+ className?: string;
}

export const InputComponent = (props: Props) => {
  return (
-   <div className="form-group">
+   <div className={`form-group ${props.className}`}>
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
### ./src/common/components/checkbox.tsx
```javascript
import * as React from 'react';

interface Props {
  label: string;
  name: string;
  value: boolean;
  onChange: any;
  className?: string;
}

export const CheckBoxComponent = (props: Props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <label htmlFor={props.name}>
        <input
          type="checkbox"
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
        />
        {props.label}
      </label>
    </div>
  );
}

```
- Install [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar) and [react-addons-css-transition-group](https://www.npmjs.com/package/react-addons-css-transition-group) dependency. This library has not typings, so we have to import using [webpack-env](https://www.npmjs.com/package/@types/webpack-env) `require` method:

```
npm install react-infinite-calendar react-addons-css-transition-group --save
```

- Install [moment](https://github.com/moment/moment) to work with Dates. This library has typings for TypeScript:

```
npm install moment --save
```

- Install [react-modal](https://github.com/reactjs/react-modal) and typings to open calendar as modal window:

```
npm install react-modal --save
npm install @types/react-modal --save-dev
```

- Add libraries as vendor and vendorStyles:

### ./webpack.config.js
```javascript
entry: {
  ...
  vendor: [
    ...
    'toastr',
    'react-addons-shallow-compare',
    'react-virtualized',
+   'react-infinite-calendar',
+   'react-addons-css-transition-group',
+   'moment',
+   'react-modal',
  ],
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
    '../node_modules/react-virtualized/styles.css',
+   '../node_modules/react-infinite-calendar/styles.css',
  ],
```

### ./src/pages/training/edit/components/trainingForm.tsx
```javascript

```
