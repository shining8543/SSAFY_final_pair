<template>
  <div class="container">
    <h2>회원 목록</h2>
    <div align="right">
      <button
        type="button"
        class="modiBtn btn btn-outline-info"
        data-toggle="modal"
        data-target="#userRegModal"
      >
        등록
      </button>
    </div>
    <table class="table table-hover">
      <colgroup>
        <col width="120" />
        <col width="120" />
        <col width="120" />
        <col width="170" />
        <col width="*" />
        <col width="120" />
        <col width="130" />
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">아이디</th>
          <th class="text-center">이름</th>
          <th class="text-center">이메일</th>
          <th class="text-center">주소</th>
          <th class="text-center">가입일</th>
          <th class="text-center">수정/삭제</th>
        </tr>
      </thead>

      <user-list></user-list>
    </table>
  </div>
</template>

<script>
import UserList from "@/components/userList.vue";
import { mapGetters } from "vuex";
export default {
  name: "adminPage",
  components: {
    UserList,
  },
  data: function () {
    return {};
  },
  created() {},

  computed: {
    ...mapGetters(["users"]),
  },
};
</script>

<style>
</style>