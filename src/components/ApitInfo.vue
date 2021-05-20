
<template>
  
  
  
</template>


<script>

import ListRow from "@/components/Row.vue";
import { mapGetters } from 'vuex';
export default {
  name: "list",
  components: {
    ListRow,
  },
  data: function () {
    return {
      apt:[{curpage:"",}],
      // items: [],
      // pages: [],
      // board: "",
      // page: "",
    };
  },
  created() {
    this.$store.dispatch("getAptInfo",this.apt);// list들 받아오기 
    
  },
  computed : {
    ...mapGetters(['apt','startPage','endPage','curPage','totalPage']),
  
  },




  methods :{
    write(){
      this.$router.push("write");
    },
    range(start, end) {
      let list = [];
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    },
  },
};
</script>


<style></style>