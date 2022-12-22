import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render, userEvent } from 'shared/testsUtils/customRender';
import App from '../App';

configure({ defaultHidden: true });

const feature = loadFeature('features/App/App.feature');

defineFeature(feature, test => {
  test('Render App', ({ given, then }) => {
    given('I render my app', () => {
      render(<App />);
    });

    then(/^I see : "(.*)"$/, async text => {
      await screen.findByText(text);
    });
  });

  test('Render App and click counter', ({ given, when, then }) => {
    given('I render my app', () => {
      render(<App />);
    });

    when(/^I click on button: "(.*)"$/, async labelBtn => {
      const button = await screen.findByRole('button', {
        name: RegExp(labelBtn),
      });
      userEvent.click(button);
    });

    then(/^I see : "(.*)"$/, async text => {
      await screen.findByText(text);
    });
  });
});
