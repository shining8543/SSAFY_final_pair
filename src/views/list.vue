

<template>
  
  <div>

    <b-input-group>
  
      <b-dropdown text="Dropdown" variant="info">
        <b-dropdown-item>작성자 </b-dropdown-item>
        <b-dropdown-item>글 내용 </b-dropdown-item>
      </b-dropdown>


    <b-form-input></b-form-input>
<b-input-group-append>
     <b-button variant="outline-success">submit</b-button>
    </b-input-group-append>
  </b-input-group>

    <div v-if="boards.length">
      <table class="table table-bordered table-condensed">
        <colgroup>
          <col :style="{ width: '30%' }" />
          <col :style="{ width: '50%' }" />
          <col :style="{ width: '20%' }" />
        </colgroup>
        <tr>
          <th>작성자</th>
          <th>제목</th>
          <th>날짜</th>
        </tr>

      

        <list-row v-for= "(board,idx) in boards" :key="idx" :board="board"></list-row>
         
     
      </table>
      <div class="d-flex justify-content-center container">
        <nav aria-label="...">
          <ul class="pagination">
            <li v-if="startPage > 1" class="page-item disabled">
              <a
                href="#"
                @click="movePage(startPage - 1)"
                class="page-link"
                tabindex="-1"
                >Previous</a
              >
            </li>

            <li
              class="page-item"
              v-for="i in range(startPage,endPage)"
              v-bind:key="i"
            >
              <a href="#" @click="movePage(i)" class="page-link">{{ i }}</a>
            </li>   
            <li v-if="endPage < totalPage" class="page-item">
              <a
                href="#"
                @click="movePage(endPage + 1)"
                class="page-link"
                tabindex="-1"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div v-else>글이 없습니다.</div>
    <div class="text-right">
      <!-- <button @click="`${movePage(pages.curPage-1)}`" class="btn btn-primary">이전</button>
      <button @click="`${movePage(pages.curPage+1)}`" class="btn btn-primary">다음</button> -->
    </div>

   <button class="btn btn-primary" >등록</button> 
  </div>
  
</template>


<script>

import ListRow from "@/components/Row.vue";
import { mapGetters } from 'vuex';
export default {
  name: "list",
  components: {
    ListRow,
  },
  data: function () {
    return {
      board:[{curpage:"",}],
      // items: [],
      // pages: [],
      // board: "",
      // page: "",
    };
  },
  created() {
    this.$store.dispatch("getBoards",this.board);// list들 받아오기 
    
  },
  computed : {
    ...mapGetters(['boards','startPage','endPage','curPage','totalPage']),
  
  },




  methods :{

    // randomViews() {
    //   return Math.floor(Math.random(10, 100) * 100);
    // },
    // movePage(page) {
    //   boardhttp
    //     .get("/boardMain?page=" + page)
    //     .then(({ data }) => {
    //       this.items = data.bList;
    //       this.pages = data;
    //       console.log(this.pages + " 들어옴");
    //     })
    //     .catch(() => {
    //       alert("에러가 발생했습니다.");
    //     });
    // },
    range(start, end) {
      let list = [];
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    },
  },
};
</script>


<style></style>