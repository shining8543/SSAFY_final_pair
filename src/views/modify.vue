<template>
  <div>
    <h4>게시글 작성</h4>
    <b-container>
      <b-form-group id="input-name" label="제목" label-for="input-title">
        <b-form-input
          id="input-title"
          type="text"
          v-model="item.btitle"
          placeholder="제목을 입력하세요"
          value="this.item.title"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-name" label="내용" label-for="input-content">
        <b-form-textarea
          id="input-content"
          type="text"
          v-model="item.bcontent"
          placeholder="내용을 입력하세요"
          rows="10"
          max-rows="10"
          required
        ></b-form-textarea>
        <b-button @click="putBoard">수정하기</b-button>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      item: {},
    };
  },
  created() {
    console.log("modify : " + this.$route.query.bnum);
    this.$store.dispatch("getBoard", this.$route.query.bnum);
    this.item = this.board;
  },
  computed: {
    ...mapGetters(["board"]),
  },
  methods: {
    putBoard() {
      this.board.bnum = this.$route.query.bnum;
      this.$store.dispatch("putBoard", this.item).then(() => {
        this.$router.push("list");
      });
    },
  },
};
</script>

<style>
</style>