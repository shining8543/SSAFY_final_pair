<template>
  <div>
    <div v-if="isLogin">
      <b>{{ userInfo.userId }}</b> 님 환영합니다!
      <b-badge
        id="stateBtn"
        variant="info"
        v-b-modal.userInfo-modal
        @click="modifyOff"
        >Info</b-badge
      >
      <b-badge id="stateBtn" variant="dark" v-b-modal @click="logout"
        >로그아웃</b-badge
      >
    </div>
    <div v-else>
      <b-badge id="stateBtn" variant="primary" v-b-modal.login-modal
        >Login</b-badge
      >
      <b-badge id="stateBtn" variant="light" v-b-modal.signUp-modal
        >Sign Up</b-badge
      >
    </div>
    <!-- 로그인 모달 -->
    <b-modal id="login-modal" title="로그인" hide-footer>
      <form>
        <b-form-group label="아 이 디" label-for="userId-input">
          <b-form-input id="userId-input" v-model="login.userId"></b-form-input>
        </b-form-group>

        <b-form-group label="비 밀 번 호" label-for="userPwd-input">
          <b-form-input
            id="userPwd-input"
            v-model="login.userPwd"
          ></b-form-input>
        </b-form-group>

        <div class="form-group" align="center">
          <button class="btn btn-primary" @click="postlogin">로그인</button>
        </div>
      </form>
    </b-modal>

    <!-- 회원 가입 모달 -->
    <b-modal id="signUp-modal" title="회원가입" hide-footer>
      <form>
        <b-form-group label="아 이 디" label-for="userId-input">
          <b-form-input
            id="userId-input"
            v-model="signUp.userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="비 밀 번 호" label-for="userPwd-input">
          <b-form-input
            id="userPwd-input"
            v-model="signUp.userPwd"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 름" label-for="userName-input">
          <b-form-input
            id="userName-input"
            v-model="signUp.userName"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 메 일" label-for="email-input">
          <b-form-input id="email-input" v-model="signUp.email"></b-form-input>
        </b-form-group>

        <b-form-group label="주 소" label-for="address-input">
          <b-form-input
            id="address-input"
            v-model="signUp.address"
          ></b-form-input>
        </b-form-group>

        <div class="form-group" align="center">
          <button type="reset" class="btn btn-primary" @click="postsignUp">
            회원가입
          </button>
        </div>
      </form>
    </b-modal>

    <!-- 회원 정보 모달 -->
    <b-modal id="userInfo-modal" title="회원정보" hide-footer>
      <form v-if="isModify">
        <b-form-group label="아 이 디" label-for="userId-input">
          <b-form-input
            id="userId-input"
            v-model="modifyForm.userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="비 밀 번 호" label-for="userPwd-input">
          <b-form-input
            id="userPwd-input"
            v-model="modifyForm.userPwd"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 름" label-for="userName-input">
          <b-form-input
            id="userName-input"
            v-model="modifyForm.userName"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 메 일" label-for="email-input">
          <b-form-input
            id="email-input"
            v-model="modifyForm.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="주 소" label-for="address-input">
          <b-form-input
            id="address-input"
            v-model="modifyForm.address"
          ></b-form-input>
        </b-form-group>

        <div class="form-group" align="center">
          <button type="reset" class="btn btn-primary" @click="modifyUserInfo">
            수정하기
          </button>
          <button type="reset" class="btn btn-danger" @click="modifyOff">
            취소하기
          </button>
        </div>
      </form>
      <form v-else>
        <b-form-group label="아 이 디" label-for="userId-input">
          <b-form-input
            id="userId-input"
            v-model="userInfo.userId"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group label="비 밀 번 호" label-for="userPwd-input">
          <b-form-input
            id="userPwd-input"
            type="password"
            value="1234567"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 름" label-for="userName-input">
          <b-form-input
            id="userName-input"
            v-model="userInfo.userName"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이 메 일" label-for="email-input">
          <b-form-input
            id="email-input"
            v-model="userInfo.email"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group label="주 소" label-for="address-input">
          <b-form-input
            id="address-input"
            v-model="userInfo.address"
            readonly
          ></b-form-input>
        </b-form-group>

        <div class="form-group" align="center">
          <button class="btn btn-primary" type="reset" @click="modifyOn">
            수정하기
          </button>
          <button class="btn btn-danger" @click="deleteUser">탈퇴하기</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      login: {},
      signUp: {},
      modifyForm: {
        userId: "",
        userPwd: "",
        userName: "",
        address: "",
        email: "",
      },
      isModify: false,
    };
  },
  updated: {},
  created() {
    this.$store.dispatch("getLoginState");
  },
  methods: {
    postlogin() {
      this.$store.dispatch("login", this.login).then(() => {
        alert("환영합니다!");
      });
    },
    postsignUp() {
      this.$store.dispatch("signUp", this.signUp).then(() => {
        alert("회원가입이 되었습니다 !");
        window.location.reload();
      });
    },

    logout() {
      this.$store.dispatch("logout").then(() => {
        alert("로그아웃 되었습니다 !");
        this.isLogin = false;
        window.location.reload();
      });
      console.log(this.isLogin);
    },
    deleteUser() {
      this.$store.dispatch("deleteUser").then(() => {
        alert("바이 바이...");
      });
    },
    modifyOn() {
      this.modifyForm.userId = this.$store.getters.userInfo.userId;
      this.isModify = true;
      console.log(this.modifyForm);
    },
    modifyOff() {
      this.isModify = false;
    },
    modifyUserInfo() {},
  },
  computed: {
    ...mapGetters({ userInfo: "userInfo", isLogin: "isLogin" }),
  },
};
</script>

<style>
#stateBtn {
  margin-left: 5px;
}
</style>