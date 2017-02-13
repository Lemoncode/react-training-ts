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
