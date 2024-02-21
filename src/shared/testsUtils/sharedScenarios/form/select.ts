import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { type DefineStepFunction } from 'jest-cucumber';
import { act } from 'react-dom/test-utils';

export const UnChampListeDeroulanteEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^Un champ liste déroulante "(.*)" est visible$/, async fieldName => {
    const base = parentLabel ? within(await screen.findByLabelText(parentLabel)) : screen;

    expect(base.getByRole('combobox', { name: RegExp(fieldName) })).toBeInTheDocument();
  });

export const JeSelectionneUneValeurSurleChamp = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^Je sélectionne la valeur "(.*)" sur le champ "(.*)"$/, async (type, fieldName) => {
    const base = parentLabel ? within(await screen.findByLabelText(parentLabel)) : screen;

    const selectInput = screen.getByRole('combobox', { name: RegExp(fieldName) });

    await act(async () => {
      await waitFor(() => userEvent.selectOptions(selectInput, type));
    });
    await waitFor(() => expect(base.getByDisplayValue(RegExp(type))).toBeInTheDocument());
  });
