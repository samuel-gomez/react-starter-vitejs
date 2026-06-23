import { Tabs } from '@axa-fr/react-toolkit-all';
import type { ReactElement } from 'react';
import TitleTabsLiveCode from './TitleTabsLiveCode';
import './TabsLiveCode.scss';

type TTabComponentProps = {
  hideComponent?: boolean;
  title: string;
  icon: string;
};

type TTabsLiveCode = {
  children: ReactElement<TTabComponentProps>[];
};

const TabsLiveCode = ({ children }: TTabsLiveCode) => (
  <Tabs classModifier="tabs-live-code" activeIndex="0">
    {children
      .filter(({ props: { hideComponent } }) => !hideComponent)
      .map((component: ReactElement<TTabComponentProps>) => (
        <Tabs.Tab
          key={component.key}
          title={<TitleTabsLiveCode title={component.props.title} icon={component.props.icon} />}
          classModifier="has-icon-left"
        >
          {component}
        </Tabs.Tab>
      ))}
  </Tabs>
);

export default TabsLiveCode;
