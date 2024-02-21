import { screen, within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';

export const UnTexteEstVisible = (instruction: DefineStepFunction, parentLabel = '', instructionName = /^un texte "(.*)" est visible$/) =>
  instruction(instructionName, async content => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const text = await base.findByText(RegExp(content));
    expect(text).toBeInTheDocument();
  });

export const UnMessageEstVisibleAvecLaClass = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^un message "(.*)" est visible avec la classe : "(.*)"$/, (name, className) => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    expect(base.getByText(RegExp(name))).toHaveClass(className);
  });
