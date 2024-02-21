import { screen, within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';

export const UnCodeDecomposantEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un code du composant "(.*)" est visible$/, name => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryAllByText(RegExp(name)).length).toEqual(2);
  });

export const UnEditeurEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un éditeur de propriété est visible$/, async () => {
    const main = await screen.findByLabelText('Main Content');
    const base = await within(main).findByLabelText('Editor props');
    expect(base).toHaveAttribute('class', 'af-draggable-container react-draggable');
  });
