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
                        <Icon type="edit"></Icon>
                         菜单列表
                    </h4>
                    <Row :gutter="10">
                        <Col span="24" style="margin-bottom:20px">
                            <DatePicker :value="dateValue" format="yyyy/MM/dd" type="date" placement="bottom-start" placeholder="Select date" style="width: 200px;margin-right:10px" @on-change="handleChange" v-model="date"></DatePicker>
                            <Button type="primary" v-on:click="showMenurList">搜索菜单</Button>
                            <Button type="primary" v-on:click="addMenuClick" style="float:right;position:relative;right:5%">添加菜单</Button>
                        </Col>
                        <Col span="24" >
                            <div class="edittable-table-height-con">
                                <can-edit-table 
                                    refs="table4" 
                                    v-model="editInlineAndCellData" 
                                    @changeBgClass="changeBgClass"  
                                    :columns-list="editInlineAndCellColumn" 
                                ></can-edit-table>
                                <Page :total="total" :page-size="20" show-elevator style="margin-top:20px" @on-change="change"></Page>
                            </div>
                        </Col>         
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row :class="{hiddenBg : !isHidden,displayNone : isHidden}" span="24">
            <Col span="15" >
                <Card >
                    <h4  slot="title">
                        <Icon type="plus-circled"></Icon>
                        添加菜单
                    </h4>
                    <Form  :label-width="100" >
                        <FormItem label="菜名" >
                            <Input type="text" v-model="addData.name" style="width:20%"></Input>
                        </FormItem>
                        <FormItem label="员工应付价格" >
                            <InputNumber :max="100" :min="0" v-model="addData.price"></InputNumber>
                        </FormItem>
                        <FormItem label="公司应付价格" >
                            <InputNumber :max="100" :min="0" v-model="addData.publicPrice" ></InputNumber>
                        </FormItem>
                        <FormItem label="日期" >
                            <DatePicker type="date" placeholder="Select date" v-model="addData.day"></DatePicker>
                        </FormItem>
                        <FormItem label="选择图标">
                            <div class="admin-upload-list" v-for="(item,index) in imgList" :key="item.path">
                                <div @click="handleView(item.path,item.id,index)" :class="{adminCover:index==showImg}" >
                                    <img src="../../images/choose.png" class="choose" v-if="index==showImg" style="width:28px;height:28px"/>
                                    <img :src="item.path" >
                                </div>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" icon="plus" v-on:click="btnClick">添加</Button>
                            <Button type="error" v-on:click="cancelAddMenuClick(1)">取消</Button>
                        </FormItem>
                    </Form>
                    <Modal title="查看图片" v-model="visible" @on-ok="chooseImg" @on-cancel="unChooseImg">
                        <img v-if="visible" style="width: 100%" :src="imgPath">
                    </Modal>
                </Card>
            </Col>
        </Row>
        <Row :class="{updateHiddenBg : !updateIsHidden,updateDisplayNone : updateIsHidden}" span="24">
            <Col span="15">
                <Card>
                    <h4 slot="title">
                        <Icon type="refresh"></Icon>
                        更新菜单
                    </h4>
                    <Form  :label-width="100">                
                        <FormItem label="菜名" >
                            <Input type="text" v-model="updateData.name" style="width:20%"></Input>
                        </FormItem>
                        <FormItem label="员工应付价格" >
                            <InputNumber :max="100" :min="0" v-model="updateData.price"></InputNumber>
                        </FormItem>
                        <FormItem label="公司应付价格" >
                            <InputNumber :max="100" :min="0" v-model="updateData.publicPrice"></InputNumber>
                        </FormItem>
                        <FormItem label="日期" >
                            <DatePicker type="date" placeholder="Select date" v-model="updateData.day"></DatePicker>
                        </FormItem>
                        <FormItem label="选择图标">
                            <div class="admin-upload-list" v-for="(item,index) in imgList" :key="item.path">
                                <div @click="handleView(item.path,item.id,index)" :class="{adminCover:index==showImg}" >
                                    <img src="../../images/choose.png" class="choose" v-if="index==showImg" style="width:28px;height:28px"/>
                                    <img :src="item.path" >
                                </div>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" v-on:click="updateBtnClick">修改</Button>
                            <Button type="error" v-on:click="cancelAddMenuClick(2)">取消</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue'
