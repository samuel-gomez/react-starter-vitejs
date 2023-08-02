import { screen, within } from '@testing-library/dom';
import { DefineStepFunction } from 'jest-cucumber';

export const UnTexteEstVisible = (instruction: DefineStepFunction, parentLabel = '', instructionName = /^un texte "(.*)" est visible$/) =>
  instruction(instructionName, text => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;

    expect(base.getByText(RegExp(text))).toBeInTheDocument();
  });

export const UnMessageEstVisibleAvecLaClass = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un message "(.*)" est visible avec la classe : "(.*)"$/, (name, className) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByText(RegExp(name))).toHaveClass(className);
  });
