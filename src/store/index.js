import Vue from "vue";
import Vuex from "vuex";
import boardhttp from "@/util/Boardhttp.js";
import tokenhttp from "@/util/Tokenhttp.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{},
    token:"",
    board:{},
    boards:[],
    comment:{},
    comments:[],
    startPage:"",
    endPage:"",
    totalPage:"",
    curPage: "",
    aptInfos: [],
    aptStartPage:"",
    aptEndPage:"",
    aptTotalPage:"",
    aptCurPage: "",
  },
  getters:{
    boards(state){
      return state.boards;
    },
    token(state){
      return state.token;
    },
    aptInfos(state) {
      return state.aptInfos;
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
    },
    aptStartPage(state){
      return state.aptStartPage;
    },
    aptEndPage(state){
      return state.aptEndPage;
    },
    aptTotalPage(state){
      return state.aptTotalPage;
    },
    aptCurPage(state){
      return state.aptCurPage;
    },
    userInfo(state){
      return state.userInfo;
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
    },
    setAptEndPage(state, payload){
      state.EndPage = payload;
    },
    setAptTotalPage(state, payload){
      state.totalPage = payload;
    },
    setAptStartPage(state ,payload){
      state.startPage = payload;
    },
    setAptCurPage(state, payload){
      state.curPage = payload;
    },
    setaptInfos(state, payload) {
      state.aptInfos = payload.bList;
    },
    setUserInfo(state,payload){
      state.userInfo = payload;
    },
    setToken(state,payload){
      state.token = payload;
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
    },    getAptInfos(context, payload){
      // this.board = "board";            
      if ( payload.curPage== null) {
        console.log("null");
        payload.curPage = 1;
      } 
      boardhttp
        .get("/mvhouseinfo?page=" + payload.curPage)
        .then(({ data }) => {
          console.log("getAptInfos");
          context.commit("setBoards",data);
          context.commit("setAptTotalPage",data.totalPage);
          context.commit("setAptEndPage",data.endPage);
          context.commit("setAptStartPage",data.startPage);
          context.commit("setAptCurPage",payload.curPage);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });

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
    postBoard(context, payload) {
      boardhttp
        .post("/board",payload)
        .then(() => {
        
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    deleteBoard(context,payload){
      console.log(payload.bnum);
      boardhttp
      .delete("/board?num="+payload.bnum)
      .then(()=>{
        alert("삭제 되었습니다!");
      })
      .catch(()=>{
        alert("게시글 삭제 중 에러 발생");
      })
    },
    putBoard(context,payload){
      boardhttp
      .put("/board",payload)
      .then(()=>{
        alert("수정 완료");
      })
      .catch(()=>{
        alert("modify error");
      })
    },
    
  login(context,payload){
    boardhttp
    .post("/login", payload)
    .then(({data})=>{
      console.log("데이터 :" +JSON.stringify(data));
      context.commit("setToken",data.token);
      this.dispatch('getUser',payload);
    })
  },
  getUser(context,payload){
    boardhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    console.log('um......');
    boardhttp
    .post("/getUser",payload)
    .then(({data})=>{
      context.commit("setUserInfo",data);
      console.log("***"+context.state.userInfo);
    })
  },
  signUp(context,payload){
    console.log(payload);
    boardhttp
    .post("/signUp",payload)
    .then(()=>{
    });
  },
  modifyUser(context,payload){
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .put("/modify",payload)
    .then(({data})=>{
      context.commit("setUserInfo",{data});
    })
  },
  deleteUser(context){
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .delete("/delete?userid=",context.state.userInfo.userId)
    .then(()=>{
      console.log(context.state.userInfo.userId);
      context.commit("setUserInfo",null);
      context.commit("setToken",null);
    })
  },
  logout(context){
    context.commit("setUserInfo",null);
    context.commit("setToken",null);
  }


    
    // getFormatDate(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD');
    // },
    // getFormatDateDetail(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    // },
  },
});
