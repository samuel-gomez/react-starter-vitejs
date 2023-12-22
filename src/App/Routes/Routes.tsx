import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader, { MODES } from 'shared/components/Loader';
import ROUTE_URLS from './constants';
import { RouteSecure } from './RouteSecure';

const Home = lazy(() => import('pages/Home'));
const Members = lazy(() => import('pages/Demos/Members'));
const Employees = lazy(() => import('pages/Demos/Employees'));
const MembersNew = lazy(() => import('pages/Demos/MembersNew'));
const ProtectedPage = lazy(() => import('pages/Demos/ProtectedPage'));
const SearchMembers = lazy(() => import('pages/Demos/SearchMembers'));
const ModalCustom = lazy(() => import('pages/Demos/ModalCustom'));
const Notification = lazy(() => import('pages/Demos/Notification'));
const Accordion = lazy(() => import('pages/Demos/Accordion'));
const Action = lazy(() => import('pages/Demos/Action'));
const Alert = lazy(() => import('pages/Demos/Alert'));
const Badge = lazy(() => import('pages/Demos/Badge'));
const Button = lazy(() => import('pages/Demos/Button'));
const Card = lazy(() => import('pages/Demos/Card'));
const CheckboxInput = lazy(() => import('pages/Demos/CheckboxInput'));
const DateInput = lazy(() => import('pages/Demos/DateInput'));
const FileInput = lazy(() => import('pages/Demos/FileInput'));
const Footer = lazy(() => import('pages/Demos/Footer'));
const FooterClient = lazy(() => import('pages/Demos/FooterClient'));
const Header = lazy(() => import('pages/Demos/Header'));
const Help = lazy(() => import('pages/Demos/Help'));
const Infos = lazy(() => import('pages/Demos/Infos'));
const Layout = lazy(() => import('pages/Demos/Layout'));
const LoaderPage = lazy(() => import('pages/Demos/Loader'));
const Modal = lazy(() => import('pages/Demos/Modal'));
const NavBar = lazy(() => import('pages/Demos/NavBar'));
const NumberInput = lazy(() => import('pages/Demos/NumberInput'));
const Popover = lazy(() => import('pages/Demos/Popover'));
const RadioInput = lazy(() => import('pages/Demos/RadioInput'));
const Restitution = lazy(() => import('pages/Demos/Restitution'));
const SelectInput = lazy(() => import('pages/Demos/SelectInput'));
const SelectMulti = lazy(() => import('pages/Demos/SelectMulti'));
const SlashDesignSystem = lazy(() => import('pages/Demos/SlashDesignSystem'));
const Slider = lazy(() => import('pages/Demos/Slider'));
const Stepper = lazy(() => import('pages/Demos/Stepper'));
const Switch = lazy(() => import('pages/Demos/Switch'));
const Table = lazy(() => import('pages/Demos/Table'));
const Tabs = lazy(() => import('pages/Demos/Tabs'));
const TextareaInput = lazy(() => import('pages/Demos/TextareaInput'));
const TextInput = lazy(() => import('pages/Demos/TextInput'));
const Title = lazy(() => import('pages/Demos/Title'));
const TitleBar = lazy(() => import('pages/Demos/TitleBar'));
const PageUnauthorize = lazy(() => import('pages/Unauthorize'));
const PageNotFound = lazy(() => import('pages/NotFound'));

type TRoutesCmpt = {
  RouteSecureCmpt?: typeof RouteSecure;
};

const RoutesCmpt = ({ RouteSecureCmpt = RouteSecure }: TRoutesCmpt) => (
  <Suspense fallback={<Loader mode={MODES.get} classModifier="fullscreen" message="Chargement de la page..." />}>
    <Routes>
      <Route index path={ROUTE_URLS.HOME} element={<Home />} />
      <Route path={ROUTE_URLS.DEMOS}>
        <Route index element={<SlashDesignSystem />} />
        <Route path={ROUTE_URLS.MEMBERS} element={<Members />} />
        <Route path={ROUTE_URLS.MEMBERSNEW} element={<MembersNew />} />
        <Route path={ROUTE_URLS.SEARCHMEMBERS} element={<SearchMembers />} />
        <Route path={ROUTE_URLS.EMPLOYEES} element={<Employees />} />
        <Route path={ROUTE_URLS.MODAL_CUSTOM} element={<ModalCustom />} />
        <Route path={ROUTE_URLS.NOTIFICATION} element={<Notification />} />
        <Route path={ROUTE_URLS.ACCORDION} element={<Accordion />} />
        <Route path={ROUTE_URLS.ACTION} element={<Action />} />
        <Route path={ROUTE_URLS.ALERT} element={<Alert />} />
        <Route path={ROUTE_URLS.BADGE} element={<Badge />} />
        <Route path={ROUTE_URLS.BUTTON} element={<Button />} />
        <Route path={ROUTE_URLS.CARD} element={<Card />} />
        <Route path={ROUTE_URLS.CHECKBOX_INPUT} element={<CheckboxInput />} />
        <Route path={ROUTE_URLS.DATE_INPUT} element={<DateInput />} />
        <Route path={ROUTE_URLS.FILE_INPUT} element={<FileInput />} />
        <Route path={ROUTE_URLS.FOOTER} element={<Footer />} />
        <Route path={ROUTE_URLS.FOOTER_CLIENT} element={<FooterClient />} />
        <Route path={ROUTE_URLS.HEADER} element={<Header />} />
        <Route path={ROUTE_URLS.HELP} element={<Help />} />
        <Route path={ROUTE_URLS.INFOS} element={<Infos />} />
        <Route path={ROUTE_URLS.LOADER} element={<LoaderPage />} />
        <Route path={ROUTE_URLS.MODAL} element={<Modal />} />
        <Route path={ROUTE_URLS.NAVBAR} element={<NavBar />} />
        <Route path={ROUTE_URLS.NUMBER_INPUT} element={<NumberInput />} />
        <Route path={ROUTE_URLS.POPOVER} element={<Popover />} />
        <Route path={ROUTE_URLS.RADIO_INPUT} element={<RadioInput />} />
        <Route path={ROUTE_URLS.RESTITUTION} element={<Restitution />} />
        <Route path={ROUTE_URLS.SELECT_INPUT} element={<SelectInput />} />
        <Route path={ROUTE_URLS.SELECT_MULTI} element={<SelectMulti />} />
        <Route path={ROUTE_URLS.SLIDER} element={<Slider />} />
        <Route path={ROUTE_URLS.STEPPER} element={<Stepper />} />
        <Route path={ROUTE_URLS.SWITCH} element={<Switch />} />
        <Route path={ROUTE_URLS.TABLE} element={<Table />} />
        <Route path={ROUTE_URLS.TABS} element={<Tabs />} />
        <Route path={ROUTE_URLS.TEXTAREA_INPUT} element={<TextareaInput />} />
        <Route path={ROUTE_URLS.TEXT_INPUT} element={<TextInput />} />
        <Route path={ROUTE_URLS.TITLE} element={<Title />} />
        <Route path={ROUTE_URLS.TITLE_BAR} element={<TitleBar />} />
      </Route>
      <Route path={ROUTE_URLS.LAYOUT} element={<Layout />} />
      <Route element={<RouteSecureCmpt />}>
        <Route path={ROUTE_URLS.PROTECTEDPAGE} element={<ProtectedPage />} />
      </Route>
      <Route path={ROUTE_URLS.UNAUTHORIZE} element={<PageUnauthorize />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
