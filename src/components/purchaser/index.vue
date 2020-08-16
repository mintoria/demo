<template>
  <div id="index">
    <div id="top">
      <div style="margin-bottom:20px;font-size:25px;">快捷查看</div>
      <router-link to="/purchaser/contracts" class="quick">合同查看</router-link>
      <router-link to="/purchaser/providers" class="quick">供应商查看</router-link>
      <router-link to="/purchaser/items" class="quick">物品查看</router-link>
      <router-link to="/purchaser/wareHouses" class="quick">仓库查看</router-link>
    </div>
    <div id="main"><el-calendar v-model="value"></el-calendar></div>
    
  </div>
</template>
<style type="text/css">
  .quick{
    padding: 25px;
    border: 1px solid black;
    margin-left: 30px;
    display: inline-block;
  }
  #main{
    width:600px;
    margin: 0 auto;
  }
  .el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    height: 50px;
}
</style>
<script type="text/javascript">
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
  export default {
    data(){
      return{
        value: new Date()
      }
    },
    mounted() {
      if(getCookie("userName")=='') return;
      this.open();
    },
    methods: {
       open() {
        const h = this.$createElement;
        this.$notify({
          title: '采购系统',
          message: h('i', { style: 'color: teal'}, '欢迎进入采购管理系统'),
          offset: 200
        });
      }
    }
  }
</script>
