<template>
  <div id="Contracts">
    <el-table :data="tableData" style="width: 100%;margin:0px auto;" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="合同编号" width="90"></el-table-column> 
      <el-table-column prop="date" label="日期" ></el-table-column>
      <el-table-column prop="theitem" label="产品" ></el-table-column>
      <el-table-column prop="number" label="数量" width="80"></el-table-column>
      <el-table-column prop="theprovider" label="供应商"></el-table-column>
      <el-table-column prop="warehouse" label="仓库"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="big"  @click="showDetail(scope.$index)">查看详情</el-button>
          <el-button type="text" size="big"  @click="update(scope.$index)">修改</el-button>
        </template>
      </el-table-column>

    </el-table> 
      <div class="r_page">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
      
  
    <!-- Form -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" >
        <el-form-item label="产品编号" prop="itemId" :label-width="formLabelWidth">
          <el-input v-model="form.itemId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号" prop="providerId" :label-width="formLabelWidth">
          <el-input v-model="form.providerId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库编号"  prop="houseId" :label-width="formLabelWidth">
          <el-input v-model="form.houseId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="date" label="签属时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width:100%;"></el-date-picker>
        </el-form-item>

      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateData">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<style type="text/css">
  .r_page {
    margin-top: 20px;
    margin: 0 auto;
  }
</style>
<script type="text/javascript">
  export default {
    data() {
      return {
        tableData: [], 
        currentPage:1,
        total:0,
        pageSize:10,
        loading: false,
        formLabelWidth:'120px',
        dialogTitle:'',
        dialogFormVisible:false,
        currentContractId:'',
        form:{
          itemId:'',
          number:'',
          providerId:'',
          houseId:'',
          date:''
        },
        rules: {
          itemId: [
            { required: true, message: '请选择物品编号', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],
          houseId: [
            { required: true, message: '请选择仓库编号', trigger: 'blur' },
          ],
          providerId: [
            { required: true, message: '请选择供应商编号', trigger: 'blur' },
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
         }

      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      //加载数据
      loadData() {
        this.loading = true;
        this.$ajax({
              method:'get',
              url:'http://localhost:8085/purchaser/contract/findAll',
             }).then(response => {
               if (response.status == 200){
                  console.log(response);
                  for(var i=0;i<response.data.length;i++){
                    response.data[i].theprovider = response.data[i].provider.name;
                    response.data[i].warehouse = response.data[i].wareHouses.name;
                    response.data[i].theitem = response.data[i].items.name;
                    if(response.data[i].status==null){
                      response.data[i].status='未处理';
                    }
                    else{
                      response.data[i].status='已处理';
                    }
                  }
                  var sliceStart= 10*(this.currentPage-1)
                  this.tableData = response.data.slice(sliceStart,sliceStart+10);
                  this.total = response.data.length;
                  this.loading=false;
               }
              })
              .catch(function(error) {
                console.log('error');
              });
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      //跳转至合同详情展示 页面
      showDetail(val){
        // console.log(this.tableData[val].id);
        let url = this.$router.resolve({path:'contractDetail',query:{contractId:this.tableData[val].id}});
        window.open(url.href,'_blank');
      },
      //修改合同信息
      update(val){
        if(this.tableData[val].status=='已处理'){
          this.$message.error('无法修改');
        }
        else{
          this.dialogTitle='合同编号'+this.tableData[val].id;
          this.currentContractId=this.tableData[val].id;
          this.dialogFormVisible=true;
        }
      },
      //将数据更新进数据库
      updateData(){
        console.log(this.form.providerId);
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/contract/update',
          params:{
            contractId:this.currentContractId,
            providerId:this.form.providerId,
            itemId:this.form.itemId,
            number:this.form.number,
            houseId:this.form.houseId,
            date:this.form.date.getTime()
          }
        }).then(response=>{
          if(response.status==200){
            // console.log(response.data);
            if(response.data==true){
              this.$message.success('修改成功');
              this.dialogFormVisible=false;
              this.form={};
              this.loadData();
            }
            else{
              this.$message.error('修改失败，请检查输入编号');
            }
          }
        }).catch(function(error) {
            console.log('error');
        });
      }
    }
  }
</script>
