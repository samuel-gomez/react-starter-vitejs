import { ComponentPropsWithoutRef, ReactNode } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Header from 'Layout/Header';
import Footer from 'Layout/Footer';
import TitleBar from 'Layout/TitleBar';
import Menu from 'Layout/Menu';
import A11yMenu from 'Layout/A11yMenu';

export type TLayout = {
  children?: ReactNode;
  className?: string;
  fullScreen?: boolean;
  disabled?: {
    header?: boolean;
    menu?: boolean;
    title?: boolean;
    footer?: boolean;
    a11yMenu?: boolean;
  };
  propsHeader?: ComponentPropsWithoutRef<typeof Header>;
  propsMenu?: ComponentPropsWithoutRef<typeof Menu>;
  propsTitle?: ComponentPropsWithoutRef<typeof TitleBar>;
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
  propsA11yMenu?: ComponentPropsWithoutRef<typeof A11yMenu>;
};

const disabledDefault = {
  header: false,
  menu: false,
  title: false,
  footer: false,
  a11yMenu: false,
};

const DEFAULT_CLASSNAME = 'af-main';

const Layout = withClassNameModifier(
  ({ className, children, propsHeader, propsMenu, propsTitle, propsFooter, propsA11yMenu, fullScreen, disabled = disabledDefault }: TLayout) => (
    <>
      {!disabled.a11yMenu && <A11yMenu {...propsA11yMenu} />}
      {!disabled.header && <Header {...propsHeader} fullScreen={fullScreen} />}
      {!disabled.menu && <Menu {...propsMenu} fullScreen={fullScreen} isVisible />}
      {!disabled.title && <TitleBar {...propsTitle} fullScreen={fullScreen} />}
      <main id="main-content" className={className}>
        {fullScreen ? children : <section className="container">{children}</section>}
      </main>
      {!disabled.footer && <Footer {...propsFooter} fullScreen={fullScreen} />}
    </>
  ),
  DEFAULT_CLASSNAME,
);

export default Layout;
