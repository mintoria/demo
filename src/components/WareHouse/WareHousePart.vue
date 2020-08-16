<!-- 布局 -->
<template >
  <div class="home1">
  <el-container>
    <el-header>
      <div class="sub"> 仓库 {{wareHouses.id}}</div>
      <!-- cookie和session处理 -->
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
    </el-header>
    <el-container>
      <!--<el-aside width="200px">-->

      <!--</el-aside>-->
      <el-main>
        <!-- 横向菜单选择tab -->
        <el-tabs v-model="activeName" type="border-card" style="color: black;" >
          <el-tab-pane label="物品信息检索" name="first">
            <!-- 物品查询表单 -->
            <el-form :inline="true" :model="itemSelect" :rules="itemRule" ref="itemSelect" class="demo-form-inline">
              <el-form-item label="物品号" prop="id">
                <el-input v-model.number="itemSelect.id" placeholder="物品号"></el-input>
              </el-form-item>
              <el-form-item label="物品名" >
                <el-input v-model="itemSelect.name" placeholder="物品名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="selectItem('itemSelect')">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- 物品结果表格 -->
            <el-table :data="items" style="width: 100%;margin:0px auto;" height="250">
              <el-table-column prop="id" label="物品号" width="200"></el-table-column>
              <el-table-column prop="name" label="物品名" width="200"></el-table-column>
              <el-table-column prop="unit" label="单位" width="200"></el-table-column>
              <el-table-column prop="number" label="数量" width="200"></el-table-column>
              <el-table-column prop="price" label="单价" width="200"></el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination @current-change="selectItem" :current-page.sync="itemSelect.page"
                           :page-size="10" :pager-count="11" layout="prev, pager, next" :total="itemSelect.total"></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="采购合同列表" name="third">
            <!-- 采购合同查询按钮 -->
            <el-form :inline="true" :model="contract" ref="contract" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="selectContract">查询采购合同</el-button>
              </el-form-item>
            </el-form>
            <!-- 采购合同结果表格 -->
            <el-table :data="contract.tableData" style="width: 100%;margin:0px auto; text-align: center" v-loading="contract.loading" element-loading-text="拼命加载中" @row-click="showDetail" >
              <el-table-column prop="id" label="合同编号" width="200"></el-table-column>
              <el-table-column prop="date" label="日期" width="200" ></el-table-column>
              <el-table-column prop="theitem" label="产品" width="200"></el-table-column>
              <el-table-column prop="number" label="数量" width="200"></el-table-column>
              <el-table-column prop="theprovider" label="供应商" width="200"></el-table-column>
              <el-table-column prop="warehouse" label="仓库名" width="200"></el-table-column>
            </el-table>
            <el-pagination @current-change="selectContract(val)" :current-page="contract.currentPage"
                           layout="total, prev, pager, next" :total="contract.total"></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="入库信息管理" name="second">
            <!-- 出入库信息查询表单 -->
            <el-form :inline="true" :model="iOInfoSelect" :rules="iOInfoRule" ref="iOInfoSelect" class="demo-form-inline" >
              <el-form-item label="入库单号" prop="id">
                <el-input v-model.number="iOInfoSelect.id" placeholder="入库单号"></el-input>
              </el-form-item>
              <el-form-item label="选择日期">
                <el-date-picker v-model="iOInfoSelect.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="物品号" prop="itemId">
                <el-input v-model.number="iOInfoSelect.itemId" placeholder="物品号"></el-input>
              </el-form-item>
              <el-form-item label="合同号" prop="contractId">
                <el-input v-model.number="iOInfoSelect.contractId" placeholder="合同号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="selectIOInfo('iOInfoSelect')">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- 出入库信息添加跳转 -->
            <el-button type="primary" @click="addIOInfo">添加入库信息</el-button>
            <!-- 出入库信息结果表格 -->
            <el-table :data="iOInfo" style="width: 100%" height="250" border>
              <el-table-column prop="id" label="入库号" width="180"></el-table-column>
              <el-table-column prop="date" label="日期" width="220"></el-table-column>
              <el-table-column prop="items.id" label="物品号" width="180"></el-table-column>
              <el-table-column prop="number" label="数量" width="180"></el-table-column>
              <el-table-column prop="contract.id" label="合同号" width="180"></el-table-column>
              <!-- 删除操作 -->
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteIOInfoById(scope.$index)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination @current-change="selectIOInfo" :current-page.sync="iOInfoSelect.page"
                           :page-size="10" :pager-count="11" layout="prev, pager, next" :total="iOInfoSelect.total"></el-pagination>
          </el-tab-pane>

          <el-tab-pane label="留言处理" name="fourth">
            <!-- 留言信息查询按钮 -->
            <el-form :inline="true" :model="message" ref="message" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="selectMessage">查看未处理留言</el-button>
              </el-form-item>
            </el-form>
            <!-- 留言信息结果表格 -->
            <el-table :data="message" style="width: 100%" height="250">
              <el-table-column prop="id" label="留言号" width="250"></el-table-column>
              <el-table-column prop="date" label="日期" width="250"></el-table-column>
              <el-table-column prop="userName" label="发送人" width="250"></el-table-column>
              <!-- 查看操作 -->
              <el-table-column fixed="right" label="操作" width="235">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="showMessageById(scope.$index)" type="text" size="small">查看内容</el-button>
                  <el-button @click.native.prevent="deleteMessageById(scope.$index)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container></div>
