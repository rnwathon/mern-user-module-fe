import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import verifyToken from '../helpers/verifyToken'

function PrivateRoute(props) {
  let { component: Component, ...rest } = props;
  // Verifikasi token
  let token = verifyToken();
  return(
    <Route 
      {...rest}
      render={(props) => {
        // Jika token valid, balikin dong komponennya
        // Kalau tidak, ke login page aja
        return token ?
         <Component {...props}/> : 
         <Redirect to="/login" />
      }}
    />
  )
}

export default PrivateRoute;