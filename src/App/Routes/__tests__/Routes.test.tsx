import { type PropsWithChildren } from 'react';
import { act, render, screen, waitFor } from 'shared/testsUtils/customRender';

import { TITLE as TITLE_ACCORDION } from 'pages/Demos/Accordion';
import { TITLE as TITLE_ACTION } from 'pages/Demos/Action';
import { TITLE as TITLE_ALERT } from 'pages/Demos/Alert';
import { TITLE as TITLE_BADGE } from 'pages/Demos/Badge';
import { TITLE as TITLE_BUTTON } from 'pages/Demos/Button';
import { TITLE as TITLE_CARD } from 'pages/Demos/Card';
import { TITLE as TITLE_CHECKBOX_INPUT } from 'pages/Demos/CheckboxInput';
import { TITLE as TITLE_DATE_INPUT } from 'pages/Demos/DateInput';
import { TITLE as TITLE_EMPLOYEES } from 'pages/Demos/Employees';
import { TITLE as TITLE_FILE_INPUT } from 'pages/Demos/FileInput';
import { TITLE as TITLE_FOOTER } from 'pages/Demos/Footer';
import { TITLE as TITLE_FOOTER_CLIENT } from 'pages/Demos/FooterClient';
import { TITLE as TITLE_HEADER } from 'pages/Demos/Header';
import { TITLE as TITLE_HELP } from 'pages/Demos/Help';
import { TITLE as TITLE_INFOS } from 'pages/Demos/Infos';
import { TITLE as TITLE_LAYOUT } from 'pages/Demos/Layout';
import { TITLE as TITLE_LOADER } from 'pages/Demos/Loader';
import { TITLE as TITLE_MEMBERS } from 'pages/Demos/Members';
import { TITLE as TITLE_MEMBERSNEW } from 'pages/Demos/MembersNew';
import { TITLE as TITLE_MODAL } from 'pages/Demos/Modal';
import { TITLE as TITLE_MODAL_CUSTOM } from 'pages/Demos/ModalCustom';
import { TITLE as TITLE_NAVBAR } from 'pages/Demos/NavBar';
import { TITLE as TITLE_NOTIFICATION } from 'pages/Demos/Notification';
import { TITLE as TITLE_NUMBER_INPUT } from 'pages/Demos/NumberInput';
import { TITLE as TITLE_POPOVER } from 'pages/Demos/Popover';
import { TITLE as TITLE_P } from 'pages/Demos/ProtectedPage';
import { TITLE as TITLE_RADIO_INPUT } from 'pages/Demos/RadioInput';
import { TITLE as TITLE_RESTITUTION } from 'pages/Demos/Restitution';
import { TITLE as TITLE_SEARCHMEMBERS } from 'pages/Demos/SearchMembers';
import { TITLE as TITLE_SELECT_INPUT } from 'pages/Demos/SelectInput';
import { TITLE as TITLE_SELECT_MULTI } from 'pages/Demos/SelectMulti';
import { TITLE as TITLE_DEMOS } from 'pages/Demos/SlashDesignSystem';
import { TITLE as TITLE_SLIDER } from 'pages/Demos/Slider';
import { TITLE as TITLE_STEPPER } from 'pages/Demos/Stepper';
import { TITLE as TITLE_SWITCH } from 'pages/Demos/Switch';
import { TITLE as TITLE_TABLE } from 'pages/Demos/Table';
import { TITLE as TITLE_TABS } from 'pages/Demos/Tabs';
import { TITLE as TITLE_TEXT_INPUT } from 'pages/Demos/TextInput';
import { TITLE as TITLE_TEXTAREA_INPUT } from 'pages/Demos/TextareaInput';
import { TITLE as TITLE_TITLE } from 'pages/Demos/Title';
import { TITLE as TITLE_TITLE_BAR } from 'pages/Demos/TitleBar';
import { TITLE as TITLE_HOME } from 'pages/Home';
import { TITLE as TITLE_NOTFOUND } from 'pages/NotFound';
import { TITLE as TITLE_UNAUTHORIZE } from 'pages/Unauthorize';
import { PROFILS } from 'shared/constants';
import Routes, { ROUTE_URLS } from '..';
import { RouteSecure } from '../RouteSecure';

const OidcSecureCmpt = ({ children }: PropsWithChildren) => <>{children}</>;
const RouteSecureCmptMock = () => <RouteSecure OidcSecureCmpt={OidcSecureCmpt} />;

