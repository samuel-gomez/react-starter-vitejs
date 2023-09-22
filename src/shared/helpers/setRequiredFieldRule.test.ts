import setRequiredFieldRule, { setRequiredMessage, setFieldName } from './setRequiredFieldRule';

describe('setRequiredFieldRule', () => {
  it('Should return rule with name field when setRequiredFieldRule called with name field', () => {
    const result = setRequiredFieldRule('Nom');
    const expected = {
      required: 'Le champ Nom est obligatoire',
    };
    expect(result).toEqual(expected);
  });
  it('Should return generic rule when setRequiredFieldRule called without name field', () => {
    const result = setRequiredFieldRule();
    const expected = {
      required: 'Le champ est obligatoire',
    };
    expect(result).toEqual(expected);
  });
});

describe('setRequiredMessage', () => {
  it('Should return message with name field when setRequiredMessage called with name field', () => {
    const result = setRequiredMessage('Nom ');
    const expected = 'Le champ Nom est obligatoire';
    expect(result).toEqual(expected);
  });
  it('Should return generic message when setRequiredMessage called without name field', () => {
    const result = setRequiredMessage('');
    const expected = 'Le champ est obligatoire';
    expect(result).toEqual(expected);
  });
});

describe('setFieldName', () => {
  it('Should return name field with space when setFieldName called with name field', () => {
    const result = setFieldName('Nom');
    const expected = 'Nom ';
    expect(result).toEqual(expected);
  });
  it('Should return empty string when setFieldName called without name field', () => {
    const result = setFieldName();
    const expected = '';
    expect(result).toEqual(expected);
  });
});
