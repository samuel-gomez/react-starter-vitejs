import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader, { MODES } from 'shared/components/Loader';
import ROUTE_URLS from './constants';
import { RouteSecure } from './RouteSecure';

const Home = lazy(() => import('pages/Home'));
const PageUnauthorize = lazy(() => import('pages/Unauthorize'));
const PageNotFound = lazy(() => import('pages/NotFound'));
const PagePeople = lazy(() => import('pages/People'));

type TRoutesCmpt = {
  RouteSecureCmpt?: typeof RouteSecure;
};

const RoutesCmpt = ({ RouteSecureCmpt = RouteSecure }: TRoutesCmpt) => (
  <Suspense fallback={<Loader message="Chargement de la page..." mode={MODES.get} classModifier="fullscreen" />}>
    <Routes>
      <Route element={<RouteSecureCmpt />}>
        <Route index path={ROUTE_URLS.HOME} element={<Home />} />
      </Route>
      <Route path={ROUTE_URLS.UNAUTHORIZE} element={<PageUnauthorize />} />
      <Route index path={ROUTE_URLS.PEOPLE} element={<PagePeople />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
