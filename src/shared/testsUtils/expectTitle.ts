import { screen } from '@testing-library/dom';

type TexpectTitle = {
  name: string;
  isQueryByRole?: boolean;
  beInDoc?: boolean;
  level?: number;
};

const expectTitle = ({ isQueryByRole = false, name, level = 1, beInDoc = true }: TexpectTitle) => {
  const title = isQueryByRole ? screen.queryByRole('heading', { level, name }) : screen.getByRole('heading', { level, name });

  if (beInDoc) {
    expect(title).toBeInTheDocument();
    if (name) {
      expect(title).toHaveTextContent(RegExp(name));
    }
  } else {
    expect(title).not.toBeInTheDocument();
  }
};

export default expectTitle;
