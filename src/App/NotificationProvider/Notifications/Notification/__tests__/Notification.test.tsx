import { render, screen, within } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import Notification from '../Notification';
import { ALERT_TYPE } from '../../constants';

describe('Notifications', () => {
  const defaultProps = {
    id: 'id',
    label: 'title',
    onClose: emptyFunction,
  };

  it('Render <Notification/> with required props', () => {
    render(<Notification {...defaultProps} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('af-alert--notification');

    expect(within(alert).getByText('title')).toBeDefined();
  });

  it('Render <Notification/> with all props', () => {
    const allProps = {
      ...defaultProps,
      detail: 'detail custom',
      classModifier: 'myclass',
      type: ALERT_TYPE.success,
    };
    render(<Notification {...allProps} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('af-alert--notification');
    expect(alert).toHaveClass('af-alert--myclass');

    expect(within(alert).getByText('title')).toBeDefined();
  });
});
