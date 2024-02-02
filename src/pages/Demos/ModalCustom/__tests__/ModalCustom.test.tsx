import { render, screen } from 'shared/testsUtils';
import { expectTitle } from 'shared/testsUtils/sharedScenarios';
import ModalPageContainer from '../ModalCustom.container';

const checkContent = () => {
  expectTitle({ name: 'Custom Modal', level: 2 });

  const button = screen.getByRole('button', { name: /Click me to launch modal/ });
  expect(button).toBeInTheDocument();

  return button;
};

describe('<ModalPageContainer/>', () => {
  it('Should render Modal page with title and button', async () => {
    render(<ModalPageContainer />);
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    checkContent();
  });
});
