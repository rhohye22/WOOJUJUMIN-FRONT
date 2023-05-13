import React, { useEffect, useState } from "react";

const { kakao } = window;

const MapContainer = (prop) => {
  const [jsdata, setJsdata] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("map");
    prop.setAddr(" ");
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

      kakao.maps.event.addListener(marker, "click", function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
        console.log(place);
        prop.setPla(place.place_name);
        prop.setAddr(place.address_name);

        infowindow.open(map, marker);
      });
    }

    console.log("container CHK");
  }, [prop.searchPlace]);
  console.log(JSON.stringify(jsdata)); //키워드 검색 결과 저장
  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapContainer;
