<template>
  <div id="WareHouses">
    <el-table :data="tableData" style="width: 80%;margin:0px auto;" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="仓库编号" width="140"></el-table-column>
      <el-table-column prop="name" label="仓库名称" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column> 
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <!-- <router-link to="/purchaser/itemsStorage"> --><el-button type="text" size="big" @click="detailStorage(scope.$index)">库存查看</el-button><!-- </router-link> -->
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
        selectDate:'',
        loading: false
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
              url:'http://localhost:8085/purchaser/houses/findAll',
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
      detailStorage(row){
        this.$router.push({path:'itemsStorage',query:{
                                      houseId:this.tableData[row].id,
                                      houseName:this.tableData[row].name}});
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      }
    }
  }
</script>
