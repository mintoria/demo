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
      <el-table
        :header-cell-style="{'text-align':'center' ,'color':'#000'}"
        :cell-style="{'text-align':'center'}"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}"
        class="table"
        border>
        <el-table-column
          fixed
          prop="id"
          label="合同号"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品"
          width="150">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="univalent"
          label="单价"
          width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="account"
          label="总额"
          width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商"
          width="150">
        </el-table-column>
        <el-table-column
          prop="warehouseid"
          label="入驻仓库"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index,tableData)" type="text" size="small">生成账单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
    export default {
        name: "show",
      data(){
        return{
          tableData:[{}],
          test:'',
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
      },
      mounted(){
        if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="finance") {
          this.$router.replace('/userlogin');
        }
        else {
          // 执行后续操作
          this.test = getCookie("userName");
          let st="";
          this.$ajax({
            method: 'get',
            url: 'http://localhost:8085/purchaser/contract/findAll',
          }).then(response => {
            console.log(response.data);
            if (response.status == 200) {

              this.tableData = new Array();
              for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].id);
                if(response.data[i].status==null)
                  st="未处理";
                else
                  st=response.data[i].status;
                // 修改的内容
                var item = {
                  id: response.data[i].id,
                  date: response.data[i].date,
                  product: response.data[i].items.name,
                  quantity: response.data[i].number,
                  univalent: response.data[i].items.price,
                  account: response.data[i].number*response.data[i].items.price,
                  supplier: response.data[i].provider.name,
                  warehouseid: response.data[i].wareHouses.id,
                  status:st,
                };
                this.tableData.push(item);


              }
            }
          }).catch(function (error) {
            console.log("failed")
          });
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
        handleClick(index,rows){
          if(this.tableData[index].status=="未处理")
          {
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/income/addIncome',
              params: {
                contract:this.tableData[index].id,
                account: this.tableData[index].account,
              },
            }).then().then(response => {
              if (response.status == 200) {
                this.setStatus(index);
                this.$message.success("添加账单成功");
              }
              else{
                this.$message.error("添加账单失败");
              }

            }).catch(function (error){
              console.log("failed")
            });
          }
          else
          {
            this.$message.error("此采购信息已处理");
          }


  },
        exit() {
          delCookie("userName");
          delCookie("userIdentity");
          this.$router.push('/userlogin');
        },
        setStatus(index){
          this.$ajax({
            method:'get',
            url:'http://localhost:8085/purchaser/contract/setStatus',
            params: {
              id:this.tableData[index].id,
            },
          }).then().then(response => {
            if (response.status == 200) {
              this.$message.success("状态改变成功");
              this.tableData[index].status="已处理";
            }
            else{
              this.$message.error("状态改变失败");
            }

          }).catch(function (error){
            console.log("failed")
          });
            },
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
  .lan{
    font-family: 字魂7号-温暖童稚体;
    /*text-align: center;*/
    font-size: 20px;
    font-weight: 700;
    color: rgb(50, 91, 123);
  }
  .block{
    color: black;
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
</style>
