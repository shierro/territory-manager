import { icon } from 'leaflet';

export default icon({
  iconUrl: require('../../images/marker-icon-red.png'), // eslint-disable-line
  iconSize: [25, 41], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
});
