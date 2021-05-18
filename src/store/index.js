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
    setBoard(state, payload){
      state.board = payload;
    },
    setBoards(state,payload){
      state.boards = payload.bList;
    },
    setEndPage(state, payload){
      state.EndPage = payload;
    },
    setTotalPage(state, payload){
      state.totalPage = payload;
    },
    setStartPage(state ,payload){
      state.startPage = payload;
    },
    setCurPage(state, payload){
      state.curPage = payload;
    }
  },
  actions: {
    movePage(context, page) {
      boardhttp
      .get("/BoardMain?page=" + page)
      .then(({ data }) => {
        console.log("movepage");
        context.commit("setBoards",data);
        context.commit("setTotalCount",data.totalPage);
        context.commit("setEndPage",data.endPage);
        context.commit("setStartPage",data.startPage);
        context.commit("setCurPage",page);
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });
    },
    getBoard(context, payload){
      boardhttp
      .get("/board?num=" + payload)
      .then(({data})=>{
        context.commit("setBoard",data);
      })
    },



    getBoards(context, payload){
      // this.board = "board";            
      if ( payload.curPage== null) {
        console.log("null");
        payload.curPage = 1;
      } 
      boardhttp
        .get("/BoardMain?page=" + payload.curPage)
        .then(({ data }) => {
          console.log("getBoards");
          context.commit("setBoards",data);
          context.commit("setTotalPage",data.totalPage);
          context.commit("setEndPage",data.endPage);
          context.commit("setStartPage",data.startPage);
          context.commit("setCurPage",payload.curPage);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });

    },

    randomViews() {
      return Math.floor(Math.random(10, 100) * 100);
    },
    // getFormatDate(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD');
    // },
    // getFormatDateDetail(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    // },
  },
});
