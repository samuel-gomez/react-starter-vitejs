import { type Tcol } from '../types.d';
import Line, { type TLine } from './Line';

export type TLineContainer = Omit<TLine, 'columns'> & {
  LineCmpt?: typeof Line;
  cols: [string, Tcol][];
};

const LineContainer = ({ LineCmpt = Line, cols, ...restLineProps }: TLineContainer) => {
  const columns = cols.map(([keyCol, value]) => ({
    keyCol,
    ...value,
  }));
  return <LineCmpt {...restLineProps} columns={columns} />;
};

export default LineContainer;
