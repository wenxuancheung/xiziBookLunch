export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const table1Data = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineColumns = [
    {
        title: '菜名',
        align: 'center',
        key: 'name',
        width: 200,
        editable: true
    },
    {
        title: '员工应付价格',
        align: 'center',
        width : 150,
        key: 'price'
    },
    {
        title: '公司应付价格',
        align: 'center',
        key: 'public_price',
        width: 150,
        editable: true
    },
    {
        title: '日期（格式20180520）',
        type: 'day',
        width: 80,
        align: 'center'
    },
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editIncellColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 120,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 160,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const editIncellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];
export const todayMenuColumn =[
    {
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
        title: '价格',
        align: 'center',
        key: 'price'
    },
    {
        title: '总价',
        align: 'center',
        key: 'public_price',

    },
    {
        title:'时间',
        align: 'center',
        key : 'day'
    },
]
export const editInlineAndCellColumn = [
    {
        title: 'id',
        key : 'id',
        maxWidth: 500,
        align: 'center',
    },
    {
        title: '菜名',
        align: 'center',
        key: 'name',
        maxWidth:500,
    },
    {
        title: '员工应付金额',
        align: 'center',
        maxWidth: 500,
        key: 'price',
    },
    {
        title: '公司应付金额',
        align: 'center',
        maxWidth: 500,
        key: 'public_price',
    },
    {
        title:'时间',
        align: 'center',
        maxWidth: 500,
        key : 'day',
    },
    {
        title: '操作',
        align: 'center',
        maxWidth: 500,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

// export const editInlineAndCellData = [
//     {
//         name: 'Aresn',
//         sex: '男',
//         work: '前端开发'
//     },
//     {
//         name: 'Lison',
//         sex: '男',
//         work: '前端开发'
//     },
//     {
//         name: 'lisa',
//         sex: '女',
//         work: '程序员鼓励师'
//     }
// ];
export const todayDataColumn = [
    {
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
        handle: ['delete']
    }
];
export const todayDataFoodsCountColumn =[
    {
        title: '菜名',
        align: 'center',
        key: 'name',
    },
    {
        title: '数量',
        align: 'center',
        key: 'count',
    }
];
export const todayDataCompanyColumn = [
    {
        title: '公司名',
        align: 'center',
        key: 'company',
        maxWidth: 500,
    },
    {
        title:'累计数量',
        align: 'center',
        maxWidth: 500,
        key : 'count'
    },
    {
        title:'员工应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_price'
    },
    {
        title: '公司应付金额',
        align: 'center',
        maxWidth: 500,
        key: 'total_public_price',
    },
];
export const todayDataCountColumn = [
    {
        title: '总量',
        align: 'center',
        key: 'count',
        maxWidth: 500,

    },
    {
        title:'员工应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_price'
    },
    {
        title:'公司应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_public_price'
    },
    {
        title: '累计金额',
        align: 'center',
        maxWidth: 500,
        key: 'all_count',
    },
];
export const orderCountColums = [
    {
        title: '姓名',
        align: 'center',
        key: 'name',
    },
    {
        title:'公司',
        align: 'center',
        key : 'company'
    },
    {
        title:'累计数量',
        align: 'center',
        key : 'count',
        sortable: true
    },
    {
        title: '员工应付金额',
        align: 'center',
        key: 'total_price',
        sortable: true
    },
    {
        title: '公司应付金额',
        align: 'center',
        key: 'total_public_price',
        sortable: true
    },
];
export const orderCompanyCountColums = [
    {
        title: '公司名',
        align: 'center',
        key: 'company',
        maxWidth: 500,
    },
    {
        title:'累计数量',
        align: 'center',
        maxWidth: 500,
        key : 'count'
    },
    {
        title:'员工应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_price'
    },
    {
        title: '公司应付金额',
        align: 'center',
        maxWidth: 500,
        key: 'total_public_price',
    },
];
export const orderAllCountColums =[
    {
        title: '总量',
        align: 'center',
        key: 'count',
        maxWidth: 500,
    },
    {
        title:'员工应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_price'
    },
    {
        title:'公司应付金额',
        align: 'center',
        maxWidth: 500,
        key : 'total_public_price'
    },
    {
        title: '累计金额',
        align: 'center',
        maxWidth: 500,
        key: 'all_count',
    },
];
export const orderListColumn = [

];

// export const showCurrentColumns = [
//     {
//         title: '序号',
//         type: 'index',
//         width: 80,
//         align: 'center'
//     },
//     {
//         title: '姓名',
//         align: 'center',
//         key: 'name',
//         width: 300,
//         editable: true
//     },
//     {
//         title: '性别',
//         align: 'center',
//         key: 'sex'
//     },
//     {
//         title: '岗位',
//         align: 'center',
//         width: 300,
//         key: 'work',
//         editable: true
//     }
// ];

const tableData = {
    table1Columns: table1Columns,
    table1Data: table1Data,
    editInlineColumns: editInlineColumns,
    editInlineData: editInlineData,
    editIncellColumns: editIncellColumns,
    editIncellData: editIncellData,
    editInlineAndCellColumn: editInlineAndCellColumn,
    // editInlineAndCellData: editInlineAndCellData,
    // showCurrentColumns: showCurrentColumns,
    todayMenuColumn : todayMenuColumn,
    todayDataColumn : todayDataColumn,
    todayDataCompanyColumn : todayDataCompanyColumn,
    todayDataCountColumn : todayDataCountColumn,
    orderCountColums : orderCountColums,
    orderCompanyCountColums : orderCompanyCountColums,
    orderAllCountColums : orderAllCountColums,
    orderListColumn : orderListColumn,
    todayDataFoodsCountColumn : todayDataFoodsCountColumn
};

export default tableData;
