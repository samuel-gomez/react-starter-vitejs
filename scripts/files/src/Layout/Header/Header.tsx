import { ReactNode } from 'react';
import type { Tanomaly } from 'shared/types';
import { Header, Name, User, Infos } from '@axa-fr/react-toolkit-layout-header/dist/esm/index';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import Skeleton from 'shared/components/Skeleton';
import Resilience from 'shared/components/Resilience';
import './Header.scss';

type THeaderInfo = {
  isLoaded?: boolean;
  children: ReactNode;
};

export const HeaderInfo = ({ isLoaded, children }: THeaderInfo) => (isLoaded ? <>{children}</> : <Skeleton classModifier="info" />);

type THeaderApp = {
  title: string;
  subtitle: string;
  infos?: {
    word: string;
    definition: string;
  }[];
  authName?: string;
  authRole?: string;
  link?: string;
  anomaly?: Tanomaly | null;
  fullScreen?: boolean;
};

export const HeaderApp = ({
  fullScreen,
  infos,
  title,
  subtitle,
  link = '#',
  authName = 'Non Connecté',
  authRole = 'Profil',
  anomaly,
}: THeaderApp) => (
  <Header classModifier={fullScreen ? 'fullscreen' : ''}>
    <Name title={title} img={logo} alt={title} subtitle={subtitle} />
    {infos && (
      <Resilience anomaly={anomaly} resilienceModifier="simple infos">
        <HeaderInfo isLoaded={infos.length > 0}>
          <Infos infos={infos} />
        </HeaderInfo>
      </Resilience>
    )}
    <User name={authName} href={link} profile={!authRole ? 'inconnu' : authRole} />
  </Header>
);

export default HeaderApp;
