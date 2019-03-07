export default {
  number: {
    errorMessage: 'This field only accept numbers.',
    regex: '^([0-9])+$'
  },
  required: {
    errorMessage: 'This field is required.',
    regex: '^(?=[a-z]*[A-Z]).*$'
  },
  text: {
    errorMessage: 'This field only accept letters',
    regex: '.+$'
  }
};
