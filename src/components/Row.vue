<template>
  <tr>
    <td>{{ userid }}</td>
    <td>
      <router-link :to="`${getLink()}`">{{ title }}</router-link>
    </td>
    <td>{{ views }}</td>

    <td>{{ board.bregdate }}</td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "row",
  props: {
    userid: { type: String },
    title: { type: String },
    views: { type: Number },
    articleid: { type: Number },
    bregdate: { type: String },
    type: { type: String },
  },
  computed: {
    ...mapGetters(["getBoard"]),
  },
  created() {
    this.$store.dispatch("getRegdate");
    this.bregdate = eval(this.bregdate);
  },
  methods: {},
};
</script>
