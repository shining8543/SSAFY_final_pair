

<template>
  <div>
    <div v-if="items.length">
      <table class="table table-bordered table-condensed">
        <colgroup>
          <col :style="{ width: '5%' }" />
          <col :style="{ width: '50%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '25%' }" />
        </colgroup>
        <tr>
          <th>작성자</th>
          <th>제목</th>
          <th>조회수</th>
          <th>날짜</th>
        </tr>
        
        <list-row
          v-for="(item, index) in items"
          :key="`${index}_items`"
          :userid="item.bwriter"
          :title="item.btitle"
          :views="randomViews()"
          :articleid="item.bnum"
          :bregdate="item.bregdate"
          :type="board"
        />
      </table>
      <div class="d-flex justify-content-center container">
        <nav aria-label="...">
          <ul class="pagination">
              <li v-if="pages.startPage>1" class="page-item disabled"><a
                href="#" @click="movePage(pages.startPage-1)" class="
                page-link" tabindex="-1">Previous</a></li>
    

             <li class="page-item" v-for="i in range(pages.startPage,pages.endPage)" v-bind:key="i" >
                <a     href="#" @click="movePage(i)"  class="page-link" >{{i}}</a>
               </li>


                    <li v-if="pages.endPage < pages.totalPage" class="page-item"><a
                href="#" @click="movePage(pages.endPage+1)" class="
                page-link" tabindex="-1">Next</a></li> 

          </ul>
        </nav>
      </div> 
      </div>
    <div v-else>글이 없습니다.</div>
    <div class="text-right">
      <!-- <button @click="`${movePage(pages.curPage-1)}`" class="btn btn-primary">이전</button>
      <button @click="`${movePage(pages.curPage+1)}`" class="btn btn-primary">다음</button> -->
       
    </div>
  </div>


</template>


<script>
import boardhttp from '../util/Boardhttp';
import ListRow from '@/components/Row.vue';
export default {
  name: 'list',
  components: {
    ListRow,
  },
  data: function() {
    return {
      items: [],
      pages:[],
      board:"",
      page:""

    };
  },
  created() {
    this.board="board";
    this.views=Math.random(10,100);
    console.log();
    if(this.$route.query.page==null){
      console.log("null");
      this.page=1;
    }
    else{
      this.page=this.$route.query.page;
    }
    boardhttp
      .get('/BoardMain?page='+this.page)
      .then(({ data }) => {
          console.log("enter");
         this.items = data.bList;
         this.pages=data;
      })
      .catch(() => {
        alert('에러가 발생했습니다.');
      });
  },
  methods: {
    randomViews() {
       return Math.floor(Math.random(10,100)*100);
    },
    movePage(page){
      boardhttp
       .get('/boardMain?page='+page)
      .then(({ data }) => {

         this.items = data.bList;
         this.pages=data;
         console.log(this.pages +" 들어옴");
      })
      .catch(() => {
        alert('에러가 발생했습니다.');
      });

    },
      range(start, end){
    let list = []
    for (let i = start; i <= end ; i ++){
      list.push(i);
      }
    return list;}
  },
};
</script>


<style></style>