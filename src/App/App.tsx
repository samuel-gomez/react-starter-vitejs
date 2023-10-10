import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'App/Routes';
import Authentication from 'App/Authentication';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import QueryProvider from 'App/QueryProvider';
import NotificationProvider from 'App/NotificationProvider';

const App = () => (
  <Authentication>
    <UserProvider>
      <FetchProvider>
        <QueryProvider>
          <NotificationProvider>
            <Router>
              <Routes />
            </Router>
          </NotificationProvider>
        </QueryProvider>
      </FetchProvider>
    </UserProvider>
  </Authentication>
);

export default App;
