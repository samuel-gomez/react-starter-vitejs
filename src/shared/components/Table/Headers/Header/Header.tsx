import { HelpInfo } from '@axa-fr/react-toolkit-all';
import Th, { type TTh } from './Th';
import { type THeader } from './types.d';

export type THeaderProps = TTh &
  Omit<THeader, 'key'> & {
    scope?: 'col' | 'row';
    isBlank?: boolean;
  };

const Header = ({ field, infobulle, label, scope = 'col', onSort, sorting, isBlank = false, ...rest }: THeaderProps) => (
  <Th {...(isBlank ? { classModifier: 'blank' } : { scope, sorting, field, onSort, ...rest })}>
    {!isBlank && (
      <HelpInfo content={infobulle}>
        <span className="af-table__th-label">{label}</span>
      </HelpInfo>
    )}
  </Th>
);

export default Header;
