import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import withClassNameModifier, { TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import { Table as TableTk, HelpInfo } from '@axa-fr/react-toolkit-all';

export type TTdContainer = Omit<ComponentPropsWithoutRef<typeof HelpInfo>, 'children' | 'content'> & {
  children?: ReactNode;
  label?: ReactNode;
  hover?: ReactNode;
  TdCmpt?: typeof TableTk.Td;
  HelpHoverCmpt?: typeof HelpInfo;
} & TwithClassNameModifier;

const TdContainer = withClassNameModifier(
  ({ children, label, hover, className, HelpHoverCmpt = HelpInfo, ...rest }: TTdContainer) => (
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
