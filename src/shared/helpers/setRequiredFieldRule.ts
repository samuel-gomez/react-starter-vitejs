export const setRequiredMessage = (fieldName = '') => `Le champ ${fieldName ? `${fieldName} ` : ''}est obligatoire`;

const setRequiredFieldRule = (fieldName = '') => ({
  required: setRequiredMessage(fieldName),
});

export default setRequiredFieldRule;
