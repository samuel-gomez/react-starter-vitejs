import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render, userEvent } from 'shared/testsUtils/customRender';
import Home from '../Home';

configure({ defaultHidden: true });

const feature = loadFeature('features/Home/Home.feature');

defineFeature(feature, test => {
  test('Render Home', ({ given, then }) => {
    given('I render my home', () => {
      render(<Home />);
    });

    then(/^I see : "(.*)"$/, async text => {
      await screen.findByText(text);
    });
  });

  test('Render Home and click counter', ({ given, when, then }) => {
    given('I render my home', () => {
      render(<Home />);
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
