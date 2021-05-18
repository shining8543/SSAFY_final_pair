<template>
  <div>
    <detail
      :content="item.bcontent"
      :title="item.btitle"
      :userid="item.bwriter"
      :bregdate="item.bregdate"
      
    />

  <div v-if="cmtList.length > 0">
    <table class="table table-striped">
      <tr>
        <th>작성자</th>
        <th>댓글</th>
      </tr>
  <commentlist v-for="(item,index) in cmtList"
    :key="`${index}_cmtList`"
    :ccontent="item.ccontent"
    :cwriter="item.cwriter"
  />
  
    </table>
    </div>

  </div>

</template>

<script>
import commentlist from '@/components/CommentList.vue';
import Boardhttp from '../../../util/Boardhttp';
import Detail from '@/components/Detail.vue';
export default {
  name: 'read',
  components: {
    Detail,
    commentlist,
  },
  data: function() {
    return {
      item: {},
      cmtList:{},
    };
  },
  created() {
    console.log(this.$route.query);
      Boardhttp.get(`/board?bnum=${this.$route.query.bnum}`).then(({ data }) => {
      this.item = data;
    
    });
    this.getCmtList();

  },
  methods:{
    getCmtList(){
      Boardhttp.get(`/ajax?bnum=${this.$route.query.bnum}`).then(({ data }) => {
      this.cmtList = data;
    });
    }
  }
};
</script>

<style></style>
