<template>
  <tr>
  
    <td>{{ board.bwriter }}</td>
    <td>
     <router-link :to="`read?bnum=${board.bnum}`">{{ board.btitle }}</router-link> 
    </td>
    <td>{{ getFormatDate(board.bregdate) }}</td> 
  </tr>
</template>

<script>
import moment from "moment";
export default {
  name: "row",
  props: {
    // userid: { type: String },
    // title: { type: String },
    // views: { type: Number },
    // articleid: { type: Number },
    // bregdate: { type: String },
    // type: { type: String },
    board:{type:Object},
  },
  computed: {
  
  },
  created() {
     //this.$store.dispatch("getRegdate");

    // this.bregdate = eval(this.bregdate);
  },
  methods: {
     getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD');
    },
  },
};
</script>
