import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';
import Layout from 'components/layout/Layout';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import './App.scss';
import User from 'classes/User';

export interface AppProps {}

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function() {
  return this[0].toUpperCase() + this.substr(1);
};

const App: React.FC<AppProps> = () => {
  useEffect(() => {
    User.fetch();
  });

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
