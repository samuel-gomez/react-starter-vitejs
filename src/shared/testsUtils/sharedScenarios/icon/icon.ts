import { DefineStepFunction } from 'jest-cucumber';
import { screen, within } from '@testing-library/dom';
import { expect } from 'vitest';

const UnIconeEstVisible = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un icone "(.*)" est visible$/, name => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByRole('img', { name })).toBeInTheDocument();
  });

export default UnIconeEstVisible;
