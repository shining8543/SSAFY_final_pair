<template>
  <tr v-if="this.isModify">
    <td>{{ user.userId }}</td>
    <td>-</td>
    <td>{{ user.userName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address }}</td>
    <td>{{ getFormatDate(user.joindate) }}</td>
    <td>
      <b-button variant="info" @click="modifyBtn">수정</b-button>
      <b-button variant="danger">삭제</b-button>
    </td>
  </tr>
  <tr v-else>
    <td>{{ user.userId }}</td>
    <td>
      <input type="text" value="{user.userPwd}" v-model="modify_user.userPwd" />
    </td>
    <td>
      <input type="text" value="user.userName" />
    </td>
    <td>
      <input type="text" value="user.email" v-model="modify_user.email" />
    </td>
    <td>
      <input type="text" value="user.address" v-model="modify_user.address" />
    </td>
    <td>
      <input type="text" value="user.joindate" v-model="modify_user.joindate" />
    </td>
    <td>
      <b-button variant="info" @click="putUser">수정</b-button>
      <b-button variant="danger" @click="modifyBtn">취소</b-button>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
export default {
  data: function () {
    return {
      isModify: "false",
      modify_user: {},
    };
  },
  name: "userlist",
  props: {
    user: { type: Object },
  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
    modifyBtn() {
      console.log("modify try");
      this.isModify = !this.isModify;
    },
    putUser() {},
  },
};
</script>

<style>
</style>