describe('<Routes />', () => {
  it.each`
    role          | title                   | route
    ${'unknown'}  | ${TITLE_HOME}           | ${ROUTE_URLS.HOME}
    ${'unknown'}  | ${TITLE_ACCORDION}      | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.ACCORDION}`}
    ${'unknown'}  | ${TITLE_ACTION}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.ACTION}`}
    ${'unknown'}  | ${TITLE_ALERT}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.ALERT}`}
    ${'unknown'}  | ${TITLE_BADGE}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.BADGE}`}
    ${'unknown'}  | ${TITLE_BUTTON}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.BUTTON}`}
    ${'unknown'}  | ${TITLE_CARD}           | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.CARD}`}
    ${'unknown'}  | ${TITLE_CHECKBOX_INPUT} | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.CHECKBOX_INPUT}`}
    ${'unknown'}  | ${TITLE_DATE_INPUT}     | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.DATE_INPUT}`}
    ${'unknown'}  | ${TITLE_EMPLOYEES}      | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.EMPLOYEES}`}
    ${'unknown'}  | ${TITLE_FILE_INPUT}     | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.FILE_INPUT}`}
    ${'unknown'}  | ${TITLE_FOOTER}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.FOOTER}`}
    ${'unknown'}  | ${TITLE_FOOTER_CLIENT}  | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.FOOTER_CLIENT}`}
    ${'unknown'}  | ${TITLE_HEADER}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.HEADER}`}
    ${'unknown'}  | ${TITLE_HELP}           | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.HELP}`}
    ${'unknown'}  | ${TITLE_INFOS}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.INFOS}`}
    ${'unknown'}  | ${TITLE_LOADER}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.LOADER}`}
    ${'unknown'}  | ${TITLE_MEMBERS}        | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.MEMBERS}`}
    ${'unknown'}  | ${TITLE_MEMBERSNEW}     | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.MEMBERSNEW}`}
    ${'unknown'}  | ${TITLE_MODAL}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.MODAL}`}
    ${'unknown'}  | ${TITLE_MODAL_CUSTOM}   | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.MODAL_CUSTOM}`}
    ${'unknown'}  | ${TITLE_NAVBAR}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.NAVBAR}`}
    ${'unknown'}  | ${TITLE_NOTIFICATION}   | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.NOTIFICATION}`}
    ${'unknown'}  | ${TITLE_NUMBER_INPUT}   | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.NUMBER_INPUT}`}
    ${'unknown'}  | ${TITLE_POPOVER}        | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.POPOVER}`}
    ${'unknown'}  | ${TITLE_RADIO_INPUT}    | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.RADIO_INPUT}`}
    ${'unknown'}  | ${TITLE_RESTITUTION}    | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.RESTITUTION}`}
    ${'unknown'}  | ${TITLE_SEARCHMEMBERS}  | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.SEARCHMEMBERS}`}
    ${'unknown'}  | ${TITLE_SELECT_INPUT}   | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.SELECT_INPUT}`}
    ${'unknown'}  | ${TITLE_SELECT_MULTI}   | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.SELECT_MULTI}`}
    ${'unknown'}  | ${TITLE_SLIDER}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.SLIDER}`}
    ${'unknown'}  | ${TITLE_STEPPER}        | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.STEPPER}`}
    ${'unknown'}  | ${TITLE_SWITCH}         | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.SWITCH}`}
    ${'unknown'}  | ${TITLE_TABLE}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TABLE}`}
    ${'unknown'}  | ${TITLE_TABS}           | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TABS}`}
    ${'unknown'}  | ${TITLE_TEXTAREA_INPUT} | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TEXTAREA_INPUT}`}
    ${'unknown'}  | ${TITLE_TEXT_INPUT}     | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TEXT_INPUT}`}
    ${'unknown'}  | ${TITLE_TITLE}          | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TITLE}`}
    ${'unknown'}  | ${TITLE_TITLE_BAR}      | ${`${ROUTE_URLS.DEMOS}/${ROUTE_URLS.TITLE_BAR}`}
    ${'unknown'}  | ${TITLE_LAYOUT}         | ${`/${ROUTE_URLS.LAYOUT}`}
    ${'unknown'}  | ${TITLE_UNAUTHORIZE}    | ${ROUTE_URLS.UNAUTHORIZE}
    ${'unknown'}  | ${TITLE_NOTFOUND}       | ${ROUTE_URLS.NOTFOUND}
    ${PROFILS[0]} | ${TITLE_DEMOS}          | ${ROUTE_URLS.DEMOS}
  `('Should render page for unprotected routes, role: $role, title: $title, route: $route', async ({ role, title, route }) => {
    render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
    act(() => {
      screen.getByText('Chargement de la page...');
    });
    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it.each`
    role          | title      | route
    ${PROFILS[0]} | ${TITLE_P} | ${ROUTE_URLS.PROTECTEDPAGE}
  `(
    'Should render page for protected routes when user profil is authorize, role: $role, title: $title, route: $route',
    async ({ role, title, route }) => {
      render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
      act(() => {
        screen.getByText('Chargement de la page...');
      });
      await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
    },
  );

  it.each`
    role         | title              | route
    ${'unknown'} | ${'403 Forbidden'} | ${ROUTE_URLS.PROTECTEDPAGE}
  `(
    'Should redirect to unauthorized page when user profil is not authorize, role: $role, title: $title, route: $route',
    async ({ role, title, route }) => {
      render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });

      await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
    },
  );
});
