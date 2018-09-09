import MapPage from 'containers/MapPage/Loadable';
import PersonDetailsPage from 'containers/PersonDetailsPage/Loadable';
const base = process.env.PUBLIC_PATH || '';

const getPrivateRoutes = token => [
  {
    key: 'map-route',
    path: `${base}/people/map`,
    component: MapPage,
    token,
  },
  {
    key: 'personDetails',
    path: `${base}/people/list/:id`,
    component: PersonDetailsPage,
    token,
  },
];

export default getPrivateRoutes;
