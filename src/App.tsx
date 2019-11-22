import React from 'react';
import { Provider } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import RouteConfig from 'components/AuthRoute/route.config';
import AuthRoute from 'components/AuthRoute';
import 'static/styles/index.scss';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <Switch>
        <AuthRoute config={RouteConfig} />
      </Switch>
    </div>
  </Provider>
);

export default withRouter(App);
