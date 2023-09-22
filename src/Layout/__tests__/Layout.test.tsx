import { render, screen } from 'shared/testsUtils';
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
    fullScreen | disabled                                                                   | expectedContent
    ${false}   | ${{ header: true }}                                                        | ${['TitleBarCmpt', 'MenuCmpt', 'FooterCmpt', 'A11yMenuCmpt']}
    ${false}   | ${{ title: true }}                                                         | ${['HeaderCmpt', 'MenuCmpt', 'FooterCmpt', 'A11yMenuCmpt']}
    ${false}   | ${{ footer: true }}                                                        | ${['HeaderCmpt', 'TitleBarCmpt', 'MenuCmpt', 'A11yMenuCmpt']}
    ${false}   | ${{ menu: true }}                                                          | ${['HeaderCmpt', 'TitleBarCmpt', 'FooterCmpt', 'A11yMenuCmpt']}
    ${false}   | ${{ a11yMenu: true }}                                                      | ${['HeaderCmpt', 'TitleBarCmpt', 'MenuCmpt', 'FooterCmpt']}
    ${true}    | ${{ header: true, title: true, menu: true, footer: true, a11yMenu: true }} | ${[]}
  `('Should render when disabled: $disabled', ({ disabled, fullScreen, expectedContent }) => {
    render(<Layout disabled={disabled} fullScreen={fullScreen} {...defautlProps} />);
    expectedContent.forEach((content: string) => expect(screen.getByText(content)).toBeInTheDocument());
  });
});
