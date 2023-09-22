import { screen, render } from '@testing-library/react';
import { Col, Row, Container } from '../index';

describe('<Container/>', () => {
  it('Should render Container when image loaded', () => {
    render(
      <Container>
        <p>conteneur</p>
      </Container>,
    );
    const child = screen.getByText('conteneur');
    const container = child.parentElement;
    expect(container).toHaveClass('container');
  });
});

describe('<Row/>', () => {
  it('Should render Row', () => {
    render(
      <Row>
        <p>ligne</p>
      </Row>,
    );
    const child = screen.getByText('ligne');
    const line = child.parentElement;
    expect(line).toHaveClass('row');
    expect(line).toHaveClass('af-form__group');
  });
});

describe('<Col />', () => {
  it('Should render Col', () => {
    render(
      <Col md={6}>
        <p>colonne</p>
      </Col>,
    );
    const child = screen.getByText('colonne');
    const line = child.parentElement;
    expect(line).toHaveClass('col-md-6');
  });
});
