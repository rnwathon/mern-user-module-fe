import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route component={() => "404 Not Found"} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
