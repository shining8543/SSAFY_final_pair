import Vue from "vue";
import Vuex from "vuex";
import VueSession from 'vue-session';
import boardhttp from "@/util/Boardhttp.js";
import tokenhttp from "@/util/Tokenhttp.js";


Vue.use(Vuex);
Vue.use(VueSession);
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
    users:[],
    station: {},
    deallist: {},
    isLogin:"",
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
    },
    users(state){
      return state.users;
    },
    station(state){
      return state.station;
    },
    deallist(state) {
      return state.deallist;
    },
    isLogin(state){
      return state.isLogin;
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
    },
    setUsers(state, payload){
      state.users = payload;
    },
    setStation(state, payload){
      state.station = payload;
    },
    setDealList(state, payload) {
      state.deallist = payload;
    },
    setIsLoginTrue(state){
      state.isLogin = true;
    },
    setIsLoginfalse(state){
      state.isLogin = false;
    },

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
  setToken(context,payload){
    context.commit("setToken",payload);
  },
  login(context,payload){
    boardhttp
    .post("/login", payload)
    .then(({data})=>{
      console.log("데이터 :" +JSON.stringify(data));
      context.commit("setToken",data.token);
      context.commit("setIsLoginTrue");
      boardhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      console.log(context.state.isLogin);
      this.dispatch('getUser',payload);
      Vue.prototype.$session.set("token",data.token);
    })
  },
  getUser(context,payload){
    console.log(payload);
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .post("/getUser",payload)
    .then(({data})=>{
      context.commit("setUserInfo",data);
      console.log("***"+context.state.userInfo);
      Vue.prototype.$session.set("loginId",data.userId);
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
      context.commit("setUserInfo",data);
    })
  },
  deleteUser(context){
    //tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .delete("/delete?userId="+context.state.userInfo.userId)
    .then(()=>{
      console.log(context.state.userInfo.userId);
      context.commit("setUserInfo",null);
      context.commit("setToken",null);
      this.dispatch('logout');
      
    })
  },
  logout(context){
    context.commit("setUserInfo",null);
    context.commit("setToken",null);
    context.commit("setIsLoginFalse");
    Vue.prototype.$session.remove("token");
    Vue.prototype.$session.remove("loginId");
  },
  getLoginState(context){
    let loginId ={};
    loginId.userId =  Vue.prototype.$session.get("loginId");
    let token =  Vue.prototype.$session.get("token");

    tokenhttp.defaults.headers['Authorization']="Bearer " + token;

    if(loginId != null && token != null){
      context.commit("setIsLoginTrue");
      context.commit("setToken",token);
      this.dispatch("setToken",token);      
      this.dispatch('getUser',loginId);
    }
  },
  getUserList(context){
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .get("userlist")
    .then(({data})=>{
      console.log(data);
      context.commit("setUsers",data);      

    })
  },
  postUser(context,payload){    
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .post("/admin",payload)
    .then(({data})=>{
      alert("등록 완료");
      context.commit("setUsers",data);
    })
  },
  adminDeleteUser(context,payload){
    console.log(payload);
    tokenhttp
    .delete("/admin/"+payload.userId)
    .then(({data})=>{
      alert("삭제 완료");
      context.commit("setUsers",data);
    })
  },
  adminPutUser(context,payload){
    console.log(payload);
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .put("/admin",payload)
    .then(({data})=>{
      alert("수정 완료");
      context.commit("setUsers",data);
    })
  },
    getStation(context, payload) {
    console.log(context);
    console.log(payload);
    console.log("payload 들옴");
    context.commit("setStation",payload);
    },
    getdeallist(context, payload) {
      boardhttp.get("house/searchtype?type=1&area="+payload).then(({ data }) => {
        context.commit("setDealList",data);
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });
    },

    
    // getFormatDate(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD');
    // },
    // getFormatDateDetail(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    // },
  },
});
