<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div> 
        <Row>
            <Card>
                <h4 slot="title" style="display:flex;align-items:center">
                    <Icon type="ios-keypad"></Icon>
                    订单列表
                </h4>
                <Col span="3" style="margin-right:20px;">
                    <!-- <Select
                        v-model="orderListGetName"
                        filterable
                        remote
                        @on-query-change="searchOrderListName"
                        :loading="loading1" placeholder="请输入姓名搜搜..."  >
                        <Option v-for="option in orderNameList" :value="option.name"  :key="option.id">{{option.name}}</Option>
                    </Select> -->
                    <Dropdown trigger="custom" :visible="visible" style="width:180px">
                        <Input v-model="orderListGetName" placeholder="请输入姓名搜搜..." @on-change='searchOrderListName'></Input>
                        <DropdownMenu class='dropdown-menu' slot="list" v-if="orderNameList.length > 0">
                            <DropdownItem  v-on:click.native="handleClose(item)" v-for="(item, index)  in orderNameList" :key="index">{{ item.name }}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <DatePicker :value="dateValue" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="Select date" style="width: 200px;margin-right:20px" @on-change="handleChange"></DatePicker>
                <Button type="primary" v-on:click="showOrderList(1)">搜索订单</Button>
                <Button type="primary" v-on:click="addOrderClick" style="float:right;position:relative;right:5%">添加订单</Button>
                <Col style="margin-top:20px">
                    <div class="edittable-table-height-con">
                        <can-edit-table 
                            refs="table3" 
                            v-model="orderList" 
                            :columns-list="orderListColumn"
                        ></can-edit-table>
                        <Page :total="total" :page-size="20" show-elevator style="margin-top:20px" @on-change="change"></Page>
                    </div>
                </Col>
            </Card>
        </Row>
        <!-- 添加订单-->
        <Row :class="{hiddenBg : !isHidden,displayNone : isHidden}" span="24">
            <Col span="10">
                <Card>
                    <h4 slot="title">
                        <Icon type="plus-circled"></Icon>
                        添加订单
                    </h4>
                    <Row style="margin-top:20px" >
                        <Dropdown trigger="custom" :visible="isVisible" style="width:200px">
                            <Input v-model="getName" placeholder="请输入姓名搜搜..." @on-change='searchAddOrderName'></Input>
                            <DropdownMenu class='dropdown-menu' slot="list" v-if="nameList.length > 0">
                                <DropdownItem  v-on:click.native="handleCloseName(item)" v-for="(item, index)  in nameList" :key="index">{{ item.name }}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Select v-model="getMenu" clearable style="width:200px">
                            <Option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select><br>
                        <div  style="margin-top:20px">
                            <Button type="primary" icon="plus" @click="handleSearch">添加订单</Button>
                            <Button type="error" @click="cancelAddOrderClick" >取消</Button>
                        </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
