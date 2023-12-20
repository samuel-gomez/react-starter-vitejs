import { HelpInfo } from '@axa-fr/react-toolkit-all';
import Th, { TTh } from './Th';
import { THeader as Theaders } from './type';

export type THeaderProps = TTh &
  Omit<Theaders, 'key'> & {
    scope: 'col' | 'row';
  };

const Header = ({ field, infobulle, label, scope, onSort, sorting }: THeaderProps) => (
  <Th classModifier={label ? '' : 'inactive'} scope={scope} sorting={sorting} field={field} onSort={onSort}>
    <HelpInfo content={infobulle}>
      <span className="af-table__th-label">{label}</span>
    </HelpInfo>
  </Th>
);

export default Header;
