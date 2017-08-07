import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import conf from '../config';
import getPosition from '../position';

const section = $('#sec6');
let status = 0;

notice.listen('scroll', (scrollTop) => {
  if (getPosition(section) === 0 && status === 0) {
    status = 1;
  }
  if (getPosition(section) !== 0) {
    status = 0;
  }
});

const showMap = (id, address) => {
  let map;
  const geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById(id), {
    zoom: 15,
    styles: [
      {
        featureType: 'all',
        stylers: [
          { saturation: -80 },
        ],
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          { hue: '#00ffee' },
          { saturation: 50 },
        ],
      }, {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' },
        ],
      },
    ],
    options: {
      scrollwheel: false,
    },
  });
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    }
  });
};
window.initMap = () => {
  showMap('map1', conf.map1);
  showMap('map2', 'Ulaanbaatar Mongolia');
};
