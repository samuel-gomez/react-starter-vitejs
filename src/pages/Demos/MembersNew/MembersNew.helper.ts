import { setRequiredFieldRule } from 'shared/helpers';
import { CIVILITY, LABEL_CIVILITY, FIRSTNAME, LABEL_FIRSTNAME, LASTNAME, LABEL_LASTNAME } from './constants';

export const setRules = () => {
  const civilityRules = setRequiredFieldRule(LABEL_CIVILITY);
  const firstnameRules = setRequiredFieldRule(LABEL_FIRSTNAME);
  const lastnameRules = setRequiredFieldRule(LABEL_LASTNAME);

  return {
    [CIVILITY]: civilityRules,
    [FIRSTNAME]: firstnameRules,
    [LASTNAME]: lastnameRules,
  };
};

export type TReturnSetRules = ReturnType<typeof setRules>;
