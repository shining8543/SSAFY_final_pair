<template>

<div id="app">
  <h1>Vue Select</h1>

<div>
  <b-container fluid>


  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-default" >검색 :</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-default" placeholder="Enter your name" @keyup.enter="show()" v-on:blur="show()"></b-form-input>
    </b-col>
  </b-row>


    <table class="table"> 
      <tr>

        <td  v-if=ulactivate  activate>First Action</td>
        <td v-if=ulactivate>Second Action</td>
        <td v-if=ulactivate>Third Action</td>
        </tr>


    </table>

</b-container>
</div>

<vue-select :options="options">
  

  </vue-select> 
</div>


</template>


<script>
import "vue-select/dist/vue-select.css";
import VueSelect from 'vue-select'
export default {
  name:"search",
  components:{
    VueSelect,
  },
   data() {
     return {
       activate:false,
       ulactivate:false,
      user: "",
     country: 0,
     options: [
       "Yogesh singh",
       "Sunil singh",
       "Sonarika bhadoria",
       "Akilesh sahu",
       "Mayank patidar"
     ],
     country_options: []  
     }
   },
   methods: {
      fetchOptions: function(search,loading){
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
      show(){
        this.ulactivate=!this.ulactivate;
      },
      selectedOption: function(value){
         console.log("value : " + value);
      }
   }

}

</script>
<style>
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

h1,.muted {
  color: #2c3e5099;
}

h1 {
  font-size: 26px;
  font-weight: 600;
}

#app {
  max-width: 30em;
  margin: 1em auto;
}
</style>