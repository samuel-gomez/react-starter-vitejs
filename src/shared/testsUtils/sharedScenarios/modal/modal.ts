import { screen, within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';

export const UneModaleApparaitAvecLeTitre = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^une modal apparait avec le titre "(.*)"$/, async modalTitle => {
    const base = parentLabel ? within(await screen.findByLabelText(parentLabel)) : screen;
    const dialog = await base.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(RegExp(modalTitle))).toBeInTheDocument();
  });

export default UneModaleApparaitAvecLeTitre;
