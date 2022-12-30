/* eslint-disable max-lines-per-function */
import { useContext, ComponentProps } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from 'pages/Home';
import PageNotFound from 'pages/NotFound';
import PageUnauthorize from 'pages/Unauthorize';
import Members from 'pages/Demos/Members';
import SearchMembers from 'pages/Demos/SearchMembers';
import ModalCustom from 'pages/Demos/ModalCustom';
import Notification from 'pages/Demos/Notification';

import ROUTE_URL from 'App/Routes/constants';
import { UserContext } from 'App/UserProvider';
import Loader, { MODES } from 'shared/components/Loader';
import { PROFILS } from 'shared/constants';

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  UserContextObj = UserContext,
  authorized = PROFILS,
  NavigateCmpt = Navigate,
  LoaderCmpt = Loader,
) => {
  const NewComp = (props: ComponentProps<typeof Component> | object) => {
    const userContext = useContext(UserContextObj);

    if (userContext.isEnabled && userContext.isLoading) {
      return <LoaderCmpt text="Chargement des données utilisateur..." mode={MODES.get} classModifier="fullscreen" />;
    }

    return authorized.includes(userContext?.authRole) || !userContext.isEnabled ? (
      <Component {...(props as T)} />
    ) : (
      <NavigateCmpt to={ROUTE_URL.UNAUTHORIZE} />
    );
  };

  return <NewComp />;
};

type TRoutesCmpt = {
  HomeCmpt?: typeof Home;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  MembersCmpt?: typeof Members;
  SearchMembersCmpt?: typeof SearchMembers;
  ModalCustomCmpt?: typeof ModalCustom;
  NotificationCmpt?: typeof Notification;
  withAuthFn?: typeof withAuth;
};

const RoutesCmpt = ({
  HomeCmpt = Home,
  PageUnauthorizeCmpt = PageUnauthorize,
  MembersCmpt = Members,
  SearchMembersCmpt = SearchMembers,
  ModalCustomCmpt = ModalCustom,
  NotificationCmpt = Notification,
  withAuthFn = withAuth,
}: TRoutesCmpt) => (
  <Routes>
    <Route path={ROUTE_URL.HOME} element={withAuthFn(HomeCmpt)} />
    <Route path="demos">
      <Route path={ROUTE_URL.MEMBERS} element={withAuthFn(MembersCmpt)} />
      <Route path={ROUTE_URL.SEARCHMEMBERS} element={withAuthFn(SearchMembersCmpt)} />
      <Route path={ROUTE_URL.MODAL_CUSTOM} element={withAuthFn(ModalCustomCmpt)} />
      <Route path={ROUTE_URL.NOTIFICATION} element={withAuthFn(NotificationCmpt)} />
    </Route>
    <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
