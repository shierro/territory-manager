import MapPage from 'containers/MapPage/Loadable';
import PeopleListPage from 'containers/PeopleListPage/Loadable';
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
    key: 'people-list-route',
    path: `${base}/people/list`,
    component: PeopleListPage,
    token,
  },
  {
    key: 'personDetails',
    path: `${base}/person/:id`,
    component: PersonDetailsPage,
    token,
  },
];

export default getPrivateRoutes;
