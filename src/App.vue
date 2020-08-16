<template>
  <div id="app">


          <!-- Body -->
          <router-view></router-view>


  </div>
</template>

<script>
export default {
  name: 'App',
  //跳转
  methods: {

  }
}
</script>

<style>

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #050507;*/
  /*background-color: aliceblue;*/
}



/*.el-aside {*/
  /*!*background-color: #D3DCE6;*!*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 200px;*/
/*}*/

.el-main {
  /*background-color: aliceblue;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
  /*top:0; !* 距离窗口顶部距离 *!*/
  /*left:0; !* 距离窗口左边的距离 *!*/
  /*width:100%; !* 宽度设置为100% *!*/
  margin: 0;
  padding: 0;
}

/*body > .el-container {*/
  /*margin-bottom: 40px;*/
/*}*/

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
  /*line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
  /*line-height: 320px;*/
/*}*/

</style>
