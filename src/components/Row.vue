<template>
  <tr>
    <td>{{ userid }}</td>
    <td>
      <router-link :to="`${getLink()}`">{{ title }}</router-link>
    </td>
    <td>{{ views }}</td>
   
    <td> {{ getFormatDate(bregdate) }}</td>
  </tr>
</template>

<script>
import moment from 'moment';
export default {
  name: 'row',
  props: {
    userid: { type: String },
    title: { type: String },
    views: { type: Number },
    articleid: {type: Number},
    bregdate: { type: String },
    type : {type : String},

  },
  create(){
    this.bregdate = eval(this.bregdate);
  },
  methods: {    
    getLink(){
      if(this.type==="board")
        return "/board/read?bnum="+this.articleid;
      else if(this.type==="cafe"){
        return "/cafe/read?articleId="+this.articleid;
      }
    },

    getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD');
    },
  },
};
</script>
