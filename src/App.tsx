import React from 'react';
import { Provider } from 'react-redux';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import RouteConfig from 'components/AuthRoute/route.config';
import AuthRoute from 'components/AuthRoute';
import 'static/styles/index.scss';
import ErrorPage from 'pages/404';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <Switch>
        {RouteConfig.map(item => {
          if (item.auth) {
            return <AuthRoute path={item.path} component={item.component} key={item.path} />;
          }
          return <Route path={item.path} component={item.component} key={item.path} />;
        })}
        <Route path="/" component={() => <Redirect to="/home" />} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Provider>
);

export default withRouter(App);
