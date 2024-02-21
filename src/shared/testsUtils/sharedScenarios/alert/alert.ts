import { type DefineStepFunction } from 'jest-cucumber';
import { getBase } from '../utils';

const expectAlertHaveTextContent = async ({ parentLabel = '', messageAlert }: { parentLabel: string; messageAlert: string }) => {
  const base = getBase(parentLabel);
  const alert = await base.findByRole('alert');
  expect(alert).toHaveTextContent(RegExp(messageAlert));
  return alert;
};

export const UneAlertErrorContenantLeMessage = (
  instruction: DefineStepFunction,
  parentLabel = '',
  scenarioName = /^une alerte de type error contenant le message : "(.*)"$/,
) =>
  instruction(scenarioName, async messageAlert => {
    const alert = await expectAlertHaveTextContent({ parentLabel, messageAlert });
    expect(alert).toHaveClass('af-alert--error');
  });

export const UneAlertInfoContenantLeMessage = (
  instruction: DefineStepFunction,
  parentLabel = '',
  scenarioName = /^une alerte de type info contenant le message : "(.*)"$/,
) =>
  instruction(scenarioName, async messageAlert => {
    const alert = await expectAlertHaveTextContent({ parentLabel, messageAlert });
    expect(alert).toHaveClass('af-alert--info');
  });

export const UneAlertDangerContenantLeMessage = (
  instruction: DefineStepFunction,
  parentLabel = '',
  scenarioName = /^une alerte de type danger contenant le message : "(.*)"$/,
) =>
  instruction(scenarioName, async messageAlert => {
    const alert = await expectAlertHaveTextContent({ parentLabel, messageAlert });
    expect(alert).toHaveClass('af-alert--danger');
  });

export const UneAlertSuccessContenantLeMessage = (
  instruction: DefineStepFunction,
  parentLabel = '',
  scenarioName = /^une alerte de type success contenant le message : "(.*)"$/,
) =>
  instruction(scenarioName, async messageAlert => {
    const alert = await expectAlertHaveTextContent({ parentLabel, messageAlert });
    expect(alert).toHaveClass('af-alert--success');
  });
