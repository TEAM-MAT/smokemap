// kakao map 기본 설정
K = kakao.maps;
const container = document.querySelector("div#map");

const mapOptions = {
    center: new K.LatLng(37.496389, 126.956889), //숭실대학교(임의 설정)
    level: 4,
};

const map = new K.Map(container, mapOptions);
//지도의 타입
map.setMapTypeId(K.MapTypeId.ROADMAP);
//확대·축소 컨트롤
const zoomControl = new K.ZoomControl();
map.addControl(zoomControl, K.ControlPosition.LEFT);
//copyright 위치
map.setCopyrightPosition(K.CopyrightPosition.BOTTOMLEFT, true);

//data.go.kr API Service Key
GOVDATA_API_KEY =
    "D2qnBHkgbrVY8slQnmwVcLKIAZX4wnBWB12e79vGvusWLq%2F2Ve%2BCboT85nkdPt2mcy0tQGO8eTssdNoYBfEDmQ%3D%3D";
// smoking area data
const urls = [
    {
        index: 0,
        name: "서울특별시 용산구",
        link: `https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
    {
        index: 1,
        name: "서울특별시 영등포구",
        link: `https://api.odcloud.kr/api/15069051/v1/uddi:2653cc01-60d7-4e8b-81f4-80b24a39d8f6?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
    {
        index: 2,
        name: "인천 서구",
        link: `https://api.odcloud.kr/api/15029136/v1/uddi:c9e96d93-2210-4ffc-9d4b-fe2eee897053?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
    {
        index: 3,
        name: "경기도 안양시",
        link: `https://api.odcloud.kr/api/15060926/v1/uddi:2fbc5375-a15d-4907-9482-ecc12da41af2?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
    {
        index: 4,
        name: "경상북도 칠곡군",
        link: `https://api.odcloud.kr/api/15033733/v1/uddi:61cfbad0-be32-4e88-8ffd-d708efd5f378?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },

    {
        index: 5,
        name: "세종특별자치시",
        link: `https://api.odcloud.kr/api/15029191/v1/uddi:5166ad8c-b19d-4a9b-b30c-c8011b889776_201912102205?page=1&perPage=1000?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
];

var markers = [];

//loading data
function areaSelect(areaNum, areaSelection) {
    for (var index in urls) {
        if (index != Number(areaNum)) {
            document.getElementById(index).classList.remove("selected");
        } else {
            document.getElementById(index).classList.add("selected");
        }
    }
    const areaLink = urls[areaNum].link;
    fetch(areaLink)
        .then((res) => res.json())
        .then((out) => {
            console.log("JSON Loaded");
            markingAll(out.data);
            document.querySelector(
                "#selected"
            ).innerText = `(${areaSelection})`;
        })
        .catch((error) => console.log("JSON Load Error"));
}

const geocoder = new K.services.Geocoder();
var infowindow = new K.CustomOverlay({});

function markingAll(data) {
    //deleting previous markers
    let cnt = 0;
    while (cnt < markers.length) {
        markers[cnt].setMap(null);
        cnt = cnt + 1;
    }
    markers = [];
    console.log("deleted");
    cnt = 0;
    const currentBounds = new K.LatLngBounds();
    while (cnt < data.length) {
        const tmpData = data[cnt];
        if (tmpData["위도"] >= 35) {
            const tmpLatLng = new K.LatLng(tmpData["위도"], tmpData["경도"]);
            const tmpMarker = new K.Marker({ map: map, position: tmpLatLng });
            K.event.addListener(tmpMarker, "click", function () {
                searchDetailAddrFromCoords(
                    tmpLatLng,
                    function (result, status) {
                        if (status === K.services.Status.OK) {
                            infowindow.setContent(`<div class="infoWindow"><p><img src="https://i.imgur.com/3c7TeY7.png" style="height:1em;">
                            <p>${result[0].address.address_name}</p></p>
                            <a href="https://map.kakao.com/link/search/${result[0].address.address_name}}"><p>길찾기</p></a></div>
                            `);
                            infowindow.setPosition(tmpLatLng);
                            infowindow.setMap(map);
                        }
                    }
                );
            });
            currentBounds.extend(tmpLatLng);
            markers.push(tmpMarker);
        } //오류 데이터 수정되면 if 안에 부분만 살리기
        cnt = cnt + 1;
    }
    map.setBounds(currentBounds, 16);
    return currentBounds;
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}
