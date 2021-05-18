<template>

  <div>    
      <tr>
        <td> {{cwriter}}</td>
        <td> {{ccontent}} </td>
      </tr>
      <tr>
       <td colspan="3"> {{ccontent}}</td>
      </tr>
  </div>

</template>
 
<script>
import moment from 'moment';
export default {
  name: 'commentList',
  props: {
    cwriter: { type: String },
    ccontent: {type: String},

  },
  methods: {
    getFormatDate(cregtime) {
      return moment(new Date(cregtime)).format('YYYY.MM.DD HH:mm:ss');
    },
  },
};
</script>
