import { emptyFunction, render } from 'shared/testsUtils';
import TitleBarEnhanced from '..';

const defaultProps = { title: 'title', handleClick: emptyFunction };

describe('Component <TitleBarEnhanced />', () => {
  it.each`
    customProps                                                                                   | classNameExpected
    ${undefined}                                                                                  | ${'.af-title-bar'}
    ${{ className: 'otherclassname' }}                                                            | ${'.otherclassname'}
    ${{ classModifier: 'red' }}                                                                   | ${'.af-title-bar--red'}
    ${{ backHome: true }}                                                                         | ${'.af-title-bar--backhome'}
    ${{ backHome: true, classModifier: 'custom' }}                                                | ${'.af-title-bar--backhome.af-title-bar--custom'}
    ${{ className: 'otherclassname', backHome: true, classModifier: 'custom' }}                   | ${'.otherclassname--backhome.otherclassname--custom'}
    ${{ className: 'otherclassname', backHome: true, classModifier: 'custom', fullScreen: true }} | ${'.otherclassname--backhome.otherclassname--custom.otherclassname--fullscreen'}
  `('Should render TitleBarEnhanced with customProps: $customProps', ({ customProps, classNameExpected }) => {
    const actualProps = { ...defaultProps, ...customProps };
    const { container } = render(<TitleBarEnhanced {...actualProps} />);
    expect(container.querySelector(classNameExpected)).toBeDefined();
  });
});
