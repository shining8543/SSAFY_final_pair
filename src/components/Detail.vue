<template>
  <div>
    <table class="table table-striped">
   <tr>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
      </tr>
      <tr>
        <td> {{title}}</td>
        <td> {{userid}} </td>
        <td>{{ getFormatDate(bregdate) }}</td>
      </tr>
      <tr>
      <td colspan="3"> {{content}}</td>
      </tr>
    </table>

    <br />
   
  </div>
</template>
 
<script>
import moment from 'moment';
export default {
  name: 'detail',
  props: {
    userid: { type: String },
    title: { type: String },
    content: {type: String},
    bregdate: { type: Number },

  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    },
  },
};
</script>
