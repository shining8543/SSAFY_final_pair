<template>

  <tr>
    <td>{{ apt.dong }}</td>
      <td>{{ apt.name }}</td>
       <td>{{ apt.buildYear }}</td>
    <td>{{apt.dealYear}}</td>
    <td>{{apt.jibun}}</td>
    <td>{{apt.dealAmount}}</td>

  </tr>
</template>

<script>
import moment from "moment";
export default {
  name: "row",
  props: {
    apt:{type:Object},
  },
  computed: {
  
  },
  created() {
  },
  methods: {
     getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD');
    },
  },
};
</script>
