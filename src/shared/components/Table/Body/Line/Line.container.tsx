import { DEFAULT_TABLE_ITEMS_TYPE } from '../../constants';
import type { Tcol } from '../Body';
import Line, { TLine } from './Line';

export type TLineContainer = Omit<TLine, 'columns'> & {
  LineCmpt?: typeof Line;
  cols: [string, Tcol][];
  lineNumber: number;
  itemsType?: string;
};

const LineContainer = ({ LineCmpt = Line, cols, itemsType = DEFAULT_TABLE_ITEMS_TYPE, ...restLineProps }: TLineContainer) => {
  const columns = cols.map(([keyCol, value]) => ({
    keyCol,
    ...value,
  }));
  return <LineCmpt {...restLineProps} itemsType={itemsType} columns={columns} />;
};

export default LineContainer;
