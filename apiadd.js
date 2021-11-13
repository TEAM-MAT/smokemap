/*fetch("classified.json")
    .then((response) => response.json())
    .then((json) => {
        const kakaoApiUrl =
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + json.keys.KAKAO_API_KEY;
        document.querySelector("script#kakao").src = kakaoApiUrl;
        console.log(kakaoApiUrl);
    });*/
const kakaoApifront="//dapi.kakao.com/v2/maps/sdk.js?appkey="
fetch('classified.json')
.then(response=>{
    return response.json();
}).then(apikey=>console.log(apikey));