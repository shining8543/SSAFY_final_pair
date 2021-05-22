<template>
  <div id="makemap">
    {{ station.length }}
    <div id="map"></div>
    <div>
      <form @submit.prevent="searchPlaces(keyword)">
        키워드 :
        <input
          type="text"
          value="건대"
          id="keyword"
          size="15"
          v-model="search"
        />
        <button type="submit">검색하기</button>
      </form>
    </div>
    <div id="dropdown">
      <div class="search-selec">
        <b-list-group>
          지역
          {{ station }}
          <b-list-group-item
            v-for="item in station"
            :value="item.val"
            :key="item.id"
          >
            <a href="#">{{ item.val }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="search-selec">
        <b-list-group>
          매물
          <b-list-group-item
            v-for="item in aptlist"
            :value="item.val"
            :key="item.id"
          >
            <a href="#">{{ item.val }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="search-selec">
        <b-list-group>
          몬가
          <b-list-group-item
            v-for="item in area"
            :value="item.val"
            :key="item.id"
          >
            <a href="#">{{ item.val }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
import kakaohttp from "../util/kakaohttp";
import { mapGetters } from "vuex";
export default {
  name: "app",
  props: ["keyword"],
  data() {
    return {
      map: null,
      geocoder: null,
      search: "",
      user: "",
      country: 0,
      searchbar: "",
      input: "",
      // station: {},
      aptlist: {},
      area: {},
      options: [
        "Yogesh singh",
        "Sunil singh",
        "Sonarika bhadoria",
        "Akilesh sahu",
        "Mayank patidar",
      ],
      country_options: [],
    };
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9d6d9c836fdd9dfd231ba53333f388e3&libraries=services";
      document.head.appendChild(script);
    }
  },
  computed: {
    ...mapGetters(["station"]),
  },
  methods: {
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      container.style.width = "95%";
      container.style.height = "1000px";

      let map = new kakao.maps.Map(container, options);
      let mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.map = map;

      this.geocoder = new kakao.maps.services.Geocoder();
    },
    removeMarker() {
      // for ( var i = 0; i < markers.length; i++ ) {
      //     markers[i].setMap(null);
      // }
      // markers = [];
    },
    gethttp(query) {
      var bounds = new kakao.maps.LatLngBounds();

      kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {
        console.log(data + " data들어옴");
        console.log(data);
        // let stationidx = 0;
        let aptidx = 0;
        let flag = false;
        for (var i = 0; i < data.documents.length; i++) {
          let types = data.documents[i].category_name.split(" > ");
          if (types[0] == "교통,수송" && types[1] == "지하철,전철") {
            this.$store.dispatch("getStation", data.documents[i].place_name);
            console.log("지하철입니다");
            //this.station[stationidx++] = data.documents[i].place_name;
            this.displayMarker(data.documents[i]);
            bounds.extend(
              new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
            );
            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.aptlist[aptidx++] = data.documents[i].place_name;
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = data.documents[i].place_name;
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("아파트입니다");
              flag = true;
            } else {
              this.displayMarker(data.documents[i]);
              this.aptlist[aptidx++] = data.documents[i].place_name;
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("기타시설입니다");
              flag = true;
            }
          }
          if (flag) {
            this.map.setBounds(bounds);
          }
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      });
    },

    searchPlaces() {
      if (!this.search.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }
      this.gethttp(this.search);

      // ps = new kakao.maps.services.Places();
      // ps.keywordSearch(this.search, this.placesSearchCB);
      //console.log(ps);
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        console.log(pagination);
        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.map.setBounds(bounds);
      }
    },

    displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      //  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
      var infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        content:
          '<div @click: style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>",
      });
      // 마커에 클릭이벤트를 등록합니다
      infowindow.open(this.map, marker);

      //     kakao.maps.event.addListener(marker, 'click', ()=> {
      //         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      //         infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      //         infowindow.open(this.map, marker);
      // });
    },

    // searchSubmit() {
    //     this.geocoder.addressSearch(this.search, (result, status) => {
    //         if (status === kakao.maps.services.Status.OK) {

    //             let bounds = new kakao.maps.LatLngBounds();

    //             for (let i = 0; i < result.length; i++) {
    //                 let data = result[i];
    //                 bounds.extend(new kakao.maps.LatLng(data.y, data.x));
    //             }

    //             this.map.setBounds(bounds);
    //         }
    //         else{
    //             console.log(status);
    //         }
    //     });
    // }
  },
};
</script>
<style>
</style>