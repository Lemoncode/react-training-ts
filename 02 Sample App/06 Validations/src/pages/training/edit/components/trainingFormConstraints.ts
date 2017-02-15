export const trainingFormConstraints = {
  name: {
    presence: true,
  },
  url: {
    presence: true,
    url: true,
  },
  startDate: {
    datetime: true,
  },
  endDate: {
    datetime: true,
  },
};
