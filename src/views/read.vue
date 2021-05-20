<template>
  <div>

    <detail :board="board" />

    <div v-if="cmtList.length > 0">
      <table class="table table-striped">
        <tr>
          <th>작성자</th>
          <th>댓글</th>
        </tr>
        <commentlist
          v-for="(item, index) in cmtList"
          :key="`${index}_cmtList`"
          :ccontent="item.ccontent"
          :cwriter="item.cwriter"
        />
      </table>
    </div>
  </div>
</template>

<script>

import commentlist from "@/components/CommentList.vue";
import Boardhttp from "../util/Boardhttp";
import Detail from "@/components/Detail.vue";
import { mapGetters } from "vuex";
export default {
  name: "read",
  components: {
    Detail,
    commentlist,
  },
  data: function () {
    return {
      item: {},
      cmtList: {},
    };
  },
  created() {
    console.log("read!");
    console.log(this.$route.query);
    this.$store.dispatch("getBoard", this.$route.query.bnum);
    this.getCmtList();
  },
  methods: {
    getCmtList() {
      Boardhttp.get(`/ajax?bnum=${this.$route.query.bnum}`).then(({ data }) => {
        this.cmtList = data;
      });
    },
  },
  computed: {
    ...mapGetters(["board"]),
  },
};
</script>

<style></style>
