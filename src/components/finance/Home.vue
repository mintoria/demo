<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="home">
    <el-row class="title"><i class="el-icon-loading" ></i>财务部</el-row>
    <!-- 导航栏 -->
    <el-row>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/Home"><div class="lan"><i class="el-icon-place"></i>首页</div> </router-link></el-menu-item>
        <el-submenu index="2">
          <template slot="title"><div class="lan"><i class="el-icon-tickets"></i>信息浏览</div></template>
          <el-menu-item index="2-1"><router-link to="/BuyShow"><div class="lan"><i class="el-icon-shopping-cart-2" ></i>采购信息</div></router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/WarehousingInformation"><div class="lan"><i class="el-icon-s-unfold"></i>入库信息</div></router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><router-link to="/MoneyChange"><div class="lan"><i class="el-icon-search"></i>账目流动</div></router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/edituser"><div class="lan"><i class="el-icon-message"></i>用户表编辑</div></router-link>
        </el-menu-item>
        <el-submenu index="5">
            <template slot="title">
              <div class="block">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
             {{test}}
            </div></template>
          <el-menu-item index="5-1" @click="exit"><div class lan="lan">退出登录</div></el-menu-item>
        </el-submenu>

      </el-menu>

    </el-row>
    <el-row>
      <el-carousel interval="5000" arrow="always" class="car" >
        <!--遍历图片地址,动态生成轮播图-->
        <el-carousel-item v-for="item in img_list" :key="index" stycle="margin-left: 0px;margin-top: 0px; width: 1280px;height: 427px;">
          <h3><img :src=item.idView alt="" width="1300px"></h3>
        </el-carousel-item>
      </el-carousel>
    </el-row>

    <div class="footer">
      <p>财务部总负责人：张明雪</p><p>有问题请及时联系</p><p>联系方式：mintoria_xm@163.com</p>

    </div>
    </div>

</template>


<script>
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
    export default {
      name: "Home",
      data() {
        selected:'select'
        show3:false
        return {
          img_list:[
            {id:0,idView:require("../../img/13.png")},
            {id:1,idView:require("../../img/14.png")}     
          ],
          value: 'all',
          input: '',
          test:'',
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
      },
      mounted () {
        if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="finance") {
          this.$router.replace('/userlogin');
        } else {
          // 执行后续操作
          this.test = getCookie("userName");
        }
      },
      computed: {
        isLogin () {
          // return this.$store.getters.getLogin;
          this.userName = getCookie("userName");
          // console.log(this.userId);
          return this.userName;
        }
      },
    methods: {
      exit() {
        delCookie("userName");
        // delCookie("userPassword");
        delCookie("userIdentity");
        this.$router.push('/userlogin');
      }
    },
    }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  .search{
    text-align: center;
  }
  .block{
    color: black;
  }
.title{
  font-family: 字魂78号-空灵体;
  font-size: 50px;
  font-weight: bold;
  text-align: left;
  /*position: fixed;*/
  margin-top: -100px;
  color: rgb(95, 140, 190);

}
  .footer{
    font-size: 10px;
    color: black;
    text-align: center;
    margin-top:400px;
    position: fixed;
    width: 100%;
  }
  .car{
    position:fixed;
    width: 100%;
    height: 500px;
    padding-top: 226px;
    margin-top: -198px;;
  }
  .home{
    /*background: url("../../../src/img/10.jpg") center no-repeat fixed;*/
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 500px;
    margin-left: -8px;
    padding-top: 255px;
    margin-top: -145px;;
    background-color: aliceblue;

  }
  .lan{
    font-family: 字魂7号-温暖童稚体;
    /*text-align: center;*/
    font-size: 20px;
    font-weight: 700;
    color: rgb(50, 91, 123);
  }
  .el-menu{
    background-color: rgba(132, 187, 255, 0.36);
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    height:50px; /* 高度 */
    margin-top: -4px;
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }


  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #050507;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .gtext{
    font-family:"微软雅黑 Light";
    font-size: 16px;
    font-weight: 700;
    color: #090306;

  }
  .logo{
    font-family:"幼圆";
    text-align: center;
    font-size: 30px;
    /*font-weight: 700;*/
    color: #f1f8ff;
  }
  .el-table{
    background-color: rgba(240, 248, 255, 0);
  }
  .el-table thead,.el-table
  {
    font-family:"幼圆";
    color: rgba(0, 0, 0, 0.99);
  }
  .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: rgba(240, 248, 255, 0);
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: rgba(0, 0, 0, 0);
  }
  .el-icon-reading{
    font-size: 30px;
    color: #f1f8ff;
  }
  .el-submenu{
    /*width: 10px;*/
    height: 10px;
  }

</style>
