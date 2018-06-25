<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>
<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <h4 slot="title">
                        <Icon type="podium"></Icon>
                            今日数据                      
                    </h4>
                    <Row>
                        <Col span="24">
                            <!-- <span @click="download" style="margin: 0 10px;"><Button type="primary" icon="arrow-down-a">下载今日数据</Button></span> -->
                            <a :href="`/control/dinner/manage/today-down`" class="download-btn" style="width:110px"><Icon type="arrow-down-a"></Icon>下载今日数据</a>
                        </Col>
                        <Col span="24">
                            <Menu mode="horizontal"  active-name="1" @on-select="onDataSelect" style="z-index:1">
                                <MenuItem name="1">
                                    <Icon type="ios-paper"></Icon>
                                    订单
                                </MenuItem>
                                <MenuItem name="2">
                                    <Icon type="stats-bars"></Icon>
                                    菜单统计
                                </MenuItem>
                                <MenuItem name="3">
                                    <Icon type="ios-people"></Icon>
                                    公司统计
                                </MenuItem>
                                <MenuItem name="4">
                                    <Icon type="connection-bars"></Icon>
                                    总计
                                </MenuItem>

                            </Menu>
                        </Col>
                        <Col span="24">
                            <Table :columns="todayDataColumn" :data="todayData" size="small" ref="todayDataTable" stripe v-if="menuName == 1">
                            </Table>
                            <Table :columns="todayDataCompanyColumn" :data="todayDataCompanyCountList" size="small" ref="todayDataTable" stripe v-if="menuName == 3"></Table> 
                            <Table :columns="todayDataCountColumn" :data="todayDataAllCountList" size="small" ref="todayDataTable" stripe v-if="menuName == 4"></Table>
                            <Table :columns="todayDataFoodsCountColumn" :data="todayDataFoodsCountList" size="small" ref="todayDataTable" stripe v-if="menuName == 2"></Table>
                        </Col>   
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import canEditTable from './components/canEditTable.vue'
import tableData from './components/table_data.js'
import html2canvas from 'html2canvas'
export default {
    name: 'todayData',
    components: {
        canEditTable
    },
    data(){
        return{
            todayData : [],
            todayDataCompanyCountList:[],
            todayDataAllCountList:[],
            todayDataFoodsCountList:[],
            todayDataColumn:[{
                title: 'id',
                key : 'id',
                align: 'center'
            },
            {
                title: '姓名',
                align: 'center',
                key: 'name',
            },
            {
                title: '菜名',
                align: 'center',
                key: 'food_name',
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
                    ])
                }
            }],
            todayDataCompanyColumn:[],
            todayDataCountColumn:[],
            todayDataFoodsCountColumn:[],
            total:0,
            todayDataTable:[],
            menuName:1
        }
    },
    methods:{
        getData(){
            // this.todayDataColumn = tableData.todayDataColumn
            this.todayDataCompanyColumn = tableData.todayDataCompanyColumn
            this.todayDataCountColumn = tableData.todayDataCountColumn
            this.todayDataFoodsCountColumn = tableData.todayDataFoodsCountColumn
        },
        onDataSelect(name){
            this.menuName = name
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
                that.todayData.splice(index,1)
            })
            .catch((error) => {
                console.log(error);
            })
        },
        //下载今日数据
        // download(){
        //     window.open(`/control/dinner/manage/today-down`)
        // }
        //获取今日数据
        getTodayData(){
            let that = this
            this.$http.get('/control/dinner/manage/today')
            .then(response=>{
                that.todayData = response.data.data.list
                that.todayDataFoodsCountList = new Array()
                for(var i in response.data.data.food_count){
                    that.todayDataFoodsCountList[i]= response.data.data.food_count[i]
                }
                that.todayDataCompanyCountList = response.data.data.company_count
                that.todayDataAllCountList[0] = response.data.data.total_count
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },
    created(){
        //获取今日数据
        this.getTodayData()

        this.getData()
    },
};

</script>

