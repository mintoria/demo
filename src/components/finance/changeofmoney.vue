<template>
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
    <div class="car">
      <el-row>

        <el-col span="5.5"><label>批量删除：（删除选中日期及之前的数据）</label></el-col>
        <el-col span="4.5"><el-date-picker
          v-model="value1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker> </el-col>
        <el-col span="10"><el-button  type=primary @click="deletebydate">确定</el-button> </el-col></el-row>
    <el-table
      :header-cell-style="{'text-align':'center' ,'color':'#000'}"
      :cell-style="{'text-align':'center'}"
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'id', order: 'ascending'}"
      class="table"
    >
      <el-table-column
        prop="id"
        label="账单号"
        sortable
        width="210">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="210">
      </el-table-column>
      <el-table-column
        prop="contractid"
        label="合同号"
        sortable
        width="230">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="支出金额"
        sortable
        width="230">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    </div>
  </div>
</template>

<script>
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
    export default {
        name: "changeofmoney",
      data(){
          return {
            tableData: [{}],
            value1:"",
            test:'',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
      },
      mounted(){
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
        }
      },
      methods:{
          loadingdata(){
            this.$ajax({
              method: 'get',
              url: 'http://localhost:8085/income/findAll',
            }).then(response => {
              console.log(response.data);
              if (response.status == 200) {

                this.tableData = new Array();
                for (var i = 0; i < response.data.length; i++) {
                  console.log(response.data[i].id);
                  // 修改的内容
                  var item = {
                    id: response.data[i].id,
                    date: response.data[i].date,
                    contractid: response.data[i].contract.id,
                    amount: response.data[i].amount
                  };
                  this.tableData.push(item);

                }
              }
            }).catch(function (error) {
              console.log("failed")
            });
          },
        deletebydate(){
          console.log(this.value1);

          this.$ajax({
            method:'get',
            url:'http://localhost:8085/income/deleteincomebydate',
            params: {
              date:this.value1,
            },
          }).then(response => {
            if (response.status == 200) {
              this.$message.success("删除成功");
              this.loadingdata();
              // if(this.ruleForm.userIdentity==="2")
              //  this.$store.commit('$_setStorage', {user: this.ruleForm.userName})
              //  this.$store.commit('$_setLogin', '1')
            }
            else{
              this.$message.error("删除失败");
            }

          }).catch(function (error){
            console.log("failed")
          });

        },
        deleteRow(index,rows)
        {
          console.log(this.tableData[index] .id);
          this.$confirm('确定要删除账单"'+this.tableData[index].id+'"?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          this.$ajax({
            method:'get',
            url:'http://localhost:8085/income/deleteincomebyid',
            params: {
              id:this.tableData[index] .id,
            },
          }).then(response => {
            if (response.status == 200) {
              this.$message.success("删除成功");

            }
            else{
              this.$message.error("删除失败");
            }

          }).catch(function (error){
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
        exit() {
          delCookie("userName");
          delCookie("userIdentity");
          this.$router.push('/userlogin');
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
    font-size: 25px;
    width: 100%;
    height: 500px;
    padding-top: 230px;
    margin-top: -148px;;

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
  .block{
    color: black;
  }
</style>
