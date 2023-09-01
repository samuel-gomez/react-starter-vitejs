import { screen, within, waitFor } from '@testing-library/dom';
import { DefineStepFunction } from 'jest-cucumber';
import { expect } from 'vitest';

export const UnAideALaSaisieEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^une aide à la saisie "(.*)" est visible$/, text => {
    expect(screen.getByText(RegExp(text))).toBeInTheDocument();
  });

export const UnLabelEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un label "(.*)" est visible$/, async name => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    await waitFor(() => expect(base.getByLabelText(RegExp(name))).toBeInTheDocument());
  });
