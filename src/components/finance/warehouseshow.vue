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
        border
        >
        <el-table-column
          fixed
          prop="id"
          label="入库号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="productid"
          label="物品号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="contractid"
          label="合同号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="houseid"
          label="仓库号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="dialog(scope.$index)" type="text" size="small">对此信息有疑问</el-button>
            <!--留言面板-->
            <el-dialog title="发送邮件" :visible.sync="dialogFormVisible" modal="false" append-to-body="true">
              <el-form :model="form">
                <el-form-item label="发送人" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" placeholder="请填写姓名" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="收件仓库" :label-width="formLabelWidth">
                  <el-input v-model="form.houseid" autocomplete="off" placeholder="请填写仓库号" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="留言内容" :label-width="formLabelWidth">
                  <el-input v-model="form.message" autocomplete="off" type="textarea":rows="8" show-word-limit=true size="max-h-full"placeholder="请填写留言内容"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleClick(scope.$index, tableData)">确 定</el-button>
              </div>
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
        name: "warehouseshow",
      data(){
          return{
            tableData:[{}],
            dialogFormVisible:false,
            form:{
              name: '',
              message: '',
              houseid:'',
              delivery: true,
              type: [],
              resource: '',
              desc: ''
            },
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
          this.$ajax({
            method:'get',
            url:'http://localhost:8085/iOInfo/findAllIOInfo',

          }).then(response => {
            console.log(response.data);
            if (response.status == 200){

              this.tableData = new Array();
              for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].id);
                // 修改的内容
                var item = {
                  id: response.data[i].id,
                  date: response.data[i].date,
                  productid: response.data[i].items.name,
                  quantity: response.data[i].number,
                  contractid: response.data[i].contract.id,
                  houseid:response.data[i].wareHouses.id,
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
          console.log(this.userName);
          // console.log(this.userId);
          return this.userName;
        }
      },
      methods:{
          dialog(index){
            this.dialogFormVisible = true;
            this.form.houseid=this.tableData[index].houseid;
            this.form.name=this.userName;
          },
        handleClick(index, rows){

          this.$ajax({
            method:'get',
            url:'http://localhost:8085/message/addMessage',
            params: {
              userName:this.form.name,
              houseId:this.form.houseid,
              Message:this.form.message+"（入库号：\n"+this.tableData[index].id+")",
            },
          }).then(response => {
            if (response.status == 200) {
              console.log(response.data);
              this.$message.success("添加成功");
              this.form.message=null;
              this.dialogFormVisible=false;
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
          this.dialogFormVisible=true;
        },//(scope.$index, tableData)"(index, rows)
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
