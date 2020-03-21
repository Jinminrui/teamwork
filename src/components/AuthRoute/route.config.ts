import Loadable from 'react-loadable';
import ErrorPage from 'pages/404';
import Loading from 'components/Loading';

const LoginPage = Loadable({
  loader: () => import('pages/Login'),
  loading: Loading,
});

const HomePage = Loadable({
  loader: () => import('pages/Home'),
  loading: Loading,
});

export interface RouteItem {
  path: string;
  component?: any;
  auth?: boolean;
}

const RouteConfig: Array<RouteItem> = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/404',
    component: ErrorPage,
  },
  {
    path: '/home',
    component: HomePage,
    auth: true,
  },
  // {
  //   path: '/home/404',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/dashboard',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/personal-info',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/personal-settings',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/personal-settings/base',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/personal-settings/security',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/team-info',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/team-docs',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/doc-detail',
  //   component: HomePage,
  //   auth: true,
  // },
  // {
  //   path: '/home/project-center',
  //   component: HomePage,
  //   auth: true,
  // },
];

export default RouteConfig;
