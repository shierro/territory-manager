/**
 *
 * Asynchronously loads the component for PersonDetailsPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
