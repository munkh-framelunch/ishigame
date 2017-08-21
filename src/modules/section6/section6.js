import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import conf from '../config';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec6');
const title = $('.title-6');
const titleBg = $('.title_bg-6');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);
notice.listen('scroll', (scrollTop) => {
  const pos = getPosition(section);
  const currentPosition = section.offset().top;
  const wHeight = $(window).height();
  if (pos.pos === 0) {
    if (begin === 0) {
      moveTitle.move();
      moveTitle.start();
    }
    if (scrollTop > currentPosition - (wHeight * 0.5)) {
      title.removeClass('hide');
    }
    begin = 1;
  } else {
    moveTitle.stop();
    begin = 0;
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
