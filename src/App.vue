<template>
  <div id="app">
    <div id="loginSpace">
      <userState class="mt-3 mr-3" />
    </div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">HappyHouse</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item rounter-link to="/board">게시판</b-nav-item>
          <b-nav-item rounter-link to="/about">매물 정보</b-nav-item>
          <b-nav-item rounter-link to="/adminPage">회원 관리</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="mt-3">
      <router-view />
    </div>
  </div>
</template>
<script>
import userState from "@/components/userState.vue";
export default {
  name: "app",
  components: {
    userState,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#loginSpace {
  text-align: right;
}
</style>
