function init() {
    var geoloc = ymaps.geolocation,
        map = new ymaps.Map('map', {
            center: [43.11555532788208,131.88549979477216],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });

    geoloc.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        map.geoObjects.add(result.geoObjects);
        //console.log(result.geoObjects.get(0).properties.get('metaDataProperty'));
    });

    //map.controls.remove('geolocationControl'); // удаляем геолокацию
    //map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    //map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    //map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    //map.controls.remove('rulerControl'); // удаляем контрол правил
    //map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}

ymaps.ready(init);

/*
// создаем локальные переменные для карты и маркера
// каждый модуль имеет собственное пространство имен
let map = null
let marker = null
// функция принимает позицию - массив с широтой и долготой
// и сообщение, отображаемое над маркером (tooltip)
function getMap(position, tooltip) {
  // если карта не была инициализирована
  if (map === null) {
    // второй аргумент, принимаемый методом setView - это масштаб (zoom)
    map = L.map('maplet').setView(position, 16)
  } else return

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)

	L.tileLayer('http://vec{s}.maps.yandex.net/tiles?l=map&v=22.11.15-0-b221114130000&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
    subdomains: ['01', '02', '03', '04'],
    attribution: '<a http="yandex.ru" target="_blank">Яндекс</a>',
    reuseTiles: true,
    updateWhenIdle: false
  }).addTo(map);
  // добавляем маркер с сообщением
  L.marker(position).addTo(map).bindPopup(tooltip).openPopup()
  
}

navigator.geolocation.getCurrentPosition(success, error, {
  enableHighAccuracy: true
})

function success({ coords }) {
  const { latitude, longitude } = coords
  const currentPosition = [latitude, longitude]
  // вызываем функцию, передавая ей текущую позицию и сообщение
  getMap(currentPosition, 'You are here')
}

function error({ message }) {
  console.log(message)
}
*/


const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osmAttrib = 'Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
let osm = new L.TileLayer(osmUrl, {
  reuseTiles: true,
  updateWhenIdle: false,
  attribution: osmAttrib,
  detectRetina: true
});

let map = new L.Map("maplet", {
  layers: [osm],
  center: [43.1155,131.8854],
  zoom: 13,
  zoomControl: true
});

function success1({ coords }) {
  const { latitude, longitude } = coords
  const currentPosition = [latitude, longitude]
  console.log(currentPosition)
}

function success(pos) {
  var crd = pos.coords;

  console.log('Ваше текущее местоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
  console.log(pos);
};

function error({ message }) {
  console.log(message)
}

navigator.geolocation.getCurrentPosition(success, error, {
  enableHighAccuracy: true
})

navigator.geolocation.getCurrentPosition(success1, error, {
  enableHighAccuracy: true
})

L.control.locate({
    strings: {
      title: "Show me where I am, yo!"
    }
  }).addTo(map);