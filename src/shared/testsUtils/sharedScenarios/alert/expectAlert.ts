import { getBase } from '../utils';

type TexpectAlert = {
  isQueryByRole?: boolean;
  beInDoc?: boolean;
  parentLabel?: string;
};

const expectAlert = ({ isQueryByRole = false, beInDoc = true, parentLabel = '' }: TexpectAlert) => {
  const base = getBase(parentLabel);
  const alert = isQueryByRole ? base.queryByRole('alert') : base.getByRole('alert');
  if (beInDoc) {
    expect(alert).toBeInTheDocument();
  } else {
    expect(alert).not.toBeInTheDocument();
  }
};

export default expectAlert;
