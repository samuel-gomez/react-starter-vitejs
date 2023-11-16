import { render, screen } from 'shared/testsUtils';
import { ButtonIconLoading } from '../MembersNew';

describe('<ButtonIconLoading/>', () => {
  it.each`
    isLoading | icon
    ${true}   | ${['refresh']}
    ${false}  | ${['plus']}
  `('Should render with icon $icon when isLoading: $isLoading', async ({ isLoading, icon }) => {
    render(<ButtonIconLoading isLoading={isLoading} />);

    expect(screen.getByRole('img', { name: RegExp(icon) })).toBeInTheDocument();
  });
});
