import * as moment from 'moment';
import {Training} from '../../../../../models/training';
import {formatConstants} from '../../../../../common/constants/formatConstants';

export const trainingFormConstraints = {
  name: {
    presence: true,
  },
  url: {
    presence: true,
    url: true,
  },
  endDate: (value: number, training: Training) => {
    const startDateFormatted = moment(training.startDate)
      .format(formatConstants.shortDate);

    return {
      numericality: {
        greaterThan: training.startDate,
        message: `must be greater than ${startDateFormatted}`,
      },
    };
  },
};
