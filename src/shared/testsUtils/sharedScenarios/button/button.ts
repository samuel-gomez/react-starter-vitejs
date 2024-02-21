import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { type DefineStepFunction } from 'jest-cucumber';

import expectButton from './expectButton';

export const UnBoutonEstMasque = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton "(.*)" est masqué$/, name => {
    expectButton({ name, isQueryByRole: true, beInDoc: false, parentLabel });
  });

export const UnBoutonEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton "(.*)" est visible$/, name => {
    expectButton({ name, beDisabled: false, parentLabel });
  });

export const UnBoutonEstDesactive = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un bouton "(.*)" est désactivé$/, name => {
    expectButton({ name, parentLabel });
  });

export const UnBoutonSansLabelEstVisible = (instruction: DefineStepFunction, instructionName = /^un bouton est visible$/, parentLabel = '') =>
  instruction(instructionName, async () => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const button = await base.findByRole('button');
    expect(button).toBeInTheDocument();
  });

export const UnBoutonSansLabelEstMasque = (instruction: DefineStepFunction, instructionName = /^un bouton est masqué$/, parentLabel = '') =>
  instruction(instructionName, () => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;

    const button = base.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

export const JeCliqueSurLeBouton = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur le bouton "(.*)"$/, labelBtn => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    userEvent.click(base.getByText(labelBtn));
  });

export const JeCliqueSurLeBoutonIcone = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^je clique sur le bouton icone "(.*)"$/, labelBtn => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    userEvent.click(base.getByLabelText(labelBtn));
  });
