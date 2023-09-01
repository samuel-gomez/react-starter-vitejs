import { screen, within, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { DefineStepFunction } from 'jest-cucumber';
import { expect } from 'vitest';

export const UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un champ checkbox toggle "(.*)" avec le label "(.*)" non sélectionné$/, async (id, label) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await waitFor(() => expect(inputCheckboxtoggle).not.toBeChecked());
  });

export const UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un champ checkbox toggle "(.*)" avec le label "(.*)" sélectionné$/, async (id, label) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await waitFor(() => expect(inputCheckboxtoggle).toBeChecked());
  });

export const JeCliqueSurLaCheckbox = async (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur la checkbox "(.*)"$/, async label => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const inputCheckboxtoggle = base.getByRole('checkbox', { name: label });
    await userEvent.click(inputCheckboxtoggle);
  });
