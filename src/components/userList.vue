<template>
  <tr>
    <td>{{ user.userId }}</td>
    <td>{{ user.userName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address }}</td>
    <td>{{ getFormatDate(user.joinDate) }}</td>
  </tr>
</template>

<script>
import moment from "moment";
export default {
  name: "userlist",
  props: {
    user: {},
  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
  },
};
</script>

<style>
</style>