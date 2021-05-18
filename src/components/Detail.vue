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
        <td colspan="3">내용</td>
      </tr>
      <tr>
        <td colspan="3">{{ board.bcontent }}</td>
      </tr>
    </table>
    <span><b-button @click="putBoard" variant="info">수정하기</b-button></span>
    |
    <span
      ><b-button @click="deleteBoard" variant="danger">삭제하기</b-button></span
    >

    <br />
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  name: "detail",
  props: {
    board: { type: Object },
  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD HH:mm:ss");
    },
    deleteBoard() {
      console.log(this.board);
      this.$store.dispatch("deleteBoard", this.board);
      this.$router.push("list");
    },
    putBoard() {
      this.$router.push("modify?bnum=" + this.board.bnum);
    },
  },
};
</script>
