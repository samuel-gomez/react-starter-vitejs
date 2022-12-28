import { screen } from '@testing-library/dom';

type TexpectButton = {
  name: string;
  isQueryByRole?: boolean;
  beDisabled?: boolean;
  beInDoc?: boolean;
};

const expectButton = ({ isQueryByRole = false, name, beDisabled = true, beInDoc = true }: TexpectButton) => {
  const button = isQueryByRole ? screen.queryByRole('button', { name: RegExp(name) }) : screen.getByRole('button', { name: RegExp(name) });
  if (beInDoc) {
    expect(button).toBeInTheDocument();
    if (beDisabled) {
      expect(button).toBeDisabled();
    } else {
      expect(button).not.toBeDisabled();
    }
  } else {
    expect(button).not.toBeInTheDocument();
  }
};

export default expectButton;
