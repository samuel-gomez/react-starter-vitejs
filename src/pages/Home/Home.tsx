import { ReactNode } from 'react';
import Layout, { TLayout } from 'Layout';
import Counter from 'shared/components/Counter';
import { TITLE_BAR, TITLE } from './constants';

export type THome = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};

const Home = ({ titleBar = TITLE_BAR, title = TITLE }: THome) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <div className="Home">
      <h1>Vite + React</h1>
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  </Layout>
);

export default Home;
