<template>
  <div id="app">
    <h1>Vue Select</h1>

    <div>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">검색 :</label>
          </b-col>
          <b-col sm="10">
            <b-form-input
              id="input-default"
              placeholder="Enter your name"
              @keyup.enter="show()"
            >
            </b-form-input>
          </b-col>
        </b-row>
        
      <kakaomap :keyword="searchbar"></kakaomap>

        <table class="table">
          <tr>
            <td v-if="ulactivate" activate>First Action</td>
            <td v-if="ulactivate">Second Action</td>
            <td v-if="ulactivate">Third Action</td>
          </tr>
        </table>
      </b-container>
    </div>

    검색 :
    <input v-model.lazy="searchbar" placeholder="몬가" type="text" /><br />
    
    <div id="dropdown">
      <div class="search-selec">
        <b-list-group>
          지역
          <b-list-group-item
            v-for="item in arealist"
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
            v-for="item in something"
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
import KakaoMaps from "@/components/KakaoMaps.vue";
export default {
  name: "search",
  components: {
      'kakaomap':KakaoMaps,
  },
  data() {
    return {
      activate: false,
      ulactivate: false,
      user: "",
      country: 0,
      searchbar: "",
      input: "",
      arealist: {
        1: { id: 1, val: "area1" },
        2: { id: 2, val: "area2" },
        3: { id: 3, val: "area3" },
      },
      aptlist: {
        1: { id: 1, val: "apt1" },
        2: { id: 2, val: "apt2" },
        3: { id: 3, val: "apt3" },
      },
      something: {
        1: { id: 1, val: "something" },
        2: { id: 2, val: "something" },
        3: { id: 3, val: "something" },
      },
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
  updated: {
    getList() {
      if (this.serachbar.length > 5) {
        console.log("555");
      }
    },
  },
  methods: {
    fetchOptions: function (search, loading) {
      console.log(loading);
      console.log(search);
      // AJAX request
      // axios.get('ajaxfile.php', {
      //    params: {
      //       search: search,
      //    }
      // })
      // .then(function (response) {

      //    // Update options
      //    el.country_options = response.data;

      // });
    },
    show() {
      this.ulactivate = !this.ulactivate;
    },
    selectedOption: function (value) {
      console.log("value : " + value);
    },
  },
};
</script>
<style>

.search-selec {
  border: 1px solid red;
  display: inline-block;
  width: 30%;
  box-sizing: border-box;
}
</style>