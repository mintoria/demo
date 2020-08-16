<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" background-color="#eef1f6"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs" >
                    <el-submenu :index="item.index" >
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" >{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" >
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/purchaser',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '合同管理',
                        subs: [
                            {
                                index: '/purchaser/contractAdd',
                                title: '合同添加'
                            },
                            {
                                index: '/purchaser/contracts',
                                title: '合同浏览'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/purchaser/providers',
                        title: '供应商管理'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/purchaser/items',
                        title: '物品管理'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '5',
                        title: '仓库管理',
                        subs: [
                            {
                                index: '/purchaser/wareHouses',
                                title: '仓库管理'
                            },
                            {
                                index: '/purchaser/housesStorage',
                                title: '库存查看'
                            }
                        ]
                    }

                ]
            }
        },
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 75px;
        bottom:0;
        background: #eef1f6;
        text-align:left;
        padding-left:10px;
        padding-right:10px;
    }
</style>