import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { type DefineStepFunction } from 'jest-cucumber';

export const UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible avec la valeur "(.*)", un placeholder "(.*)"$/, (name, value, placeholder) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole(inputRole, { name: RegExp(name) })).toHaveAttribute('value', value);
    expect(base.getByRole(inputRole, { name: RegExp(name) })).toHaveAttribute('placeholder', placeholder);
  });

export const UnChampTextEstVisible = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible$/, fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole(inputRole, { name: RegExp(fieldName) })).toBeInTheDocument();
  });

export const UnChampTextEstVisibleAvecLaValeur = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible avec la valeur "(.*)"$/, async (fieldName, value) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    await waitFor(() => expect(base.getByRole(inputRole, { name: RegExp(fieldName) })).toHaveValue(value));
  });

export const UnChampTextEstMasque = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est masqué$/, fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.queryByRole(inputRole, { name: RegExp(fieldName) })).not.toBeInTheDocument();
  });

export const JeSaisieDansLeChamp = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^je saisie "(.*)" dans le champ "(.*)"$/, async (value, fieldName) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: fieldName });
    const user = userEvent.setup();
    if (value) {
      await user.clear(input);
      await user.type(input, value);
      expect(input).toHaveValue(value);
    }
  });

export const UnChampTextALeFocus = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" a le focus$/, fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    expect(input).toHaveFocus();
  });

export const UnChampTextEstDesactive = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est désactivé$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeDisabled());
  });

export const UnChampTextEstActive = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est activé$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeEnabled());
  });

export const UnChampTextEstOptionnel = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est optionnel$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).not.toBeRequired());
  });

export const UnChampTextEstRequis = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est requis$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toBeRequired());
  });

export const UnChampTextEstEnLectureSeule = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est en lecture seule$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).toHaveAttribute('readOnly'));
  });

export const UnChampTextEstEditable = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est éditable$/, async fieldName => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    await waitFor(() => expect(input).not.toHaveAttribute('readOnly'));
  });

export const UnChampTextEstVisibleAvecSonWrapper = (instruction: DefineStepFunction, parentLabel = '', inputRole = 'textbox') =>
  instruction(/^un champ texte "(.*)" est visible et son wrapper a la classe : "(.*)"$/, (fieldName, classNameWrapper) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const input = base.getByRole(inputRole, { name: RegExp(fieldName) });
    const wrapper = input.closest('div');
    expect(wrapper).toHaveAttribute('class', classNameWrapper);
  });
