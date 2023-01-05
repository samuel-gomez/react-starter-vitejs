import { describe, it, expect } from 'vitest';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Layout from '../Layout';

const defautlProps = {
  A11yMenuCmpt: () => <p>A11yMenuCmpt</p>,
  HeaderCmpt: () => <p>HeaderCmpt</p>,
  MenuCmpt: () => <p>MenuCmpt</p>,
  TitleBarCmpt: () => <p>TitleBarCmpt</p>,
  FooterCmpt: () => <p>FooterCmpt</p>,
};

describe('Layout', () => {
  it.each`
    fullScreen | disabled
    ${false}   | ${{ header: true }}
    ${false}   | ${{ title: true }}
    ${false}   | ${{ footer: true }}
    ${false}   | ${{ menu: true }}
    ${true}    | ${{ header: true, title: true, menu: true, footer: true }}
  `('Should render when disabled: $disabled', ({ disabled, fullScreen }) => {
    const { asFragment } = renderWithWrapperStaticRouter(<Layout disabled={disabled} fullScreen={fullScreen} {...defautlProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
