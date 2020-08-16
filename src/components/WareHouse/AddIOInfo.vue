<template>
  <div class="home1">
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="添加入库信息页面"></el-page-header>
    </el-header>
    <el-container>
      <el-aside width="100px">
        <!-- cookie和session处理 -->
        <div class="demo-basic--circle">
          <div class="block"><el-avatar :size="80" style="background-color: #121b5e">warehouse</el-avatar></div>

        </div>
        <div class="sub-title">仓库号：{{wareHouses.id}}</div>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName" type="border-card" style="background-color: #ffffff">
          <el-tab-pane label="添加入库信息" name="first">
            <!-- 添加出入库信息表单 -->
            <el-form :model="iOInfoInsert" ref="iOInfoInsert" label-width="80px">
              <el-form-item label="选择日期" prop="date" :rules="[
                  { required: true, message: '日期不能为空'}]">
                <el-date-picker v-model="iOInfoInsert.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="物品号" prop="itemId" :rules="[
                  { required: true, message: '物品号不能为空'},
                  { type: 'number', message: '物品号必须为数字值'}]">
                <el-input v-model.number="iOInfoInsert.itemId" placeholder="物品号"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="number" :rules="[
                  { required: true, message: '数量不能为空'},
                  { type: 'number', message: '数量必须为数字值'}]">
                <el-input v-model.number="iOInfoInsert.number" placeholder="数量"></el-input>
              </el-form-item>
              <el-form-item label="合同号" prop="contractId" :rules="[
                  { required: true, message: '合同号不能为空'},
                  { type: 'number', message: '合同号必须为数字值'}]">
                <el-input v-model.number="iOInfoInsert.contractId" placeholder="合同号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="insertIOInfo('iOInfoInsert')">添加出入库信息</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
  import {getCookie} from "../../assets/javascript/cookie";
  export default {
    data(){
      return{
        activeName: 'first', //默认Tab第一个
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //以下是操作使用数据
        iOInfoInsert:{ //出入库信息添加
          date:"",
          itemId:"",
          number:"",
          contractId:"",
        },
        //以下是接收使用数据，和后端能对的上
        wareHouses:{ //仓库使用信息
          id:"",
          name:""
        },
      }
    },
    mounted(){
      if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="warehouse") {
        this.$router.replace('/userlogin');
      } else {
        // 根据用户名找到仓库id
        this.axios({
          method:'get',
          url:'http://localhost:8085/user/findhouseIdbyuserName',
          params: {
            userName:getCookie("userName")
          }
        }).then(response => { //返回列表清单
          if (response.status == 200){
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
    methods:{
      goBack(){ //返回
        //跳转回主页面
        this.$router.push('/WareHousePart');
      },
      //以下是和后端Controller能够对应上的函数
      insertIOInfo(formName){ //添加出入库信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/iOInfo/insertIOInfo',
              params: {
                date:this.iOInfoInsert.date,
                itemId:this.iOInfoInsert.itemId,
                houseId:this.wareHouses.id,
                number:this.iOInfoInsert.number,
                contractId:this.iOInfoInsert.contractId
              }
            }).then(response => { //返回列表清单
              if (response.status == 200){
                this.$alert('添加成功！', '', {
                  confirmButtonText: '确定',
                });
              }
              else{
                this.$message.error("添加失败");
              }
            }).catch(function(error) {
              // this.$alert('添加失败！', '', {
              //   confirmButtonText: '确定',
              // });
             console.log("error");
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    color: black;
    /* color: #909399; */
  }
  .el-tabs__content {
    overflow: hidden;
    position: relative;
  }
  .home1{
    background-color: #fafffb;
    position:absolute;
    margin-left: -8px;
    margin-top: -6px;
    padding: 7px;
    background-size: cover;
    width: 100%;
    /*height: 500px;*/
  }
  .el-page-header {
   margin-top: 10px;
  }
  .el-page-header__content {
    font-size: 40px;
    color: #000000;
    font-family: 幼圆;
  }
.sub-title{
  margin-top: 20px;
  margin-left: 3px;
  color: #fffbfd;
}
</style>
