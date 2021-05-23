
<template>
<div>
  
  	<div v-if="aptInfos.bList.length==0">
				<div class=" bd-sidebar">
					<h4 class=" font-weight-bold">매매 정보</h4>
					<ul class="nav" id="sidebar_deal_list ">
						<li class="border"><a>해당하는 건물이 없습니다.<br> <br>
						</a></li>
					</ul>
					<br>
				</div>
            </div>
    <div v-else>
    <h4 class=" font-weight-bold">매매 정보</h4>
				
             <table class="table table-bordered table-condensed">
                <!-- <colgroup>
                  <col :style="{ width: '30%' }" />
                  <col :style="{ width: '50%' }" />
                  <col :style="{ width: '20%' }" />
            </colgroup> -->
            <tr>
             
            </tr>
							<apt-row v-for="(apt,idx) in aptInfos.bList" :key="idx" :apt="apt">
							</apt-row>
              </table>
				
    </div>

</div>		
  
  
</template>


<script>


//import { mapGetters } from 'vuex';
import AptRow from '../components/AptRow.vue';
export default {
  name: "list",
  components: {
    AptRow,
  },
   props: {
    aptInfos:{type:Object},
  },
    AptRowdata: function () {
    return {
      apt:[{curpage:"",}],
    };
  },
  created() {
    //this.$store.dispatch("getAptInfo",this.apt);// list들 받아오기 
    
  },
  computed : {
   // ...mapGetters(['aptInfos','aptStartPage','aptEndPage','aptCurPage','aptTotalPage']),
  
  },




  methods :{
    write(){
      this.$router.push("write");
    },
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


<style>
body{

}

</style>