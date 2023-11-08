import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import withClassNameModifier, { type TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
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
  A11yMenuCmpt?: typeof A11yMenu;
  HeaderCmpt?: typeof Header;
  MenuCmpt?: typeof Menu;
  TitleBarCmpt?: typeof TitleBar;
  FooterCmpt?: typeof Footer;
} & TwithClassNameModifier;

export type TLayoutPage = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};

const disabledDefault = {
  header: false,
  menu: false,
  title: false,
  footer: false,
  a11yMenu: false,
};

const Layout = withClassNameModifier(
  ({
    className,
    children,
    propsHeader,
    propsMenu,
    propsTitle,
    propsFooter,
    propsA11yMenu,
    fullScreen,
    disabled = disabledDefault,
    A11yMenuCmpt = A11yMenu,
    HeaderCmpt = Header,
    MenuCmpt = Menu,
    TitleBarCmpt = TitleBar,
    FooterCmpt = Footer,
  }: TLayout) => (
    <>
      {!disabled.a11yMenu && <A11yMenuCmpt {...propsA11yMenu} />}
      {!disabled.header && <HeaderCmpt {...propsHeader} fullScreen={fullScreen} />}
      {!disabled.menu && <MenuCmpt {...propsMenu} fullScreen={fullScreen} isVisible />}
      {!disabled.title && <TitleBarCmpt {...propsTitle} fullScreen={fullScreen} />}
      <main aria-label="Main Content" id="main-content" className={className}>
        {fullScreen ? children : <section className="container">{children}</section>}
      </main>
      {!disabled.footer && <FooterCmpt {...propsFooter} fullScreen={fullScreen} />}
    </>
  ),
  { defaultClassName: 'af-main' },
);

export default Layout;
