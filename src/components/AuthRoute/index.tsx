import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';
import { RouteItem } from './route.config';

const AuthRoute: React.FC<any> = props => {
  const { pathname } = props.location;
  const isLogin = Cookies.get('user-token');
  console.log(pathname);

  const targetRouterConfig: RouteItem = props.config.find(
    (v: RouteItem) => v.path === pathname
  );

  if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
    const { component } = targetRouterConfig;
    return <Route exact path={pathname} component={component} />;
  }

  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (pathname === '/login' || pathname === '/') {
      return <Redirect to="/home" />;
    }
    // 如果路由合法，就跳转到相应的路由
    if (targetRouterConfig) {
      return <Route path={pathname} component={targetRouterConfig.component} />;
    }
    // 如果路由不合法，重定向到 404 页面
    return <Redirect to="/404" />;
  }
  // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
  if ((targetRouterConfig && targetRouterConfig.auth) || pathname === '/') {
    return <Redirect to="/login" />;
  }
  // 非登陆状态下，路由不合法时，重定向至 404
  return <Redirect to="/404" />;
};

export default AuthRoute;
