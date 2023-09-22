export const setFieldName = (fieldName = '') => (fieldName ? `${fieldName.trim()} ` : '');

export const setRequiredMessage = (fieldName: string) => `Le champ ${fieldName}est obligatoire`;

const setRequiredFieldRule = (fieldName = '') => ({
  required: setRequiredMessage(setFieldName(fieldName)),
});

export default setRequiredFieldRule;
