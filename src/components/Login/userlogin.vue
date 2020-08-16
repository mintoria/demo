<template>
  <div class="Login">
    <div class="maintitle">采购管理系统</div>
    <div class="kong">    1</div>
    <div class="loginbox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item><div class="title">登录</div></el-form-item>
        <el-form-item label="用户名：" prop="userName" class="col" >
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userPassword">
          <el-input v-model="ruleForm.userPassword" type="password"></el-input>
        </el-form-item>

        <el-form-item style="text-align: left">
          <label>身份:</label>
          <el-radio-group v-model='ruleForm.userIdentity' >
            <el-radio label="warehouse">仓库</el-radio>
            <el-radio label="purchase">采购部</el-radio>
            <el-radio label="finance">财务部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="loginButton" type="info" @click="submitForm('ruleForm')" round="">登录</el-button>
          <el-button class="resetButton" type="info" @click="resetForm('ruleForm')" round="">重置</el-button>
        </el-form-item>
        <el-form-item> <el-button @click="forgetpw" type="text" size="small">忘记密码</el-button></el-form-item>
      </el-form>

    </div>
    <div class="kong"><p>数据库课程设计：采购管理系统</p><p>设计人：张明雪、谭灿东、傅暮云（不分先后）</p></div>
  </div>
</template>

<script>
  import {setCookie,getCookie} from "../../assets/javascript/cookie";

  export default {
    name: "userLogin",
    data(){
      return{
        ruleForm:{
          userName:'',
          userPassword:'',
          userIdentity: '',
        },
        rules: {
          userName: [
            { required: true, message: "请输入用户名", trigger: 'blur' },
          ],
          userPassword: [
            { required: true, message: "请输入密码", trigger: 'change'},
          ]
        },

      }
    },
    mounted() {
      if (getCookie('userName')) {
        this.$router.push("/Userlogin")
      }
    },
    methods: {
      //查找用户名是否存在，并且密码一致
      check() {
        let userName = this.ruleForm.userName;
        let userPassword=this.ruleForm.userPassword;
        let userIdentity=this.ruleForm.userIdentity;
        console.log(userName);
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/user/findByUserNameAndPasswordAndIdentity',
          params: {
            userName:this.ruleForm.userName,
            userPassword:this.ruleForm.userPassword,
            userIdentity:this.ruleForm.userIdentity,
          },

        }).then(response => {
          if (response.status == 200){
            if(response.data==true){
              console.log(this.ruleForm.userIdentity);
              this.$message.success("登录成功");
              setCookie('userName',userName,7);
              // setCookie('userPassword',userPassword,7);
              setCookie('userIdentity',userIdentity,7);
             if(this.ruleForm.userIdentity=="finance")
              this.$router.push('/Home');//跳转语句
              else if(this.ruleForm.userIdentity=="purchase")
             {
               this.$router.push('/purchaser');
             }
             else
             {
               this.$router.push('/WareHousePart');
             }
            }

            else{
              this.$message.error("登录失败");
            }
          }
        }).catch(function (error){
          console.log("failed")
        });
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check();
            //alert('登录成功');
            localStorage.setItem("student",this.ruleForm.userName);

          } else {
            console.log('登录失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // test(){
      //   alert("选中的值为："+this.ruleForm.checked);
      // }
      //忘记密码
      forgetpw(){
        this.$alert("请联系财务部主管修改密码\n联系方式：mintoria_xm@163.com（张小明）")
      }
    }
  }
</script>

<style scoped>
  .col{
    color: black;
  }
  .title{
    font-family: 字魂78号-空灵体;
    font-size:50px;
    text-align: center;
    color: #000000;
  }
  .Login{
    font-family: 字魂73号-江南手书;
    background: url("../../../src/img/10.jpg") center no-repeat fixed;
    position: fixed;
    background-size: cover;
    width: 1445px;
    height: 723px;
    margin-left: -28px;
    padding-top: 20%;
    margin-top: -145px;

  }
  .loginbox{
    color: black;
    width: 400px;
    margin-top: 150px;
    border: 200px;
    margin-left: 25%;
    margin-bottom: 5%;
    text-align: center;
    background-color: rgb(232, 232, 232);
    opacity: 80%;
    padding: 30px 60px 8px 0px;
    box-shadow: #5b5b5b 10px 10px 20px;
    border-radius: 20px;
  }
  .loginButton{
    background-color: #5b5b5b;
    border: none;
    width: 100px;
  }

  .resetButton{
    background-color: #5b5b5b;
    width: 100px;
    border: none;
  }

  .demo-ruleForm{
    text-align: center;
    color: black;
  }

  .forgetPassword{
  //text-align: center;
    margin-left: -70px;
    text-decoration: none;
    color: #050507;
  }

  .studentRegister{
    text-align: center;
    text-decoration: none;
    color: #050507;
  }
  .maintitle{
    margin-left: 250px;
    font-family: 字魂73号-江南手书;
    font-size: 50px;
    margin-top: -80px;
    color: rgba(0, 0, 0, 0.78);
  }
.kong{
  font-family: 黑体;
  font-size: 10px;
  color: #000;
  margin-left: 900px;
  margin-top:-120px;
}
</style>
