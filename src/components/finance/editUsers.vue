<template xmlns:el-col="http://www.w3.org/1999/xhtml">
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

    <div class="car" id="top">
      <el-row>
        <el-col :span="2">
          <el-button type="primary" style="color: aliceblue" @click="dialogFormVisible = true">用户添加</el-button></el-col>

        <el-col :span="4"><div  class="search" style="display: inline-block"> 搜索：
          <el-input v-model="search" style="display: inline-block;width: 300px;"
                    placeholder="请输入搜索内容" >
          </el-input></div>
        </el-col>
        <el-dialog title="添加新用户信息" :visible.sync="dialogFormVisible" modal="false" append-to-body="true">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户密码：" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入：" prop="newpassword">
              <el-input  type="password" v-model="ruleForm.newpassword" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="用户所属：">
              <el-radio-group v-model="ruleForm.identity">
                <el-radio label="warehouse"></el-radio>
                <el-radio label="purchase"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="仓库号" prop="warehouseid">
              <el-input v-model="ruleForm.warehouseid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="adduser">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>

        </el-dialog>
      </el-row>

        <!--用户表-->
      <el-table
        :header-cell-style="{'text-align':'center' ,'color':'#000'}"
        :cell-style="{'text-align':'center'}"
        :data="tables"
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}"
        class="table"
      >
        <el-table-column
          prop="id"s
          label="用户ID"
          sortable
          width="210">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          sortable
          width="210">
        </el-table-column>
        <el-table-column
          prop="password"
          label="用户密码"
          width="230">
        </el-table-column>
        <el-table-column
          prop="identity"
          label="用户所属"
          sortable
          width="230">

        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="formatter(scope.$index,tableData)"
            type="text" size="small"
            >详情</el-button>
            <el-button
              @click="shownp(scope.$index, tableData)"
              type="text"
              size="small">
              修改密码
            </el-button>
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-dialog title="修改密码" :visible.sync="dialogForm" modal="false" append-to-body="true" destroy-on-close="true">
              <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名：" prop="name">
                  <el-input v-model="ruleForm1.name" autocomplete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户密码：" prop="password">
                  <el-input  v-model="ruleForm1.password" autocomplete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                  <el-radio-group v-model="ruleForm1.newpw">
                    <el-input  v-model="ruleForm1.newpw" autocomplete="off"></el-input>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateRow(scope.$index, tableData)">提交</el-button>
                  <el-button @click="dialogForm = false">取 消</el-button>
                </el-form-item>
              </el-form>

            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>

    </div>
</template>

