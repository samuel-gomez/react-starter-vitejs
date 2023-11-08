import { useContext } from 'react';
import Loader, { MODES } from 'shared/components/Loader';
import EnvironmentProvider, { EnvironmentContext } from 'App/EnvironmentProvider';
import App from './App';

type TAppContainer = { EnvironmentContextObj?: typeof EnvironmentContext; AppCmpt?: typeof App };

export const AppContainer = ({ EnvironmentContextObj = EnvironmentContext, AppCmpt = App }: TAppContainer) => {
  const { environment } = useContext(EnvironmentContextObj);
  return !environment ? <Loader message="Chargement de l'environnement..." mode={MODES.get} classModifier="fullscreen" /> : <AppCmpt />;
};

const AppWithEnvironment = () => (
  <EnvironmentProvider>
    <AppContainer />
  </EnvironmentProvider>
);

export default AppWithEnvironment;
