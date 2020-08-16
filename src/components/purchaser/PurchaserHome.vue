<template>
  <div class="wrapper">
    <pur-Header></pur-Header>
    <pur-Sidebar></pur-Sidebar>
    <div class="content">
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
    import purHeader from './Header.vue';
    import purSidebar from './Sidebar.vue';
    import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";

    export default {
      components: {
        purHeader, purSidebar
      },
      mounted() {
        if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="purchase") {
          this.$router.replace('/userlogin');
        } else {
          // 执行后续操作
          this.test = getCookie("userName");
        }
      },
      computed: {
          isLogin () {
            this.userName = getCookie("userName");
            return this.userName;
          }
      }
    }
</script>
<style scoped>
    .content{
        background: none repeat scroll 0 0 #fff;
        position: absolute;
        left: 200px;
        right: 0;
        top: 75px;
        bottom:0;
        width: auto;
        padding:40px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    .wrapper{
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 0px;
      /*position: absolute;*/
    }
    *{margin:0;padding:0;}
    a{text-decoration: none}
</style>
