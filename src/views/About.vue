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


</div>


</template>


<script>

export default {
  name:"search",
  components:{
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

      show(){
        this.ulactivate=!this.ulactivate;
      },

   }

}

</script>
<style>

</style>