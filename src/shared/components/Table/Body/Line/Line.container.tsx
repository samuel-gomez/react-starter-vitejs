import type { Tcol } from '../Body';
import Line from './Line';

export type TLineContainer = {
  className?: string;
  modifier?: string;
  LineCmpt?: typeof Line;
  cols: [string, Tcol][];
};

const LineContainer = ({ className, modifier = '', LineCmpt = Line, cols }: TLineContainer) => {
  const columns = cols.map(([keyCol, value]) => ({
    keyCol,
    ...value,
  }));
  return <LineCmpt className={className} modifier={modifier} columns={columns} />;
};

export default LineContainer;
