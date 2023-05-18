import React, { useEffect, useState } from "react";

const { kakao } = window;

const DetailMap = (prop) => {
  const [jsdata, setJsdata] = useState([]);
  const [deaddress, setDeaddress] = useState('');
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(prop.searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        setJsdata(data);
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      setDeaddress(place.address_name);
      kakao.maps.event.addListener(marker, "click", function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
        
        console.log(place);

        infowindow.open(map, marker);
      });
    }


    console.log("container CHK");
  }, [prop.searchPlace]);

  
  const searchRoute = () => {
    const start = document.getElementById("start").value; // 출발지 입력값
    const end = jsdata[0].address_name; // 검색된 장소의 주소를 도착지로 설정
    
    const url = `https://map.kakao.com/link/to/${end},${jsdata[0].y},${jsdata[0].x}`; // URL 생성
    
    window.open(url); // 새 창에서 길찾기 링크 열기
  }
  
  console.log(JSON.stringify(jsdata)); //키워드 검색 결과 저장
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <p>상세주소 : {deaddress}</p>
      {/* <input type="text" id="start" placeholder="출발지를 입력하세요" />
      <button onClick={searchRoute}>길찾기</button> */}
    </div>
  );
};

export default DetailMap;
