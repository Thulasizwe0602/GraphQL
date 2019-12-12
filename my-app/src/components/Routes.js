import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import MapsPage from './pages/MapsPage';
import Accounts from './pages/Accounts';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import AuthContext from '../context/context';

class Routes extends React.Component {

  state = {
    token: null,
    user: null
  };

  login = (token, userId, expiration) => {
    this.setState({ token: token, userId: userId, expiration: expiration })
  };
  logout = () => {
    this.setState({ token: null, userId: null, expiration: null })
  };

  render() {
    return (
      <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, expiration: this.state.expiration, login: this.login, logout: this.logout }}>
        <Switch>
          {this.state.token && <Redirect from='/signin' to="dashboard" />}
          <Route path='/' exact component={DashboardPage} />
          <Route path='/dashboard' component={DashboardPage} />
          {!this.state.token && <Route path='/profile' component={ProfilePage} />}
          {!this.state.token && <Route path='/tables' component={TablesPage} />}
          {!this.state.token && <Route path='/maps' component={MapsPage} />}
          {!this.state.token && <Route path='/signin' component={SignIn} />}
          {!this.state.token && <Route path='/signup' component={SignUp} />}
          {this.state.token && <Route path='/accounts' component={Accounts} />}
        </Switch>
      </AuthContext.Provider>
    );
  }
}

export default Routes;
