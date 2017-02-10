# 03 TrainingListA

We will take as startup point sample _02 Navigation_.

In this sample we will render a table of trainings using HTML table and rows.

Summary steps:

- Define a model entity (Training)
- Define mock data and trainingAPI.
- Build table component.

## Steps to build it

- We will create Training model:

### ./src/common/models/training.ts
```javascript
export interface Training {
  id: number;
  name: string;
  url: string;
  startDate: number;
  endDate: number;
  isActive: boolean;
}

```

- Now, we can create mock data:

### ./src/rest-api/training/trainingMockData.ts
```javascript

```

- And fake trainingAPI to fetch trainings:

### ./src/rest-api/training/trainingAPI.ts
```javascript
import {Training} from '../../models/training';
import {trainings} from './trainingMockData';

// Fake API using es6 Promises polyfill (with core-js).
// In future, we can replace by real one.
class TrainingAPI {
  public fetchTrainings(): Promise<Training[]> {
    return Promise.resolve(trainings);
  }
}

export const trainingAPI = new TrainingAPI();

```

- Once we have trainingAPI, we can use it in TrainingListPageContainer:

### ./src/pages/training/list/pageContainer.tsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
import {Training} from '../../../models/training';
import {TrainingListPage} from './page';

interface State {
  trainings: Training[];
}

export class TrainingListPageContainer extends React.Component <{}, State> {
  constructor() {
    super();
    this.fetchTrainings();
  }

  // We are creating new array from trainings from API
  // Spread operator is available for arrays too.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
  // Other way to do same:
  // var newTrainings = [].concat(trainings);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
  private fetchTrainings() {
    trainingAPI.fetchTrainings()
      .then((trainings) => {
        this.setState({
          trainings: [...trainings],
        });
      })
      .catch(() => {
        toastr.error('Something was wrong when fetching trainings :(');
      });
  }

  public render() {
    return (
      <TrainingListPage trainings={this.state.trainings} />
    );
  }
}

```

- Now, it's time to create the table:

### ./src/pages/training/list/components/trainingHead.tsx
```javascript
```

### ./src/pages/training/list/components/trainingRow.tsx
```javascript
```

### ./src/pages/training/list/components/trainingList.tsx
```javascript

```

- And use all components in TrainingListPage:

### ./src/pages/training/list/page.tsx
```javascript
import * as React from 'react';

export const TrainingListPage = () => {
  return (
    <div>Training list</div>
  );
}
```

- And of course, update route:

### ./src/routes.tsx
```javascript
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
- import {TrainingListPage} from './pages/training/list/page';
+ import {TrainingListPageContainer} from './pages/training/list/pageContainer';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
-    <Route path={routeConstants.training.list} component={TrainingListPage} />
+    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
  </Route>
);

```
