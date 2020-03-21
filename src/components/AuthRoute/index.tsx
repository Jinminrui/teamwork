import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path: string;
  component: React.FC;
}

const AuthRoute: React.FC<Props> = ({ path, component }) => {
  const isLogin = Cookies.get('user-token');
  return (<Route
    path={path}
    component={component}
    render={props => {
      if (isLogin) {
        return component;
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />);
};

export default AuthRoute;
