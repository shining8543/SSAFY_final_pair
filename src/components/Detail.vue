<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
      </tr>
      <tr>
        <td>{{ board.btitle }}</td>
        <td>{{ board.bwriter }}</td>
        <td>{{ getFormatDate(board.bregdate) }}</td>
      </tr>
      <tr>
        <td colspan="3">작성글</td>
      </tr>
      <tr>
        <td colspan="3">{{ board.bcontent }}</td>
      </tr>
    </table>

    <br />
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  name: "detail",
  props: {
    board :{type:Object}
  },
  methods: {
       getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    },
  },
};
</script>
