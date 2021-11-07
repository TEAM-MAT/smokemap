const mapOptions = {
    center: new naver.maps.LatLng(37.4946447265009, 126.95993178216192),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
    scaleControl: true,
    logoControl: true,
    mapDataControl: true,
    mapTypeControl: false,
    zoomControl: true,
};

const map = new naver.maps.Map("map", mapOptions);

let url =
    "https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=1000&serviceKey=D2qnBHkgbrVY8slQnmwVcLKIAZX4wnBWB12e79vGvusWLq%2F2Ve%2BCboT85nkdPt2mcy0tQGO8eTssdNoYBfEDmQ%3D%3D";

fetch(url)
    .then((res) => res.json())
    .then((out) => {
        console.log("JSON loaded");
        marking(out.data);
    })
    .catch((err) => {
        console.log("JSON load failed");
    });

// 경도: "126.968881"
// 서울특별시 용산구 설치 위치: "서울특별시 용산구 서울역 광장 15번출구"
// 설치 주체: "한국철도공사"
// 시설 구분: "철도역"
// 시설형태: "개방형"
// 위도: "37.553149"
// 자치구명: "용산구"

function marking(data) {
    let cnt = 1;
    console.log(data);
    while (cnt < data.length) {
        console.log(data[cnt]);
        console.log(data[cnt]["경도"], data[cnt]["위도"]);
        const markerOptions = {
            // position: new naver.maps.LatLng(
            //     locations[cnt]["경도"],
            //     locations[cnt]["위도"]
            // ),
            // map: map,

            position: new naver.maps.LatLng(
                data[cnt]["위도"],
                data[cnt]["경도"]
            ),
            map: map,
            title: data[cnt]["서울특별시 용산구 설치 위치"],
            icon: {
                content: `<h3 style="margin: 0; padding: 5px; font-size: 0.2vw; border: 10px solid #2E86C1; border-radius: 15px 15px 15px 0px; background-color:#eee;">${data[cnt]["서울특별시 용산구 설치 위치"]}</h3>`,
            },
        };
        const marker = new naver.maps.Marker(markerOptions);
        cnt = cnt + 1;
    }
}
