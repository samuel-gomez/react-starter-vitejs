import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader, { MODES } from 'shared/components/Loader';
import ROUTE_URLS from './constants';
import { RouteSecure } from './RouteSecure';

const Home = lazy(() => import('pages/Home'));
const PageUnauthorize = lazy(() => import('pages/Unauthorize'));
const PageNotFound = lazy(() => import('pages/NotFound'));

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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