<script>
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
    export default {
        name: "editUsers",

      data() {
        var checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空!'));
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }

        };
        var validateNewPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          }
          if(value!==this.ruleForm.password){
            callback(new Error('密码不一致'));
          }

        };
        var validatehouseid = (rule, value, callback) => {
          if(this.ruleForm.identity=="warehouse")
          {
            if (value === '') {
              callback(new Error('仓库号不可为空'));
          }
          }
        };
        return {
         tableData:[{}],
          index:'',
          dialogFormVisible: false,
          dialogForm:false,
          ruleForm: {
            name: '',
            password: '',
            newpassword:'',
            identity: 'warehouse',
            warehouseid:'',
            delivery: false,
          },
          ruleForm1:{
            name:'',
            password:'',
            newpw:'',

          },
          rules: {
            name: [
              { validator: checkName, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            warehouseid: [
              { validator: validatehouseid, trigger: 'blur' }
            ],
            newpw:[
              {validator: validatePass, trigger: 'blur'}
            ],
            newpassword:[
              {validator:validateNewPass,trigger:'blur' }
            ]
          },
          test:'',
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          search:'',
        }
      },
      mounted(){
          //用户状态验证
        if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="finance") {
          this.$router.replace('/userlogin');
        } else {
          // 执行后续操作
          this.test = getCookie("userName");
          this.loadingdata();
        }
      },
      computed: {
        isLogin () {
          // return this.$store.getters.getLogin;
          this.userName = getCookie("userName");
          // console.log(this.userId);
          return this.userName;
        },
        //模糊查询
        tables() {
          const search = this.search;
          if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
            return this.tableData.filter(data => {
              // some() 方法用于检测数组中的元素是否满足指定条件;
              // some() 方法会依次执行数组的每个元素：
              // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
              // 如果没有满足条件的元素，则返回false。
              // 注意： some() 不会对空数组进行检测。
              // 注意： some() 不会改变原始数组。
              return Object.keys(data).some(key => {
                // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                return String(data[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.tableData;
        },
      },
      methods: {
          //加载数据
          loadingdata(){
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/user/findAll',

            }).then(response => {
              console.log(response.data);
              if (response.status == 200){

                this.tableData = new Array();
                for(var i=1;i<response.data.length;i++ )
                {
                  console.log(i);
                  // 修改的内容
                  var item = {
                    id:response.data[i].userId,
                    name:response.data[i].userName,
                    password:response.data[i].userPassword,
                    identity:response.data[i].userIdentity
                  };

                  this.tableData.push(item);


                }
              }
            }).catch(function (error){
              console.log("failed")
            });
          },
        //添加用户
          adduser(){
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/user/addUser',
              params: {
                userName:this.ruleForm.name,
                userPassword:this.ruleForm.password,
                userIdentity:this.ruleForm.identity,
                warehouseid: this.ruleForm.warehouseid,
              },
            }).then(response => {
              if (response.status == 200) {
                console.log(response.data.warehouseid);
                this.$message.success("添加成功");
                this.resetForm('ruleForm');
                this.dialogFormVisible=false;
                this.loadingdata();
                // if(this.ruleForm.userIdentity==="2")
                //  this.$store.commit('$_setStorage', {user: this.ruleForm.userName})
                //  this.$store.commit('$_setLogin', '1')
              }
              else{
                this.$message.error("添加失败");
              }

            }).catch(function (error){
              console.log("failed")
            });
          },
    //删除用户数据
        deleteRow(index, rows) {
            console.log(this.tableData[index] .id);
          this.$confirm('确定要删除用户"'+this.tableData[index].name+'"?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$ajax({
              method: 'get',
              url: 'http://localhost:8085/user/deleteUser',
              params: {
                userId: this.tableData[index].id,
                userIdentity: this.tableData[index].identity,
              },
            }).then(response => {
              if (response.status == 200) {
                this.$message.success("删除成功");

              } else {
                this.$message.error("删除失败");
              }

            }).catch(function (error) {
              console.log("failed")
            });
            rows.splice(index, 1);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //显示仓库号
        formatter(index,rows) {
            console.log(this.tableData[index].identity);
          if(this.tableData[index].identity=="warehouse")
          {
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/user/findhouseId',
              params: {
                userId:this.tableData[index].id,
              },
            }).then(response => {
              if (response.status == 200) {
                console.log(response.data[0]);
                this.$alert(this.tableData[index].name+" 管理仓库为：仓库"+response.data[0]);
                // if(this.ruleForm.userIdentity==="2")
                //  this.$store.commit('$_setStorage', {user: this.ruleForm.userName})
                //  this.$store.commit('$_setLogin', '1')
              }

            }).catch(function (error){
              console.log("failed")
            });
          }
          else
          {
            this.$alert(this.tableData[index].name+" 所属部门为：采购部");
          }

        },
      //添加用户表单验证
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.adduser();
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //重置按钮
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //用户退出登录
        exit() {
          delCookie("userName");
          delCookie("userIdentity");
          this.$router.push('/userlogin');
        },
        //修改密码
        updateRow(index,rows) {
          console.log(index);
          let paw=this.ruleForm1.newpw;
          let i=this.index;
          this.$ajax({
            method:'get',
            url:'http://localhost:8085/user/updateUser',
            params: {
              userName:this.ruleForm1.name,
              userPassword: this.ruleForm1.newpw,
            },
          }).then(response => {
            if (response.status == 200) {

              this.$message.success("修改成功");
              this.tableData[i].password = paw;
              this.ruleForm1.newpw=null;
              this.dialogForm = false;
            }

          }).catch(function (error){
            console.log("failed")
          });

        },
        //修改密码表单显示
        shownp(index,rows) {
            this.index=index;
          console.log(this.tableData[index].identity);
          this.dialogForm=true;
          this.ruleForm1.name=this.tableData[index].name;
          this.ruleForm1.password=this.tableData[index].password;

        }
      },
    }
</script>

<style scoped>
  .title{
    font-family: 字魂78号-空灵体;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
    /*position: fixed;*/
    margin-top: -100px;
    color: rgb(95, 140, 190);

  }
  .home{
    /*background: url("../../../src/img/10.jpg") center no-repeat fixed;*/
    background-size: cover;
    position:absolute;
    width: 100%;
    height: 500px;
    margin-left: -8px;
    padding-top: 255px;
    margin-top: -145px;;
    background-color: aliceblue;

  }
  .car{
    /*position:fixed;*/
    font-family: 幼圆;
    width: 100%;
    height: 500px;
    padding-top: 226px;
    margin-top: -148px;;

  }
  .table{
    color: #000;

    text-align: center;
  }
  el-table td,.building-top .el-table th.is-leaf {
    border-bottom:  1px solid #000000;
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
  .search{
    margin-left:850px;
    margin-top: -10px;
  }
  .el-input__inner:hover {
    border-color: #000000;
  }

</style>
<style>
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #8e8e8e;}
  .block{
    color: black;
  }
</style>