</template>
<!-- 功能 -->
<script>
  import {getCookie,delCookie} from "../../assets/javascript/cookie";
  export default {
    data() {
      //自定义校验规则，这里就一个，应用在各个组件，必须是数字的同时是非必填项
      var checkNumber = (rule, value, callback) => {
        if (value) {
          if (!Number.isInteger(value)) {
            return callback(new Error('请输入数字值'));
          } else {
            callback();
            console.log(checkNumber);
          }
        }
        callback();
      };
      return {
        activeName: 'first', //默认Tab第一个
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //以下是操作使用数据
        itemSelect:{ //物品查询
          id:"",
          name:"",
          page:0,
          total:0
        },
        iOInfoSelect:{ //出入库信息查询
          id:"",
          date:"",
          itemId:"",
          contractId:"",
          page:0,
          total:0
        },
        //以下是接收使用数据
        wareHouses:{ //仓库使用信息
          id:"001",
          name:""
        },
        items:[],
        iOInfo:[],
        contract:{
          tableData: [],
          currentPage:1,
          total:0,
          pageSize:10,
          loading: false
        },
        message:[],
        //表单自定义规则
        itemRule:{
          id:[{ validator: checkNumber, trigger: 'blur' }]
        },
        iOInfoRule:{
          id:[{ validator: checkNumber, trigger: 'blur' }],
          itemId:[{ validator: checkNumber, trigger: 'blur' }],
          contractId:[{ validator: checkNumber, trigger: 'blur' }]
        },
        username:'',
      };
    },
    mounted(){
      if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="warehouse") {
        this.$router.replace('/userlogin');
      } else {
        this.username=getCookie("userName");
        console.log(this.username);
        // 根据用户名找到仓库id
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/user/findhouseIdbyuserName',
          params: {
            userName:this.username
          }
        }).then(response => { //返回列表清单
          if (response.status == 200){
             console.log(response.data);
            this.wareHouses.id = response.data[0];
            console.log("Cookie识别成功！");
          }
        }).catch(function(error) {
          console.log("Cookie识别失败！"+error);
        });
      }
    },
    computed: {
      isLogin () {
        // return this.$store.getters.getLogin;
        var userName = getCookie("userName");
        // console.log(this.userId);
        return userName;
      }
    },
    methods: {
      handleCommand(command) {
        if(command == 'loginout'){
          delCookie("userName");
          delCookie("userIdentity");
          this.$router.push('/');
        }
      },
      deleteIOInfoById(index) { //删除一行的出入库信息数据
        this.$confirm('此操作将删除该出入库信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax({//根据所在行数调用其id删除信息
            method:'get',
            url:'http://localhost:8085/iOInfo/deleteIOInfoById',
            params: {
              id:this.iOInfo[index].id
            }
          }).then(response => { //返回列表清单
            if (response.status == 200){
              console.log("删除成功！");
            }
          }).catch(function(error) {
            console.log("删除错误！"+error);
          });
          this.iOInfo.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //以下是和后端Controller能够对应上的函数
      selectItem(formName){ //物品查询操作
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //this.$ajax({
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/items/selectItem',
              params: {
                id:this.itemSelect.id,
                name:this.itemSelect.name,
                houseId:this.wareHouses.id,
                page:this.itemSelect.page,
                size:"10"
              }
            }).then(response => { //返回列表清单
              if (response.status == 200){
                console.log(response.data);
                this.items = response.data.content;
                this.itemSelect.total = response.data.totalPages;
              }
            }).catch(function(error) {
              console.log(error);
            });
          } else {
            return false;
          }
        });
      },
      selectIOInfo(formName){ //出入库信息查询
        if(this.iOInfoSelect.date == null){ //date为null处理
          this.iOInfoSelect.date = "";
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //this.$ajax({
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/iOInfo/selectIOInfo',
              params: {
                id:this.iOInfoSelect.id,
                date:this.iOInfoSelect.date,
                houseId:this.wareHouses.id,
                itemId:this.iOInfoSelect.itemId,
                contractId:this.iOInfoSelect.contractId,
                page:this.iOInfoSelect.page,
                size:"10",
              }
            }).then(response => { //返回列表清单
              if (response.status == 200){
                this.iOInfo = response.data.content
                this.iOInfoSelect.total = response.data.totalPages
              }
            }).catch(function(error) {
              console.log(error);
            });
          } else {
            return false;
          }
        });
      },
      addIOInfo(){ //出入库信息添加
        this.$router.push('/AddIOInfo');
      },
      //采购合同信息查询
      //跳转页数
      selectContract(val) {
        this.currentPage = val;
        this.loadData();
      },
      loadData(){
        this.contract.loading = true;
        //this.$ajax({
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/contract/findAll',
        }).then(response => {
          if (response.status == 200){
            for(var i=0;i<response.data.length;i++){
              response.data[i].theprovider = response.data[i].provider.name;
              response.data[i].warehouse = response.data[i].wareHouses.name;
              response.data[i].theitem = response.data[i].items.name;
            }
            var sliceStart= 10*(this.contract.currentPage-1)
            this.contract.tableData = response.data.slice(sliceStart,sliceStart+10);
            this.contract.total = response.data.length;
            this.contract.loading=false;
            //console.log(this.contract.tableData);
          }
        })
          .catch(function(error) {
            console.log(error);
          });
      },
      //留言信息查询
      selectMessage(){
        //this.$ajax({
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/message/findByhouseId',
          params: {
            houseid:this.wareHouses.id.toString(),
          }
        }).then(response => { //返回列表清单
          if (response.status == 200) {
            this.message = new Array();
            for (var i = 0; i < response.data.length; i++) {
              console.log(response.data);
              // 修改的内容
              var item = {
                id: response.data[i][0].toString(),
                date: response.data[i][1].toString(),
                message: response.data[i][2].toString(),
                userName: response.data[i][3].toString(),
              };

              this.message.push(item);
            }
          }
        }).catch(function(error) {
          console.log(error);
        });
      },
      //留言信息显示
      showMessageById(index){
        this.$alert(this.message[index].message, '具体内容：')
      },
      //留言信息删除
      deleteMessageById(index){
        this.$ajax({//根据所在行数调用其id删除信息
          method:'get',
          url:'http://localhost:8085/message/deleteMessageById',
          params: {
            id:this.message[index].id
          }
        }).then(response => { //返回列表清单
          if (response.status == 200){
            console.log("删除成功！");
          }
        }).catch(function(error) {
          console.log("删除错误！"+error);
        });
        this.message.splice(index, 1);
      }
    }
  };
</script>
<!-- 样式 -->
<style>
  .home1{
    background: url('../../img/6.jpg');
    position:relative;
    margin-left: -8px;
    margin-top: -6px;
    padding: 7px;
    background-size: cover;
    width: 100%;
    height: 600px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    color: black;
    /* color: #909399; */
    background-color: rgba(185, 185, 181, 0.22);
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 10px;
    color: #000000;
   margin-top: -10px;

  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fffbfd;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:-20px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }

  .sub{
    font-size: 40px;
    color: #fff;
    font-family: 华文新魏;
  }
  .message{
    font-size: 13px;
    margin-left:150px;
    font-family: 宋体;
    color: dimgrey;
  }
</style>
