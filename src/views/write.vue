<template>
  <div>
    <h4>게시글 작성</h4>
    <b-container>
      <b-form-group id="input-name" label="제목" label-for="input-title">
        <b-form-input
          id="input-title"
          type="text"
          v-model="board.btitle"
          placeholder="제목을 입력하세요"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-name" label="내용" label-for="input-content">
        <b-form-textarea
          id="input-content"
          type="text"
          v-model="board.bcontent"
          placeholder="내용을 입력하세요"
          rows="10"
          max-rows="10"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-button @click="add">등록하기</b-button>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: {
        bwriter: "ssafy",
        btitle: "",
        bcontent: "",
      },
    };
  },
  methods: {
    add() {
      this.$store.dispatch("postBoard", this.board).then(() => {});
    },
  },
};
</script>

<style>
</style>