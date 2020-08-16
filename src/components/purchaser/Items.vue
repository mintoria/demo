<template>
  <div id="Items">
    <div class="block">
      <div id="l_btn">
        <el-button type="primary" @click="batchRemove">批量删除</el-button>
      </div>
      <div id="r_btn">
        <el-button type="primary" @click="showAddDialog">添加物品</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="unit" label="单位" width="100"></el-table-column>
      <el-table-column prop="houseId" label="分配仓库号"></el-table-column>
      <el-table-column prop="house" label="分配仓库" width="200"></el-table-column>
      <!--<el-table-column prop="number" label="数量"></el-table-column>-->
      <el-table-column prop="price" label="价格"></el-table-column>
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
        <el-form-item label="物品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在仓库编号" :label-width="formLabelWidth">
          <el-input v-model="form.houseId" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="数量" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.number" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
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
          unit: '',
          houseId:'',
          number:'0',
          price:''
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
          url:'http://localhost:8085/purchaser/items/findAll',
        }).then(response => {
          if (response.status == 200){
            var sliceStart= 10*(this.currentPage-1)
            // console.log(response.data.length);
            for(var i=0;i<response.data.length;i++){
              if(response.data[i].wareHouses!=null){
                response.data[i].house = response.data[i].wareHouses.name;
                response.data[i].houseId = response.data[i].wareHouses.id;
              }
            }
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
      //打开编辑窗口
      showEditDialog(row){
        this.dialogTitle = '编辑信息';
        var data = this.tableData[row];
        this.form.name = data.name;
        this.form.unit = data.unit;
        this.form.houseId = data.houseId;
        this.form.number = data.number;
        this.form.price = data.price;
        this.selectDate = row;
        this.dialogFormVisible = true;
      },
      //添加供应商窗口
      showAddDialog(){
        this.dialogTitle = '新增物品';
        this.form={
          name:'',
          unit:'',
          house:'',
          number:'0',
          price:''
        }
        this.dialogFormVisible = true;
      },
      updateOrAdd(){
        if (this.form.name == ""||this.form.unit == ""||this.form.houseId == ""
          ||this.form.price == "") {
          this.$message.error('不能为空');
          return;
        }
        var params = {
          name:this.form.name,
          unit:this.form.unit,
          houseId:this.form.houseId,
          number:this.form.number,
          price:this.form.price
        };
        var url = 'http://localhost:8085/purchaser/items/add';
        if(this.dialogTitle=='编辑信息'){
          params.id = this.tableData[this.selectDate].id;
          url = 'http://localhost:8085/purchaser/items/update'
        }
        this.$ajax({
          method:'get',
          url:url,
          params:params
        }).then(response => {
          if (response.status == 200){
            if(response.data==true){
              this.$message.success('操作成功');
              this.loadData();
            }
            else{
              this.$message.error('仓库不存在');
            }
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
            url:'http://localhost:8085/purchaser/items/delete',
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
                url:'http://localhost:8085/purchaser/items/delete',
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
            });
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
