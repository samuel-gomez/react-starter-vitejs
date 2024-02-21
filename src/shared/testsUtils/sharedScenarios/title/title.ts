import { type DefineStepFunction } from 'jest-cucumber';
import expectTitle from './expectTitle';

const UnTitreEstVisible = (instruction: DefineStepFunction, level = 1, parentLabel = '') =>
  instruction(/^un titre "(.*)" est visible$/, title => {
    expectTitle({ name: RegExp(title), level, parentLabel });
  });

export default UnTitreEstVisible;
