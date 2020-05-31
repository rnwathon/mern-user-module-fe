import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import User from './modules/User/User';
import AddUser from './modules/User/AddUser';
import Login from './modules/Login/Login';

import PrivateRoute from './routes/PrivateRoute'


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <PrivateRoute path="/" component={User} exact/>
          <PrivateRoute path="/addUser" component={AddUser} exact />
          <Route path="/login" component={Login} exact/>
          <Route component={() => "404 Not Found"} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
