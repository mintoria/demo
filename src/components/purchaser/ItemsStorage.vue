<template>
  <div id="ItemsStorage">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:20px;margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/purchaser/housesStorage' }">仓库列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{houseName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 700px;margin:0px auto;" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="物品编号" width="140px"></el-table-column>
      <el-table-column prop="name" label="名称" width="140px"></el-table-column>
      <el-table-column prop="unit" label="单位" width="140px"></el-table-column> 
      <el-table-column prop="number" label="数量" width="140px"></el-table-column> 
      <el-table-column prop="price" label="价格" width="140px"></el-table-column> 
    </el-table> 
      <div class="r_page">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
      

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
        houseName:'',
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
        },
        loading: false
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      //加载数据
      loadData() {
        this.houseName = this.$route.query.houseName;
        var houseId = this.$route.query.houseId;
        console.log(this.$route.query.houseId);
        this.loading = true;
        this.$ajax({
              method:'get',
              url:'http://localhost:8085/purchaser/items/findByWareHouses_Id',
              params:{houseId:houseId}
             }).then(response => {
               if (response.status == 200){
                  var sliceStart= 10*(this.currentPage-1)
                  // console.log(response.data.length);
                  for(var i=0;i<response.data.length;i++){
                    response.data[i].house = response.data[i].wareHouses.name;
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
      }
    }
  }

</script>