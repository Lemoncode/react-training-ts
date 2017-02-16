const validate: any = require('validate.js');
import {Training} from '../../../../../models/training';
import {TrainingErrors} from '../../../../../models/trainingErrors';
import {trainingFormConstraints} from './trainingFormConstraints';

class TrainingFormValidations {
  public validateField(fieldName, value): string {
    const errors = validate.single(value, trainingFormConstraints[fieldName]);

    return this.getSingleError(errors);
  }

  private getSingleError(errors: string[]): string {
    return (errors && errors.length > 0) ?
      errors[0] :
      '';
  }

  public validateForm(training: Training): TrainingErrors {
    const errors = validate(training, trainingFormConstraints);

    return this.getTrainingErrors(errors);
  }

  private getTrainingErrors(errors): TrainingErrors {
    const trainingErrors = new TrainingErrors();

    if(errors) {
      trainingErrors.name = this.getSingleError(errors.name);
      trainingErrors.url = this.getSingleError(errors.url);
      trainingErrors.startDate = this.getSingleError(errors.startDate);
      trainingErrors.endDate = this.getSingleError(errors.endDate);
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
