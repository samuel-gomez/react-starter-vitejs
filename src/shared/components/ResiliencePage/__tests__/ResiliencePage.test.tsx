import { screen } from '@testing-library/react';
import { render } from 'shared/testsUtils';
import ResiliencePage from '../ResiliencePage';

describe('<ResiliencePage/>', () => {
  it('Render <ResiliencePage/> with default props', () => {
    render(<ResiliencePage title="title" />);

    expect(screen.getByRole('main', { name: 'page error 404' })).toHaveClass('container af-container');
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "Retour à l'accueil" })).toBeInTheDocument();
  });

  it('Render <ResiliencePage/> with other props', () => {
    render(<ResiliencePage title="mytitle" code="500" message="mymessage" backhome={false} />);

    expect(screen.getByRole('main', { name: 'page error 500' })).toHaveClass('container af-container');
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('mytitle')).toBeInTheDocument();
    expect(screen.getByText('mymessage')).toBeInTheDocument();
  });
});
