import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';
import Layout from 'components/layout/Layout';
import './App.scss';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Frontpage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
