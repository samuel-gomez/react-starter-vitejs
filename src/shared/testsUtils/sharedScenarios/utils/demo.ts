import { DefineStepFunction } from 'jest-cucumber';
import { screen, within } from '@testing-library/dom';
import { expect } from 'vitest';

export const UnCodeDecomposantEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un code du composant "(.*)" est visible$/, name => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryAllByText(RegExp(name)).length).toEqual(2);
  });

export const UnEditeurEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un éditeur de propriété est visible$/, () => {
    expect(screen.getByLabelText('Edit props')).toHaveAttribute('class', 'af-draggable-container react-draggable');
  });
