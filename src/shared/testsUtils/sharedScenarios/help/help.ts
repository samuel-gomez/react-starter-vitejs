import { screen, within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';

export const UnBoutonHelpEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton Help est visible$/, () => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole('presentation')).toHaveClass('af-popover__container-over');
  });

export const UnBoutonHelpEstMasque = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton Help est masqué$/, () => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryByRole('presentation')).not.toBeInTheDocument();
  });
