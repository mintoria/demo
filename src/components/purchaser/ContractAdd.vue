<template>
  <div id="ContractAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top:40px;"label-width="100px" class="demo-ruleForm">
      <el-form-item label="物品" prop="item" required>
        <el-select v-model="ruleForm.item" placeholder="请选择物品" style="width:100%;" >
          <el-option
            v-for="item in itemsOption"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="ruleForm.number" style="width:100%;"></el-input>
      </el-form-item>
      <el-form-item label="仓库" prop="wareHouse">
        <el-select v-model="ruleForm.wareHouse" placeholder="请选择仓库" style="width:100%;">
          <el-option
            v-for="house in housesOption"
            :key="house.id"
            :label="house.name"
            :value="house.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商" prop="provider">
        <el-select v-model="ruleForm.provider" placeholder="请选择供应商" style="width:100%;">
          <el-option
            v-for="provider in providersOption"
            :key="provider.id"
            :label="provider.name"
            :value="provider.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="签属时间" >
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<style type="text/css">
  #ContractAdd{
    width: 400px;
    margin: 0 auto;
  }
</style>
<script type="text/javascript">

  export default {
    data() {
      return {
        ruleForm: {
          item:'',
          number:'',
          wareHouse:'',
          provider:'',
          date:'',
        },
        itemsOption:[],
        housesOption:[],
        providersOption:[],
        rules: {
          item: [
            { required: true, message: '请选择物品', trigger: 'change' }
          ],
          number: [
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],
          wareHouse: [
            { required: true, message: '请选择仓库', trigger: 'change' },
          ],
          provider: [
            { required: true, message: '请选择供应商', trigger: 'change' },
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
         }
      };
    },
    mounted() {
      this.loadData();
    },
    methods: {
      //加载物品
      loadItems(){
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/items/findAll',
         }).then(response => {
           if (response.status == 200){
              this.itemsOption = response.data;
              //console.log(this.itemsOption);
           }
          })
          .catch(function(error) {
            console.log('items error');
        });
      },
      //加载仓库
      loadHouses(){
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/houses/findAll',
         }).then(response => {
           if (response.status == 200){
              this.housesOption = response.data;
              // console.log(this.itemsOption);
           }
          })
          .catch(function(error) {
            console.log('wareHouses error');
        });
      },
      //加载供应商
      loadProviders(){
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/provider/findAll',
         }).then(response => {
           if (response.status == 200){
              this.providersOption = response.data;
              // console.log(this.itemsOption);
           }
          })
          .catch(function(error) {
            console.log('Providers error');
        });
      },
      //加载数据
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$refs[formName].model);
            var model = this.$refs[formName].model;
            var params={
              providerId: model.provider,
              itemId: model.item,
              number: model.number,
              houseId: model.wareHouse,
              date: model.date.getTime()
            }
            this.$ajax({
              method:'get',
              url:'http://localhost:8085/purchaser/contract/add',
              params:params
             }).then(response => {
                 this.$message.success("添加成功");
                  this.resetForm(formName);
              })
              .catch(function(error) {
                console.log('add error');
              });
            } else {
              console.log('error submit!!');
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loadData() {
        this.loadItems();
        this.loadProviders();
        this.loadHouses();
      }
    }
  }
</script>