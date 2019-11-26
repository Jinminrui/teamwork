import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { Store } from 'types';
import { setLoading } from 'store/app/app.action';
import { RouteItem } from './route.config';

const AuthRoute: React.FC<any> = props => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector((state: Store) => state.app.loading);

  const { pathname } = props.location;
  const isLogin = localStorage.getItem('user_token');
  let timer = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setLoading(true));
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [pathname]);

  const targetRouterConfig: RouteItem = props.config.find(
    (v: RouteItem) => v.path === pathname
  );

  if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
    const { component } = targetRouterConfig;
    return <Route exact path={pathname} component={component} />;
  }
  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (pathname === '/login') {
      return <Redirect to="/" />;
    }
    // 如果路由合法，就跳转到相应的路由
    if (targetRouterConfig) {
      return (
        <Spin
          tip="Loading"
          size="large"
          spinning={loading}
          // indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
          style={{ maxHeight: 'none' }}
        >
          <Route path={pathname} component={targetRouterConfig.component} />
        </Spin>
      );
    }
    // 如果路由不合法，重定向到 404 页面
    return <Redirect to="/404" />;
  }
  // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
  if (targetRouterConfig && targetRouterConfig.auth) {
    return <Redirect to="/login" />;
  }
  // 非登陆状态下，路由不合法时，重定向至 404
  return <Redirect to="/404" />;
};

export default AuthRoute;