import tableData from './components/table_data.js'
export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            // columnsList: [],
            tableData: [],
            // editInlineColumns: [],
            // editInlineData: [],
            // editIncellColumns: [],
            // editIncellData: [],
            editInlineAndCellColumn: [],
            editInlineAndCellData: [],
            imgList:[],
            showImg:0,
            // showCurrentColumns: [],
            // todayMenuColumn:[],
            loading1 : false,
            showCurrentTableData: false,
            isHidden : true,
            updateIsHidden : true,
            imageBgDisplay : true,
            imageBg:false,
            button4:'',
            visible:false,
            page:1,
            addData : {
                name : null,
                price : null,
                publicPrice : null,
                day : null
            },
            updateData:{
                id : "",
                name : "",
                price : 0,
                publicPrice : 0,
                day : "",
                icon_id: 0
            },
            changeData:{
                id : null,
                status : null,
            },
            total : 0,
            todayMenu : [],
            startTime : '',
            endTime : '',
            orderListGetName : '',
            dateValue : '',
            day: '',
            date : '',
            imgPath:'',
            imgId :1
        };
    },
    methods: {
        getData () {
            // this.columnsList = tableData.table1Columns;
            this.tableData = tableData.table1Data
            // this.editInlineColumns = tableData.editInlineColumns;
            // this.editInlineData = tableData.editInlineData;
            // this.editIncellColumns = tableData.editIncellColumns;
            // this.editIncellData = tableData.editIncellData;
            this.editInlineAndCellColumn = tableData.editInlineAndCellColumn
            // this.editInlineAndCellData = tableData.editInlineAndCellData
            // this.showCurrentColumns = tableData.showCurrentColumns;
            // this.todayMenuColumn = tableData.todayMenuColumn;
        },
        //换日期
        handleChange(e){
            this.day = new Date(e).getTime()/1000
        },
        //点击编辑后从子组件传一个false改变class显示出编辑窗口(接受子组件传来的值)
        changeBgClass(...msg){
            this.updateIsHidden = msg[0]
            this.updateData.id = msg[1].id
            this.updateData.day = msg[1].day
            this.updateData.price = parseFloat(msg[1].price)
            this.updateData.publicPrice = parseFloat(msg[1].public_price)
            this.updateData.name = msg[1].name,
            this.updateData.icon_id = msg[1].icon_id
            this.showImg = msg[1].icon_id-1
        },

        //菜单列表换页
        change(page){
            this.page = page
            this.getFoods(this.page)
        },
        //搜索菜单
        showMenurList(){
            if(this.day){
                this.getFoods(this.page,this.day,"search")
            }else{
                this.getFoods(this.page,'')
            }
        },
        //添加菜单
        btnClick(){
            let that = this
            if(this.imgId && this.addData.name && this.addData.price && this.addData.publicPrice && this.addData.day){
                this.$http.post('/control/dinner/manage/add', {
                    name: this.addData.name,
                    price: this.addData.price,
                    public_price: this.addData.publicPrice,
                    day : this.addData.day,
                    icon_id :this.imgId
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(async function (response) {
                    let res = await response
                    that.$Message.info(response.data.msg)
                    // that.isHidden = true
                    that.getFoods(that.page,that.day)
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                this.$Message.info('请填写完整信息');
            }
            
        },
        //更新菜单
        updateBtnClick(){
            let that = this
            this.$http.post('/control/dinner/manage/update',{
                id : this.updateData.id,
                name: this.updateData.name,
                price: this.updateData.price,
                public_price: this.updateData.publicPrice,
                day : this.updateData.day,
                icon_id : this.imgId
            },{
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then(async function (response){
                    let res = await response
                    that.$Message.info(response.data.msg)
                    that.updateIsHidden = true
                    //修复时间为空返回NaN的问题
                    if(that.day){
                        that.getFoods(that.page,that.day)
                    }else{
                        that.getFoods(that.page,'')
                    }
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        },
        //添加菜单按钮弹出添加菜单列表
        addMenuClick(){
            this.isHidden = false
        },
        //取消按钮
        cancelAddMenuClick(type){
            if(type==2){
                this.updateIsHidden = true
            }else{
                this.isHidden = true
            }
        },
        //获取快餐列表
        getFoods(page,day,msg){
            let that = this
            this.$http.get('/control/dinner/manage/index',
            {
                params: {
                    page: page,
                    day: day
                }
            })
            .then(function (response) {
                that.editInlineAndCellData = response.data.data.list
                that.total = response.data.data.page.total
                if(msg){
                    that.$Message.info(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        //获取菜单图片
        getFoodsImage(){
            let that = this
            this.$http.get('/control/dinner/manage/icon')
            .then((response)=>{
                that.imgList = response.data.data
            }).catch((error)=>{
                console.log(error)
            })
        },
        //选择图片
        chooseImg(){
            this.imgId = this.imgId
        },
        //取消图片
        unChooseImg(){
            this.imgId = ''
        },
        //放大图片
        handleView(path,id,index){
            this.imgPath = path
            this.imgId = id
            this.showImg = index
            // this.visible = true
            // this.showImg = true
        }

    },
    created () {
        this.getFoods(this.page,this.day)
        //获取快餐列表
        this.getData()
        this.getFoodsImage()
    },
};
</script>
