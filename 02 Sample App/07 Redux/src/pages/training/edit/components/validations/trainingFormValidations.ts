const validate: any = require('validate.js');
import {Training} from '../../../../../models/training';
import {TrainingErrors} from '../../../../../models/trainingErrors';
import {trainingFormConstraints} from './trainingFormConstraints';

class TrainingFormValidations {
  public validateField(training: Training, fieldName: string, value): string {
    const updatedTraining = {
      ...training,
      [fieldName]: value,
    };

    const errors = validate(updatedTraining, trainingFormConstraints);

    return this.getSingleError(fieldName, errors);
  }

  private getSingleError(fieldName:string, errors: string[]): string {
    return (errors && errors[fieldName] && errors[fieldName].length > 0) ?
      errors[fieldName][0] :
      '';
  }

  public validateForm(training: Training): TrainingErrors {
    const errors = validate(training, trainingFormConstraints);

    return this.getTrainingErrors(errors);
  }

  private getTrainingErrors(errors): TrainingErrors {
    const trainingErrors = new TrainingErrors();

    if(errors) {
      trainingErrors.name = this.getSingleError('name', errors);
      trainingErrors.url = this.getSingleError('url', errors);
      trainingErrors.endDate = this.getSingleError('endDate', errors);
    }

    return trainingErrors;
  }

  public isValidForm(trainingErrors: TrainingErrors): boolean {
    return Object.keys(trainingErrors).every((error) => {
      return !error && error.length <= 0;
    });
  }
}

export const trainingFormValidations = new TrainingFormValidations();
