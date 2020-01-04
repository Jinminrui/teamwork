import { RouteComponentProps } from 'react-router-dom';
import LoginPage from 'pages/Login';
import HomePage from 'pages/Home';
import ErrorPage from 'pages/404';
import EditorPage from 'pages/Editor';
import { FC } from 'react';

export interface RouteItem {
  path: string;
  component?: FC<RouteComponentProps>;
  auth?: boolean;
}

const RouteConfig: Array<RouteItem> = [
  {
    path: '/home',
    component: HomePage,
    auth: true,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/login/account',
    component: LoginPage,
  },
  {
    path: '/login/phone',
    component: LoginPage,
  },
  {
    path: '/404',
    component: ErrorPage,
  },
  {
    path: '/editor',
    component: EditorPage,
  },
  {
    path: '/home/404',
    component: HomePage,
    auth: true,
  },
  {
    path: '/home/dashboard',
    component: HomePage,
    auth: true,
  },
  {
    path: '/home/personal-info',
    component: HomePage,
    auth: true,
  },
  {
    path: '/home/personal-settings',
    component: HomePage,
    auth: true,
  },
  {
    path: '/home/personal-settings/base',
    component: HomePage,
    auth: true,
  },
  {
    path: '/home/personal-settings/security',
    component: HomePage,
    auth: true,
  },
];

export default RouteConfig;
