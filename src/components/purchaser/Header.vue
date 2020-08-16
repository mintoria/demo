<template>
    <div class="header">
        <div class="logo">采购部门</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../assets/user-logo.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
    export default {
        data() {
            return {
                username: '小明'
            }
        },
        mounted () {
            this.username = getCookie("userName");
            if(getCookie("userName")=='') this.username='小明';
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    delCookie("userName");
                    delCookie("userIdentity");
                    this.$router.push('/userlogin');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 75px;
        font-size: 22px;
        line-height: 75px;
        background:#c5ced6;
      margin-top: -8px;
      margin-left: -8px;
    }

    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