export default {
    name: 'exportable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            tableData : [],
            loading1 : false,
            orderListGetName : '',
            orderNameList : [],
            dateValue : '',
            orderList : [],
            orderListColumn : [
                {
                    title: '订单id',
                    align: 'center',
                    key: 'id',
                },
                {
                    title:'	用户名称',
                    align: 'center',
                    key : 'name',
                },
                {
                    title:'菜名',
                    align: 'center',
                    key : 'food_name',
                },
                {
                    title: '员工应付金额',
                    align: 'center',
                    key: 'price',
                },
                {
                    title: '公司应付金额',
                    align: 'center',
                    key: 'public_price',
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'time',
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    render:(h,parms)=>{
                        let that = this
                        return h('Poptip', {
                            props: {
                                confirm: true,
                                title: '您确定要删除这条数据吗?',
                                transfer: true
                            },
                            on: {
                                'on-ok': () => {
                                    this.searchStatus(parms.row.id,parms.index)
                                }
                            }
                        },[
                            h('Button', {
                                style: {
                                    margin: '0 5px'
                                },
                                props: {
                                    type: 'error',
                                    placement: 'top'
                                }
                            }, '删除')
                            ]
                        )
                }}
            ],
            nameList : [],
            menuList : [],
            total:0,
            isHidden : true,
            getName : '',
            getMenu : '',
            status : 0,
            getNameId : '',
            startTime : '',
            endTime: '',
            newName:'',
            visible: false,
            isVisible : false,
            getId: ''
        };
    },
    methods: {
        //获取table_data.js中的列名
        // getData(){
        //     this.orderListColumn = tableData.orderListColumn
        // },
        //订单查询获取名字
        searchOrderListName(name){
            if(name != ''){
                this.loading1 = true
                this.searchName(this.orderListGetName,"searchOrderList")
                this.visible = true
            }
        },
        //添加订单获取名字
        searchAddOrderName(name){
            this.getId = 0
            if(name != ''){
                this.loading1 = true
                this.searchName(this.getName,"searchAddOrder")
                this.isVisible = true
            }
        },
        handleClose(e){
            this.orderListGetName = e.name
            this.visible = false
        },
        handleCloseName(e){
            this.getId = e.id
            this.getName = e.name
            this.isVisible = false
        },
        //搜索用户
        searchName(...name){
            let that = this
            this.newName = name[0]
            this.$http.post('/control/dinner/order/search-user',{
                name: name[0]
            }).then(async function (response){
                that.loading1 = false
                if(name[1] == "searchOrderList"){
                    that.orderNameList = response.data.data
                }else{
                    that.nameList = response.data.data
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        //改变日期获取时间戳
        handleChange(e){
            this.startTime = new Date(e[0]).getTime()/1000
            this.endTime = new Date(e[1]).getTime()/1000
        },
        //获取订单列表
        showOrderList(msg){
            let that = this
            this.$http.get('/control/dinner/manage/order',
            {
                params: {
                 page_size: 20,
                 name : that.orderListGetName,
                 beg : that.startTime,
                 end : that.endTime
                }
            })
            .then(response=>{
                that.orderList = response.data.data.list
                that.total = response.data.data.page.total
                that.visible = false
                if(msg === 1){
                    that.$Message.info(response.data.msg)
                }
            })
            .catch(error=>{
                console.log(error);
            });
        },
        //换页
        change(page){
            let that = this
            this.$http.get('/control/dinner/manage/order',
            {
                params: {
                    page: page 
                }
            })
            .then(response=>{
                that.orderList = response.data.data.list
            })
            .catch(error=>{
                console.log(error);
            });
        },
        //添加订单显示
        addOrderClick(){
            this.isHidden = false
        },
        //添加订单接口
        handleSearch () {
            let that = this
            if(this.getMenu && this.getId){
                this.$http.post('/control/dinner/order/add',{
                        food_id : this.getMenu,
                        user_id	: this.getId
                    }).then(async function (response){
                        that.$Message.info(response.data.msg)
                        that.isVisible = false
                        // that.getId = 0
                    })
                    .catch((error) => {
                        console.log(error);
                })
            }else{
                this.$Message.info("请填写完整信息")
            }

        },
        //添加订单页面消失
        cancelAddOrderClick(){

            this.isHidden = true
        },
        //搜索状态
        searchStatus(...arr){
            let that = this 
            let index = arr[1]
            let id =arr[0]
            this.$http.post('/control/dinner/order/status',{
                id: id,
                status : 0
            }).then(async function (response){
                that.$Message.info(response.data.msg)
                that.orderList.splice(index,1)
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
    created(){
        let that = this
        //获取今日菜单
        this.$http.get('/control/dinner/order/dinner-list')
        .then(response=>{
            that.menuList = response.data.data
        })
        .catch(error=>{
            console.log(error);
        })
        this.showOrderList()
        // this.getData()
    }
};
</script>
