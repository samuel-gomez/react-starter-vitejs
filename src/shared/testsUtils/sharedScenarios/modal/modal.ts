import { DefineStepFunction } from 'jest-cucumber';
import { screen, within } from '@testing-library/dom';
import { expect } from 'vitest';

export const UneModaleApparaitAvecLeTitre = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^une modal apparait avec le titre "(.*)"$/, async modalTitle => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const dialog = base.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(RegExp(modalTitle))).toBeInTheDocument();
  });

export default UneModaleApparaitAvecLeTitre;
