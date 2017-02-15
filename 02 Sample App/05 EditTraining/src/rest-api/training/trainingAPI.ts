import {Training} from '../../models/training';
import {trainingsMockData} from './trainingMockData';

// Fake API using es6 Promises polyfill (with core-js).
// In future, we can replace by real one.
class TrainingAPI {
  private trainings: Training[];

  constructor() {
    this.trainings = trainingsMockData;
  }

  public fetchTrainings(): Promise<Training[]> {
    return Promise.resolve(this.trainings);
  }

  public fetchTrainingById(id: number): Promise<Training> {
    const training = this.trainings.find(t => t.id === id);
    return Promise.resolve(training);
  }

  public save(training: Training): Promise<string> {
    const index = this.trainings.findIndex(t => t.id === training.id);

    return index >= 0 ?
      this.saveTrainingByIndex(index, training) :
      Promise.reject<string>('Something was wrong saving training :(');
  }

  // Just ensure no mutable data. Copy in new Array all items but replacing
  // object to update by training from params.
  private saveTrainingByIndex(index, training) {
    this.trainings = [
      ...this.trainings.slice(0, index),
      training,
      ...this.trainings.slice(index + 1)
    ];

    return Promise.resolve('Save training success');
  }
}

export const trainingAPI = new TrainingAPI();
