import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'App/Routes';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import Authentication from './Authentication';
import UserProvider from './UserProvider';

const App = () => (
  <Authentication>
    <UserProvider>
      <FetchProvider>
        <NotificationProvider>
          <Router>
            <Routes />
          </Router>
        </NotificationProvider>
      </FetchProvider>
    </UserProvider>
  </Authentication>
);

export default App;
