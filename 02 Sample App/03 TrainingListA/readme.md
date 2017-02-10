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
