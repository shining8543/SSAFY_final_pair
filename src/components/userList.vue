<template>
  <tr v-if="this.isModify">
    <td>{{ user.userId }}</td>
    <td>-</td>
    <td>{{ user.userName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address }}</td>
    <td>{{ getFormatDate(user.joindate) }}</td>
    <td>
      <b-button variant="info" @click="modifyOnBtn">수정</b-button>
      <b-button variant="danger" @click="deleteBtn">삭제</b-button>
    </td>
  </tr>
  <tr v-else>
    <td>{{ user.userId }}</td>
    <td>
      <input type="text" v-model="modify_user.userPwd" />
    </td>
    <td>
      <input type="text" v-model="modify_user.userName" />
    </td>
    <td>
      <input type="text" v-model="modify_user.email" />
    </td>
    <td>
      <input type="text" v-model="modify_user.address" />
    </td>
    <td>
      <input type="text" v-model="modify_user.joindate" />
    </td>
    <td>
      <b-button variant="info" @click="putUser">수정</b-button>
      <b-button variant="danger" @click="modifyOffBtn">취소</b-button>
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
      now_select: {
        userId: "",
        userPwd: "",
        userName: "",
        email: "",
        address: "",
      },
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
    modifyOnBtn() {
      this.modify_user = this.user;
      this.now_select.userId = this.modify_user.userId;
      this.now_select.userPwd = this.modify_user.userPwd;
      this.now_select.userName = this.modify_user.userName;
      this.now_select.email = this.modify_user.email;
      this.now_select.address = this.modify_user.address;

      this.isModify = !this.isModify;
    },
    modifyOffBtn() {
      this.modify_user.userId = this.now_select.userId;
      this.modify_user.userPwd = this.now_select.userPwd;
      this.modify_user.userName = this.now_select.userName;
      this.modify_user.email = this.now_select.email;
      this.modify_user.address = this.now_select.address;

      this.isModify = !this.isModify;
    },
    putUser() {
      if (
        this.modify_user.userPwd == null ||
        this.modify_user.userName == null
      ) {
        alert("필수항목을 모두 채워주세요");
        return;
      }

      //this.$state.dispatch("putUser",this.modify_user);
      alert("수정 완료");
    },
    deleteBtn() {
      //this.$state.dispatch("deleteUser", this.modify_user);
    },
  },
};
</script>

<style>
</style>