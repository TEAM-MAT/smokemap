var mapOptions = {
    center: new naver.maps.LatLng(37.4946447265009, 126.95993178216192),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
    scaleControl: true,
    logoControl: true,
    mapDataControl: true,
    mapTypeControl: false,
    zoomControl: true,
};

var map = new naver.maps.Map('map', mapOptions);


var markerOptions = {
    position: new naver.maps.LatLng(37.553149, 126.968881),
    map: map,
};

var marker = new naver.maps.Marker(markerOptions);