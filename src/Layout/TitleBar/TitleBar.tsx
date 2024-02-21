import { HeaderTitle as Title } from '@axa-fr/react-toolkit-all';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import withClassNameModifier, { type TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import './TitleBar.scss';

type TTitleBar = {
  backHome?: boolean;
  children?: ReactNode;
  className?: string;
  title?: string;
  handleClick?: () => void;
} & TwithClassNameModifier;

export const DEFAULT_CLASSNAME = 'af-title-bar';

const TitleBar = withClassNameModifier(
  ({ title = 'title', handleClick, children, backHome = false, className }: TTitleBar) => (
    <Title className={className} toggleMenu={handleClick} title={title}>
      {backHome && (
        <Link aria-label="Retour à l'accueil" className="btn af-btn--circle" to="/">
          <i className="glyphicon glyphicon-home" />
        </Link>
      )}
      {children}
    </Title>
  ),
  { defaultClassName: DEFAULT_CLASSNAME },
);

export default TitleBar;
