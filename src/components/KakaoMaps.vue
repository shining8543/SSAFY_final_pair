<template>
  <div id="makemap">    
    
   <apt-info id="deal" :aptInfos="deallist" > </apt-info>
    <div id="map"></div>
    <div id="result"></div>
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
          <b-list-group-item
            v-for=" (item,idx) in station"
            :value="item"
            :key="idx"
          >
            <a href="#" @click="getdeallist(item.address_name)">{{ item.place_name }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="search-selec">
        <b-list-group>
          매물
          <b-list-group-item
            v-for="(item,idx) in aptlist"
            :value="item"
            :key="idx"
          >
            <a href="#"  @click="getdeallist(item.address_name)">{{ item.place_name }}</a>
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
            <a href="#"  @click="getdeallist(item.address_name)"  >{{item.place_name  }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
import kakaohttp from "../util/kakaohttp";
import boardhttp from "../util/Boardhttp";
import AptInfo from "../views/AptInfo"
import { mapGetters } from "vuex";
export default {
  name: "app",
  props: ["keyword"],
  components : {
    AptInfo,
  },
  data() {
    return {
      map: null,
      geocoder: null,
      markers:[],
      infowindows:[],
      search: "",
      user: "",
      country: 0,
      searchbar: "",
      input: "",
      // station: {},
      station_temp:{},
      aptlist: {},
      area: {},
      swLatlng:0,
      neLatlng:0,
      placesxy:[],
      clickdeallist:[],
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
  updated:{
    check(){
      console.log("updated");
    }
  }
  ,computed: {
    ...mapGetters(["station","deallist"]),
  },
  methods: {


    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      container.style.width = "60%";
      container.style.height = "1000px";

      let map = new kakao.maps.Map(container, options);
      let mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.map = map;


      kakao.maps.event.addListener(map, 'dragend', ()=> {             
    
        // 지도 영역정보를 얻어옵니다 
        var bounds = map.getBounds();
        
        // 영역정보의 남서쪽 정보를 얻어옵니다 
        this.swLatlng = bounds.getSouthWest();
        
        // 영역정보의 북동쪽 정보를 얻어옵니다 
        this.neLatlng = bounds.getNorthEast();
        
      
        var message = '<p>영역좌표는 남서쪽 위도, 경도는  ' + this.swLatlng.toString() + '이고 <br>'; 
        message += '북동쪽 위도, 경도는  ' + this.neLatlng.toString() + '입니다 </p>'; 
        

        this.matcharea();
        this.showstation();
        this.showdeallist();
        

        var resultDiv = document.getElementById('result');   
        resultDiv.innerHTML = message;
    
});
      this.geocoder = new kakao.maps.services.Geocoder();
    },
    matcharea(){
       let nela=this.neLatlng.La;
       let swla =this.swLatlng.La;
      let nema=(this.neLatlng.Ma);
     let swma=(this.swLatlng.Ma);
      boardhttp.get("/house/matcharea?swLat="+swma+"&swlng="+swla+"&neLat="+nema+"&nelng="+nela)
      .then(({ data }) => {
        this.showdeallist(data);
        
      })
  

      
    }


    ,removeMarker() {
    
      console.log("remvoe marker");

      console.log(this.markers);
      for ( var i = 0; i <this.markers.length; i++ ) {
          this.markers[i].setMap(null);
          this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows=[];
      console.log(this.markers +" 지움 ");

    },



    showdeallist(areadata){
      console.log(areadata);
     // this.removeMarker();
      for(let key in areadata) {
        // for(let i=0; i<data[key].length;i++){
        //  kakaohttp.get(`keyword.json?query=` + data[key][i].dong +" "+data[key][i].name).then(({ markerposition }) => {
        //    if(markerposition.documents.length!=0){
        //       console.log(markerposition.documents);
        //         break;
        //    }
 
        // });
          let nela=this.neLatlng.La;
       let swla =this.swLatlng.La;
      let nema=(this.neLatlng.Ma);
     let swma=(this.swLatlng.Ma);
        let searchquery= areadata[key][0].dong +" "+areadata[key][0].name.replace("("," ").replace(")"," ");

         kakaohttp.get(`keyword.json?query=` + searchquery).then(({ data }) => {
              if(data.documents.length>0){
                    let types = data.documents[0].category_name.split(" > ");
                   if(searchquery.includes(data.documents[0].place_name)  && types[0] == "부동산" && types[1] == "주거시설"){
                     if(nela>=data.documents[0].x&&swla<=data.documents[0].x && nema>=data.documents[0].y && swma<=data.documents[0].y){
                        this.displayMarkerclick(data.documents[0],areadata[key] );
                        
                     }
                   }

                   }
              });
      }

   


      // kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {

       //});

    },
    showstation(){

    }

    

    ,gethttp(query) {
      this.removeMarker();
      this.$store.dispatch("getStation", {});
      this.aptlist={};
      this.station_temp={};
      var bounds = new kakao.maps.LatLngBounds();
      kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {
        console.log(data + " data들어옴");
        console.log(data);
        let stationidx = 0;
        let aptidx = 0;
        let flag = false;
        console.log(data.documents);
        for (var i = 0; i < data.documents.length; i++) {
          let types = data.documents[i].category_name.split(" > ");
          if (types[0] == "교통,수송" && types[1] == "지하철,전철") {
           
            console.log("지하철입니다");
            this.station_temp[stationidx++] = {"palce_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
            this.displayMarker(data.documents[i]);
            bounds.extend(
              new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
            );
            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.aptlist[aptidx++] ={"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = {"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("아파트입니다");
              flag = true;
            } else {
              this.displayMarker(data.documents[i]);
              this.aptlist[aptidx++] = {"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("기타시설입니다");
              flag = true;
            }
          }
  

        }
         if (flag) {
            this.map.setBounds(bounds);
            this.$store.dispatch("getStation", this.station_temp);
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




     displayMarkerclick(place,deallist) {
      // 마커를 생성하고 지도에 표시합니다
      console.log(deallist);
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      //  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
      var infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        content:
          `<div id="temp" @click="getdeallist(deallist)" style="padding:5px; font-size:12px;">
          ${place.place_name} 
          </div>`,
      });
      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
      let latlng= place.y+" "+place.x;
      if (!this.placesxy.includes(latlng)){
         //infowindow.open(this.map, marker);
         this.markers.push(marker);
        this.infowindows.push(infowindow);

          infowindow.open(this.map, marker);  
          kakao.maps.event.addListener(marker, 'click', ()=> {
          // 마커 위에 인포윈도우를 표시합니다
         
          this.getdeallist(deallist)

    });

//  kakao.maps.event.addListener(marker, 'dbclick', ()=> {
//       // 마커 위에 인포윈도우를 표시합니다
//       infowindow.close(this.map, marker)});  



      };
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
          '<div style="padding:5px; font-size:12px;">' +
          place.place_name +
          "</div>",
      });
      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
      let latlng= place.y+" "+place.x;
      if (!this.placesxy.includes(latlng)){
         //infowindow.open(this.map, marker);
         this.markers.push(marker);
        this.infowindows.push(infowindow);

          infowindow.open(this.map, marker);  
    //       kakao.maps.event.addListener(marker, 'click', ()=> {
    //       // 마커 위에 인포윈도우를 표시합니다
    //       this.clickdeallist()
          

    // });

//  kakao.maps.event.addListener(marker, 'dbclick', ()=> {
//       // 마커 위에 인포윈도우를 표시합니다
//       infowindow.close(this.map, marker)});  



      };
      // if(!this.marekers.includes(marker)){
       
      // }
      

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
    getdeallist(item){
      console.log(item+" 들어옴 ");
      
      this.$store.dispatch("getdeallist", item);
    }
  },
};
</script>
<style>
#deal{
  float:left;
  width:30%;
height: 1000px;
}
#map{

}
</style>