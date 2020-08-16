<template>
  <div id="providers">
    <div class="block">
        <div id="l_btn">
          <el-button type="primary" @click="batchRemove">批量删除</el-button>
        </div>
        <div id="r_btn">
          <el-button type="primary" @click="showAddDialog">添加供应商</el-button>
        </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="供应商编号" width="180"></el-table-column> 
      <el-table-column prop="name" label="供应商名称" width="180"></el-table-column> 
      <el-table-column prop="address" label="地址"></el-table-column> 
      <el-table-column prop="representative" label="法定代表人" width="180"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="big"  @click="showEditDialog(scope.$index)">编辑</el-button>
          <el-button type="text" size="big"  @click="removeData(scope.$index)">删除</el-button>
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
      <el-form :model="form">
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="法定代表人" :label-width="formLabelWidth">
          <el-input v-model="form.representative" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateOrAdd">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<style type="text/css">
  .block {
    width: 100%;
    height: 60px;
  }
  .block #l_btn {
    float: left;
    width: 90px;
  }
  .block #r_btn {
    float: right;
    margin-right: 50px;
    width: 90px;
  }
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
        selectDate:'',
        dialogFormVisible: false,
        dialogTitle: '',
        formLabelWidth: '120px',
        form: {
            name: '',
            address: '',
            representative: '',
            telephone: ''
        },
        loading: false,
        multipleSelection: []
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
              url:'http://localhost:8085/purchaser/provider/findAll',
             }).then(response => {
               if (response.status == 200){
                  var sliceStart= 10*(this.currentPage-1)
                  this.tableData = response.data.slice(sliceStart,sliceStart+10);
                  this.total = response.data.length;
                  this.loading=false;
               }
              })
              .catch(function(error) {
                console.log('数据加载失败');
              });
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      //打开编辑窗口
      showEditDialog(row){
        this.dialogTitle = '编辑信息';
        var data = this.tableData[row];
        this.form.name = data.name;
        this.form.address = data.address;
        this.form.representative = data.representative;
        this.form.telephone = data.telephone;
        this.selectDate = row;
        this.dialogFormVisible = true;
      },
      //添加供应商窗口
      showAddDialog(){
        this.dialogTitle = '新增供应商';
        this.form={
            name: '',
            address: '',
            representative: '',
            telephone: ''
        }

        this.dialogFormVisible = true;
      },
      updateOrAdd(){
        if (this.form.name == ""||this.form.address == ""||this.form.representative == ""
          ||this.form.telephone == "") {
          this.$message.error('不能为空');
          return;
        }
        var params = {
          name:this.form.name,
          address:this.form.address,
          re:this.form.representative,
          tel:this.form.telephone
        }
        var url = 'http://localhost:8085/purchaser/provider/add';
        if(this.dialogTitle=='编辑信息'){
          params.id = this.tableData[this.selectDate].id;
          url = 'http://localhost:8085/purchaser/provider/update'
        }
        this.$ajax({
          method:'get',
          url:url,
          params:params
         }).then(response => {
            if (response.status == 200){
                this.$message.success('操作成功');
                this.loadData();
            }
          }).catch(function(error) {
            console.log("error");
          });
          this.dialogFormVisible = false;

        },
      removeData(row) {
        var data = this.tableData[row];
        this.$confirm('确定要删除"'+data.name+'"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax({
              method:'get',
              url:'http://localhost:8085/purchaser/provider/delete',
              params:{id:this.tableData[row].id}
             }).then(response => {
               if (response.status == 200){
                if(response.data==true){
                  this.loadData();//重新加载数据
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
                else{
                  this.$message.error('无法删除');
                }
               }
              })
              .catch(function(error) {
                this.$message({
                  type: 'error',
                  message: '操作出现错误!'
                });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      batchRemove() {
        if(this.multipleSelection.length!=0){
          this.$confirm('确定要进行批量删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.multipleSelection.forEach(row => {
              this.$ajax({
                method:'get',
                url:'http://localhost:8085/purchaser/provider/delete',
                params:{
                  id:row.id,
                }
               }).then(response => {
                  if (response.status == 200){
                    if(response.data==false){
                      this.$message.error('编号'+row.id+'无法删除');
                    }
                    else console.log('success');
                  }
                }).catch(function(error) {
                  console.log("error");
                });
            })
            this.$message.success('操作成功');
            this.loadData();
          })
        }
        else{
          this.$message.info('请选择');
        }
        
      }
    }
  }
</script>
