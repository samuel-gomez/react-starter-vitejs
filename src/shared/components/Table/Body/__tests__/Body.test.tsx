import { renderWithContainer } from 'shared/testsUtils';
import { screen, within } from 'shared/testsUtils/customRender';
import Body from '../Body';

const container = document.createElement('table');

describe('Body', () => {
  it('Render <Body/> with empty items', () => {
    renderWithContainer(<Body />, container);
    expect(screen.queryAllByRole('row').length).toBe(0);
  });

  const items = [
    {
      key: '5f52a9d04ddf8b6c00052a0a',
      cols: {
        firstname: { label: 'Antonius' },
        lastname: { label: 'Panketh' },
        birthdate: { label: '20/12/1968' },
        sexe: { label: 'F' },
      },
    },
  ];

  it('Render <Body/> with 1 item', () => {
    const { baseElement } = renderWithContainer(<Body items={items} />, container);
    expect(within(baseElement).getAllByRole('row').length).toBe(1);
    within(baseElement).getByText(items[0].cols.firstname.label);
    within(baseElement).getByText(items[0].cols.lastname.label);
    within(baseElement).getByText(items[0].cols.birthdate.label);
    within(baseElement).getByText(items[0].cols.sexe.label);
  });
});
