<template>
  <div>
    <br />
    로그인<br />
    ID : <input type="text" v-model="login.userId" /> PW :<input
      type="password"
      v-model="login.userPwd"
    />
    <b-button @click="postlogin">login</b-button>
    <br /><br />
    signUp<br />
    ID : <input type="text" v-model="signUp.userId" /> PW :<input
      type="password"
      v-model="signUp.userPwd"
    />
    name : <input type="name" v-model="signUp.userName" /> email :
    <input type="text" v-model="signUp.email" /> address :
    <input type="text" v-model="signUp.address" />
    <br />
    <b-button @click="postsignUp">signUp</b-button><br />
    <b-button @click="logout">logout</b-button><br />
    <b-button @click="userDelete">delete</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      login: {},
      signUp: {},
      userInfo: {},
    };
  },
  created() {},
  methods: {
    postlogin() {
      this.$store.dispatch("login", this.login).then(() => {});
      // this.$store.dispatch("getUser", this.login);
    },
    postsignUp() {
      this.$store.dispatch("signUp", this.signUp).then(() => {
        alert("회원가입 !");
      });
    },

    logout() {
      this.$store.dispatch("logout").then(() => {
        alert("로그아웃 되었습니다 !");
      });
    },
    userDelete() {
      this.$store.dispatch("deleteUser").then(() => {});
    },
  },
  computed: {
    ...mapGetters["userInfo"],
  },
};
</script>

<style>
</style>