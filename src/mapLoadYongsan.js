const mapOptions = {
    center: new naver.maps.LatLng(37.5349106, 126.981069), //용산구 가운데(임의 설정)
    zoom: 13,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
    scaleControl: true,
    logoControl: true,
    mapDataControl: true,
    mapTypeControl: false,
    zoomControl: true,
    mapDataControl: true,
    MapDataControlOptions: 10,
};

const map = new naver.maps.Map(document.querySelector("div#map"), mapOptions);

let url =
    "https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=1000&serviceKey=D2qnBHkgbrVY8slQnmwVcLKIAZX4wnBWB12e79vGvusWLq%2F2Ve%2BCboT85nkdPt2mcy0tQGO8eTssdNoYBfEDmQ%3D%3D";

fetch(url)
    .then((res) => res.json())
    .then((out) => {
        console.log("JSON loaded");
        markingAll(out.data);
    })
    .catch((err) => {
        console.log("JSON load failed");
    });

function markingAll(data) {
    let cnt = 1;
    const ICON_STYLE =
        "margin: 0; padding: 5px; font-size: 0.2vw; border: 10px solid #2E86C1; border-radius: 15px 15px 15px 0px; background-color:#eee;";
    while (cnt < data.length) {
        const markerOptions = {
            position: new naver.maps.LatLng(
                data[cnt]["위도"],
                data[cnt]["경도"]
            ),
            map: map,
            title: data[cnt]["서울특별시 용산구 설치 위치"],
            icon: {
                content: `<h3 style="${ICON_STYLE}">${data[cnt]["서울특별시 용산구 설치 위치"]}</h3>`,
            },
        };
        const marker = new naver.maps.Marker(markerOptions);
        cnt = cnt + 1;
    }
}
