import { ReactNode } from 'react';
import HelpHover, { THelpInfo } from 'shared/components/HelpInfo';
import withClassNameModifier, { TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import TableTk from '@axa-fr/react-toolkit-table';

export type TTdContainer = Omit<THelpInfo, 'children' | 'content'> & {
  children?: ReactNode;
  label?: ReactNode;
  hover?: ReactNode;
  TdCmpt?: typeof TableTk.Td;
  HelpHoverCmpt?: typeof HelpHover;
} & TwithClassNameModifier;

const TdContainer = withClassNameModifier(
  ({ children, label, hover, className, HelpHoverCmpt = HelpHover, ...rest }: TTdContainer) => (
    <td {...rest} className={className}>
      <HelpHoverCmpt content={hover} classModifier="content">
        {label}
        {children}
      </HelpHoverCmpt>
    </td>
  ),
  { defaultClassName: 'af-table__cell' },
);

export default TdContainer;
