import Vue from "vue";
import Vuex from "vuex";
import boardhttp from "@/util/Boardhttp.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board:{},
    boards:[],
    comment:{},
    comments:[],
    startPage:"",
    endPage:"",
    totalPage:"",
    curPage:"",
  },
  getters:{
    boards(state){
      return state.boards;
    },
    board(state){
      return state.board;
    },
    comment(state){
      return state.comment;      
    },
    comments(state){
      return state.comments;
    },
    startPage(state){
      return state.startPage;
    },
    endPage(state){
      return state.endPage;
    },
    totalPage(state){
      return state.totalPage;
    },
    curPage(state){
      return state.curPage;
    }
  },
  mutations: {
    setComments(){},
    setComment(){},
    setBoard(){},
    setBoards(state,payload){
      state.boards = payload.bList;
    },
    setEndPage(){

    },
    setTotalPage(){

    },
    setStartPage(){

    },
    setCurPage(){

    }
  },
  actions: {
    movePage(page) {
      boardhttp
        .get("/boardMain?page=" + page)
        .then(({ data }) => {
          this.items = data.bList;
          this.pages = data;
          console.log(this.pages + " 들어옴");
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },

    getBoard(context){
      // this.board = "board";            
      if ( this.state.curPage== null) {
        console.log("null");
        this.page = 1;
      } else {
        this.page = this.$route.query.page;
      }

      boardhttp
        .get("/BoardMain?page=" + this.page)
        .then(({ data }) => {
          console.log("enter");
          context.commit("setBoards",data);
          context.commit("setTotalCount",data.totalPage);
          context.commit("setEndPage",data.endPage);
          context.commit("setStartPage",data.startPage);
          context.commit("setCurPage",data.curPage);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });

    },

    randomViews() {
      return Math.floor(Math.random(10, 100) * 100);
    },
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD');
    },
    getFormatDateDetail(regtime) {
      return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    },
  },
});
