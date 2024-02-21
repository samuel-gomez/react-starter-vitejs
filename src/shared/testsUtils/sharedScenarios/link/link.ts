import { type DefineStepFunction } from 'jest-cucumber';
import expectLink from './expectLink';

export const UnLienEstMasque = (instruction: DefineStepFunction, role = 'link') =>
  instruction(/^un lien "(.*)" est masqué$/, name => {
    expectLink({ name, role, isQueryByRole: true, beInDoc: false });
  });

export const UnLienEstVisible = (instruction: DefineStepFunction, role = 'link', parentLabel = '') =>
  instruction(/^un lien "(.*)" est visible avec un href "(.*)"$/, (name, href) => {
    expectLink({ name, href, role, parentLabel });
  });
