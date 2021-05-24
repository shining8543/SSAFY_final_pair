<template>
  <div class="container">
    <h2>회원 목록</h2>
    <div align="right">
      <b-button variant="info" v-b-modal.user-add-modal> 등록 </b-button>
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
          <th class="text-center">비밀번호</th>
          <th class="text-center">이름</th>
          <th class="text-center">이메일</th>
          <th class="text-center">주소</th>
          <th class="text-center">가입일</th>
          <th class="text-center">수정/삭제</th>
        </tr>
      </thead>
      <user-list
        v-for="(user, idx) in userList"
        :key="idx"
        :user="user"
      ></user-list>
    </table>

    <!-- 회원 등록 모달 -->

    <b-modal id="user-add-modal" title="회원 등록" hide-footer>
      <form>
        <b-form-group label="아 이 디" label-for="userId-input">
          <b-form-input
            id="userId-input"
            v-model="add_user.userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="비 밀 번 호" label-for="userPwd-input">
          <b-form-input
            id="userPwd-input"
            v-model="add_user.userPwd"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 름" label-for="userName-input">
          <b-form-input
            id="userName-input"
            v-model="add_user.userName"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 메 일" label-for="email-input">
          <b-form-input
            id="email-input"
            v-model="add_user.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="주 소" label-for="address-input">
          <b-form-input
            id="address-input"
            v-model="add_user.address"
          ></b-form-input>
        </b-form-group>

        <div class="form-group" align="center">
          <button type="reset" class="btn btn-primary" @click="postUser">
            회원등록
          </button>
          <button type="reset" class="btn btn-warning">초기화</button>
        </div>
      </form>
    </b-modal>
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
    return {
      add_user: {
        userId: "",
        userPwd: "",
        userName: "",
        email: "",
        address: "",
      },
    };
  },
  created() {
    this.$store.dispatch("getUserList");
  },

  computed: {
    ...mapGetters({ userList: "users" }),
  },
  methods: {
    postUser() {
      this.$store.dispatch("postUser", this.add_user);
    },
  },
};
</script>

<style>
</style>