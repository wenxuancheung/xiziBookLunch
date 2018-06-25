<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <!--订单统计-->
        <Row>
            <Col span="24">
                <Card>
                    <h4 slot="title">
                        <Icon type="ios-pulse-strong"></Icon>
                        订单统计
                    </h4>
                    <div style="display:flex">
                        <DatePicker :value="orderCountDateValue" format="yyyy/MM/dd" type="daterange" placeholder="Select date" placement="top-start" style="width: 200px;z-index:99" @on-change="orderCountDateChange"></DatePicker>
                        <span @click="searchOrderCount(1)" style="margin-left:10px"><Button type="primary" icon="search">搜索</Button></span>
                        <!-- <span @click="download" style="margin: 0 10px;"><Button type="primary" icon="arrow-down-a">下载</Button></span> -->
                        <!-- <a  :href="'/control/dinner/manage/down?beg='+orderCountStartTime+'&end='+orderCountEndTime">下载</a> -->
                        <a :href="`/control/dinner/manage/down?beg=${this.orderCountStartTime}&end=${this.orderCountEndTime}`" class="download-btn"><Icon type="arrow-down-a"></Icon>下载</a>
                        <span v-if="isShow" style="line-height:30px">搜索时间：{{startTime}}-{{endTime}}</span>
                    </div>
                </Card>
                <Col span="24">
                    <Menu mode="horizontal"  active-name="1" @on-select="onMenuSelect" style="z-index:1">
                        <MenuItem name="1">
                            <Icon type="ios-paper"></Icon>
                            订单
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-people"></Icon>
                            公司统计
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="stats-bars"></Icon>
                            总计
                        </MenuItem>
                    </Menu>
                </Col>
                <Col span="24">
                    <Table :columns="orderCountColums" :data="orderCountList" size="small" ref="table" v-if="menuName == 1">
                    </Table>
                    <Table :columns="orderCompanyCountColums" :data="orderCompanyCountList" size="small" ref="table"  v-if="menuName == 2"></Table> 
                    <Table :columns="orderAllCountColums" :data="orderAllCountList" size="small" ref="table"  v-if="menuName == 3"></Table> 
                </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
import tableData from './components/table_data.js';
import * as table from './data/search';
export default {
    name: 'searchable-table',
    data () {
        return {
            searchConName1: '',
            searchConName2: '',
            searchConTel2: '',
            searchConName3: '',
            columns1: table.columns1,
            downloadUrl:"/control/dinner/manage/down?beg=&end=",
            // data1: [],
            // initTable1: [],
            // data2: [],
            // initTable2: [],
            // data3: [],
            // initTable3: [],
            menuList : [],
            orderCountList : [],
            orderAllCountList : [],
            orderCompanyCountList : [],
            nameList :[],
            loading1 : false,
            namesList : [],
            orderCountColums :[],
            orderAllCountColums : [],
            orderCompanyCountColums : [],
            orderCountDateValue : '',
            orderCountStartTime : '',
            orderCountEndTime : '',
            menuName : 1,
            startTime: '',
            endTime: '',
            isShow: false


        };
    },
    methods: {
        init () {
            // this.data1 = this.initTable1 = table.searchTable1;
            // this.data2 = this.initTable2 = table.searchTable2;
            // this.data3 = this.initTable3 = table.searchTable3;
            this.orderCountColums = tableData.orderCountColums
            this.orderCompanyCountColums = tableData.orderCompanyCountColums
            this.orderAllCountColums = tableData.orderAllCountColums
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        //订单状态搜索名字
        searchStatusName(name){
            if(name != ''){
                this.loading1 = true
                let that = this
                //搜索用户
                this.$http.post('/control/dinner/order/search-user',{
                    name: name
                }).then(async function (response){
                    that.loading1 = false
                    that.namesList = response.data.data
                })
                .catch((error) => {
                    console.log(error);
                })
            }else{
                this.namesList =''
            }
        },
        // handleCancel3 () {
        //     // this.data3 = this.initTable3;
        //     this.data3 = []
        // },
        //订单统计日期获取时间戳
        orderCountDateChange(time){
            this.orderCountStartTime = new Date(time[0]).getTime()/1000
            this.orderCountEndTime = new Date(time[1]).getTime()/1000
        },
        //订单统计
        searchOrderCount(msg){
            let that = this
            this.$http.get('/control/dinner/manage/count',
            {
                params: {
                 beg : that.orderCountStartTime,
                 end : that.orderCountEndTime
                }
            })
            .then(response=>{
                that.orderCountList = response.data.data.list
                //字符串转number排序
                response.data.data.list.map((item,index)=>{
                    that.orderCountList[index].count = parseFloat(item.count)
                    that.orderCountList[index].total_public_price = parseFloat(item.total_public_price)
                    that.orderCountList[index].total_price = parseFloat(item.total_price)
                })
                that.orderCompanyCountList =response.data.data.company_count
                that.orderAllCountList[0] = response.data.data.total_count
                that.endTime = response.data.data.offset.end
                that.startTime = response.data.data.offset.beg
                that.isShow = true
                if(msg === 1){
                    that.$Message.info(response.data.msg)
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        //订单下载
        download(){
            // window.open(`/control/dinner/manage/down?beg=${this.orderCountStartTime}&end=${this.orderCountEndTime}`)
            this.downloadUrl = `/control/dinner/manage/down?beg=${this.orderCountStartTime}&end=${this.orderCountEndTime}`
            // window.location.href(`/control/dinner/manage/down?beg=${this.orderCountStartTime}&end=${this.orderCountEndTime}`)
        },
        //选择菜单
        onMenuSelect(name){
            this.menuName = name
        },
    },
    created () {
        this.searchOrderCount()
        this.init()
    },
    mounted(){
        window.addEventListener('pageshow', this.searchOrderCount)
    }
};
</script>
