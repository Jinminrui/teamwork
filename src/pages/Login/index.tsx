import React from 'react';
import './index.scss';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import logo from './co-work.svg';
import AccountLogin from './components/AccountLogin';
import PhoneLogin from './components/PhoneLogin';

interface Props extends RouteComponentProps {
  children?: React.ReactNode;
}

const Login: React.FC<Props> = (props: Props) => (
  <div className="container">
    <div className="left-wrapper">
      <img src={logo} alt="logo" className="logo" />
    </div>
    <div className="right-wrapper">
      <Switch>
        <Route path="/login/account" exact component={AccountLogin} />
        <Route to="/login/phone" exact component={PhoneLogin} />
        <Redirect to="/login/phone" />
      </Switch>
    </div>
  </div>
);

export default Login;
