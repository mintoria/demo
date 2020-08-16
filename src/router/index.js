import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/finance/Home'

import userlogin from "../components/Login/userlogin"
import warehouseShow from '../components/finance/warehouseshow'
import BuyShow from '../components/finance/buymentshow'
import MoneyChange from '../components/finance/changeofmoney'

import EditUser from '../components/finance/editUsers'
import PurchaserHome from '../components/purchaser/PurchaserHome'
import index from '../components/purchaser/index'
import contracts from '../components/purchaser/Contracts'
import contractAdd from '../components/purchaser/ContractAdd'
import providers from '../components/purchaser/Providers'
import items from '../components/purchaser/items'
import wareHouses from '../components/purchaser/wareHouses'
import housesStorage from '../components/purchaser/HousesStorage'
import itemsStorage from '../components/purchaser/ItemsStorage'

import contractDetail from '../components/purchaser/ContractDetail'
import WareHousePart from "../components/WareHouse/WareHousePart.vue"
import AddIOInfo from "../components/WareHouse/AddIOInfo.vue"
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/' ,
      name:'userlogin',
      component:userlogin,
    },
    {
      path:'/userlogin' ,
      name:'userlogin',
      component:userlogin,
    },
    {
      path:'/MoneyChange',
      name:'MoneyChange',
      component:MoneyChange,
      // meta: { requiresAuth: true } // 添加表示需要验证
    },
    {
      path:'/BuyShow',
      name:'BuyShow',
      component:BuyShow,
      // meta: { requiresAuth: true } // 添加表示需要验证
    },
    {
      path:'/WarehousingInformation',
      name:warehouseShow,
      component:warehouseShow,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      // meta: { requiresAuth: true } // 添加表示需要验证
    },

    {
      path:'/edituser',
      name:'EditUser',
      component:EditUser,
    },

    {
      path:'/purchaser',
      name: 'purchaser',
      component: PurchaserHome,
      children:[
        {
          path: '/',
          component: index
        },
        {
          path: '/purchaser/contractAdd',
          component:contractAdd
        },
        {
          path: '/purchaser/contracts',
          component:contracts
        },
        {
          path: '/purchaser/providers',
          component:providers
        },
        {
          path: '/purchaser/items',
          component:items
        },
        {
          path: '/purchaser/wareHouses',
          component:wareHouses
        },
        {
          path: '/purchaser/housesStorage',
          component:housesStorage
        },
        {
          path: '/purchaser/itemsStorage',
          component:itemsStorage
        }
      ]
    },
    {
      path: '/purchaser/contractDetail',
      component: contractDetail
    },
    {
      path: "/WareHousePart",
      name: "WareHousePart",
      component: WareHousePart
    },
    {
      path: "/AddIOInfo",
      name: "AddIOInfo",
      component: AddIOInfo
    }




  ]
})
