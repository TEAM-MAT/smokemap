// kakao map 기본 설정
K = kakao.maps;
const container = document.querySelector("div#map");

const mapOptions = {
    //center: new K.LatLng(37.5349106, 126.981069), //용산구 가운데(임의 설정)
    center: new K.LatLng(37.496389, 126.956889), //용산구 가운데(임의 설정)
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
//

const url = [
    {
        name: "용산구",
        link: `https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
    {
        name: "영등포구",
        link: `https://api.odcloud.kr/api/15069051/v1/uddi:2653cc01-60d7-4e8b-81f4-80b24a39d8f6?page=1&perPage=1000&serviceKey=${GOVDATA_API_KEY}`,
    },
];
function areaSelect(areaSelection) {
    const areaLink = url[areaSelection].link;
    fetch(areaLink)
        .then((res) => res.json())
        .then((out) => {
            console.log(out);
            console.log("JSON Loaded");
            markingAll(out.data);
        })
        .catch((error) => console.log("JSON Load Error"));
}

function markingAll(data) {
    let cnt = 1;
    const currentBounds = new K.LatLngBounds();
    while (cnt < data.length) {
        const tmpData = data[cnt];
        if (tmpData["위도"] >= 35) {
            const tmpLatLng = new K.LatLng(tmpData["위도"], tmpData["경도"]);
            const tmlMarker = new K.Marker({ map: map, position: tmpLatLng });
            currentBounds.extend(tmpLatLng);
        } //오류 데이터 수정되면 if 안에 부분만 살리기
        cnt = cnt + 1;
    }
    map.setBounds(currentBounds);
}
