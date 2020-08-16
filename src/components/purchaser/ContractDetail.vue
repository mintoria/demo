<template>
  <div id="ContractDetail">
    <h1 style="padding-top:10px;">采购合同</h1>
    <div id="myself">
      <div class="item">
        <span>购货方(甲方):</span>
        <span class="input">小明有限公司</span>
      </div>
      <div class="item">
        <span>地址</span>
        <span class="input">上海市松江区文汇路300弄</span>
      </div>
      <div class="item">
        <span>法定代表人:</span>
        <span class="input">老张</span>
      </div>
      <div class="item">
        <span>电话:</span>
        <span class="input">18388489527</span>
      </div>
    </div>
    <div id="myself">
      <div class="item">
        <span>供货方(乙方):</span>
        <span class="input">{{provider.name}}</span>
      </div>
      <div class="item">
        <span>地址:</span>
        <span class="input">{{provider.address}}</span>
      </div>
      <div class="item">
        <span>法定代表人:</span>
        <span class="input">{{provider.representative}}</span>
      </div>
      <div class="item">
        <span>电话:</span>
        <span class="input">{{provider.telephone}}</span>
      </div>
    </div>
    <div id="myself">
      <div class="item">
        <span>一、产品名称、单位、数量、单价、总金额、配送地址</span>
      </div>
      <table style="margin:0px auto;" border="1">
        <tr>
          <th width="200px">产品名称</th>
          <th width="40px">单位</th>
          <th width="50px">数量</th>
          <th width="70px">单价(元)</th>
          <th width="200px">配送地址</th>
        </tr>
        <tr v-model="TableData">
          <td>{{TableData.name}}</td>
          <td>{{TableData.unit}}</td>
          <td>{{TableData.number}}</td>
          <td>{{TableData.price}}</td>
          <td>{{TableData.address}}</td>
        </tr>
        <tr>
          <th style="font-size:20px;">总金额</th>
          <td colspan="5">{{TableData.total}}元</td>
        </tr>
      </table>
    </div>
    <div id="myself">
      <div class="item">
        <span>二、合同金额</span>
      </div>
      <div class="item">
        <span>1.采购总金额：人民币</span>
        <span class="input">{{TableData.total}}</span>
        <span>元：含产品金额、包装、装卸、运输、税费等全部费用。</span>
      </div>
      <div class="item">
        <span>2.交付定金</span>
        <span class="input">{{frontMoney}}</span>
        <span>元,尾款在乙方实际交付货物后结算。</span>
      </div>
    </div>
    <div style="margin-left:450px;margin-bottom:10px;">
      <div class="item" >
        <span>日期</span>
      </div>
      <div class="item" style="height:40px;">
        <div class="input" style="width:70px;float:left;text-align:center;">{{date.year}}</div>
        <div style="float:left;">年</div>
        <div class="input" style="width:40px;float:left;text-align:center;">{{date.month}}</div>
        <div style="float:left;">月</div>
        <div class="input" style="width:40px;float:left;text-align:center;">{{date.day}}</div>
        <div style="float:left;">日</div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
  body{
    margin: 0px;padding: 0px;
    background-color: white;
    text-align: center;
  }
  #ContractDetail{
    width: 700px;
    margin: 0 auto;
    margin-top:10px;
    background-color: #F0F0F0;
  }
  #myself{
    margin-top:40px;
    margin-bottom: 40px;
  }
  .item{
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
  .input{
    font-family: 'Comic Sans MS', cursive;
    border-bottom: solid;
  }
</style>
<script type="text/javascript">
  import {setCookie,getCookie,delCookie} from "../../assets/javascript/cookie";
  export default {
    data() {
      return {
        TableData: {
          name:'wup',
          unit:'个',
          number:20,
          price:20,
          total:29,
          address:'湖南省衡阳市衡阳县吉林村新松江路208号'
        },
        provider:{
          name:'暮云有限公司',
          address:'松江区文汇路300弄',
          representative:'暮云',
          telephone:'18388489527'
        },
        date:{
          year:2020,
          month:12,
          day:8
        },
        frontMoney:'',
      };
    },
    mounted() {
      if (this.isLogin==undefined||this.isLogin==""||getCookie("userIdentity")!="purchase") {
        this.$router.replace('/userlogin');
      } else {
        // 执行后续操作
        this.test = getCookie("userName");
      }
      this.loadData();
    },
    computed: {
      isLogin () {
        this.userName = getCookie("userName");
        return this.userName;
      }
    },
    methods: {
      //加载合同信息
      loadContract(){
        var contractId = this.$route.query.contractId;
        console.log(contractId);
        this.$ajax({
          method:'get',
          url:'http://localhost:8085/purchaser/contract/find',
          params:{
            contractId:contractId
          }
        }).then(response => {
          if (response.status == 200){
            console.log(response);
            this.provider = response.data.provider;
            this.TableData = response.data.items;
            this.TableData.address = response.data.wareHouses.address;
            this.TableData.number = response.data.number;
            this.TableData.total = response.data.number*response.data.items.price;
            // console.log(response.data.date.split('-'));
            this.date.year = parseInt(response.data.date.split('-')[0]);
            this.date.month = parseInt(response.data.date.split('-')[1]);
            this.date.day = parseInt(response.data.date.split('-')[2]);
          }
          else{
            this.$message.error('加载数据出错');
          }
        })
          .catch(function(error) {
            console.log('error');
          });
      },
      loadData() {
        this.loadContract();
      }
    }
  }
</script>
