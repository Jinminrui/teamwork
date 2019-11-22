import LoginPage from 'pages/Login';
import HomePage from 'pages/Home';
import ErrorPage from 'pages/404';
import EditorPage from 'pages/Editor';

export interface RouteItem {
  path: string;
  component?: any;
  auth?: boolean;
}

const RouteConfig: Array<RouteItem> = [
  {
    path: '/',
    component: HomePage,
    auth: true,
  },
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
    path: '/404',
    component: ErrorPage,
  },
  {
    path: '/editor',
    component: EditorPage,
  },
];

export default RouteConfig;
