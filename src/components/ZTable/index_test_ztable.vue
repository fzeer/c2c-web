<!-- 使用封装的表格组件 -->
<template>
  <div>
    <!--
    config  配置
    loading 加载
    tableData 数据
    tableHeader 表头
    rowClassName 背景色
    handleSummaryMethod 共计
    handleRowClick 行点击
    handleSortChange 排序
    handleSpanMethod 合并单元格
    handleSelectionClick 选择
      :loading='loading'
      :tableData="tableData"
     -->
    <z-table
      ref='tableRef'
      :config="config"
      v-loading="loading"
      :data="tableData"
      :tableHeader="tableHeader"
      :row-class-name="rowClassName"
      :span-method="handleSpanMethod"
      :summary-method="handleSummaryMethod"
      @row-click='handleRowClick'
      @link-click='handleLinkClick'
      @sort-change='handleSortChange'
      @selection-change='handleSelectionClick'>
      <template slot="age" slot-scope="scope">
        <span @click.stop='onClick(scope.row)'>else</span>
      </template>
    </z-table>
  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      config: {
        isSelection: true,       //显示复选框
        isRowClick: false,       //使用行点击
        isStripe: false,         //隐藏斑马纹，与背景色不可同时用
        tableHeight: 500,        //表格高度
        isShowSummary: true,     //显示共计
        isIndex:false,           //自定义序号
      },
      tableHeader: [
        {
          prop: 'serialNo',
          colWidth: '55',
          title: '编码',
          type: 'customIndex',
          isSort:false,
        },
        {
          prop: 'name',       //字段
          colWidth: '140',    //宽度
          title: '名称',       //表头
          isSort:false,       //是否排序
          type: 'link',       //link:跳转,
        },						// button:文字按钮,
        // tag:标签,
        // process:进度条,
        // slot:插槽,
        // price:三位隔开,
        // priceLink:三位隔开&&跳转,
        // customIndex:自定义序号,
        // 无: 普通

        {
          prop: '',
          colWidth: '',
          title: '其他',
          type: '',
          isSort:false,
          children:[          //children  二级
            {
              prop: 'date',
              colWidth: '160',
              title: '日期-c',
              isSort:false
            },
            {

              prop: 'address',
              colWidth: '',
              title: '详细地址-c',
              isSort:false
            },
            {
              prop: 'price',
              colWidth: '140',
              title: '价格-c',
              type:'price',
              isSort:true
            },
            {
              prop: 'price',
              colWidth: '140',
              title: '价格-2-c',
              type:'priceLink',
              isSort:true
            },
          ]
        },
        {
          prop: 'age',
          colWidth: '100',
          title: '插槽',
          type: 'slot',
          isSort:false
        },
        {
          prop: 'status',
          colWidth: '100',
          title: '状态',
          type: 'tag',
          isSort:false
        },
        {
          prop: 'num',
          colWidth: '140',
          title: '进度',
          type: 'process',
          isRide: true,
          isSort:false
        },
        {
          prop: '',
          colWidth: '100',
          title: '详情',
          type: 'button',
          btnText: '查看',
          isSort:false
        }
      ],
      loading: false,
      tableData: [
        {
          id:2,
          date: '2016-06-04',
          name: '王小虎-2',
          address: '上海市普陀区金沙江路 1517 弄',
          status: false,
          num: 0.52,
          price: 10022,

        },
        {
          id:1,
          date: '2016-06-02',
          name: '王小虎-1',
          address: '上海市普陀区金沙江路 1518 弄',
          status: false,
          num: 0.7,
          price: 1000,
          color: 'green'
        },
        {
          id:1,
          date: '2016-06-02',
          name: '王小虎-1',
          address: '上海市普陀区金沙江路 1518 弄',
          status: false,
          num: 0.7,
          price: 1001,
          color: 'green'
        },
        {
          id:3,
          date: '2016-06-05',
          name: '王小虎-3',
          address: '上海市普陀区金沙江路 1519 弄',
          status: true,
          price: 156789,
          num: 0.67,
        }, {
          id:4,
          date: '2016-06-06',
          name: '王小虎-4',
          address: '上海市普陀区金沙江路 1516 弄',
          status: false,
          num: 0.43,
          price: 400,
          color: 'orange'
        }],
      spanList:[],  //合并单元格
      spanList2:[],
      orderList: [{ column: '', asc: false }],  // 默认, asc:false 倒序
      queryParams: {
        current: 1,
        size: 20
      },
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    onClick(row){
      console.log('插槽点击---->',row);
    },
    handleSortChange(value){

      //手动只能排序数字，还是需要通接口的
      const params = value.prop;
      if(value.order == 'descending'){
        this.tableData.sort((a,b)=>{
          return b[params] - a[params]
        })

      }else if(value.order == 'ascending'){
        this.tableData.sort((a,b)=>{
          return a[params] - b[params]
        })
      }
      this.getList();
      //通接口整理参数
      // switch (value.order) {
      // case 'ascending':
      //   this.orderList[0].column = value.prop;
      //   this.orderList[0].asc = true;
      //   break
      // case 'descending':
      //   this.orderList[0].column = value.prop;
      //   this.orderList[0].asc = false;
      //   break
      //  }
      //  this.getList();
    },
    getList(){
      this.queryParams = this.filterOrderItems( this.queryParams,this.orderList);
      this.getSpanArr(this.tableData);
    },
    getSpanArr(data) {
      this.spanList = [];
      let sIndex = 0;

      // let sIndex2 = 0;
      // this.spanList2 = [];

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanList.push(1);

          // this.spanList2.push(1);  //另一个字段合并
        } else {
          if (data[i].id === data[i - 1].id) {
            this.spanList[sIndex] ++
            this.spanList.push(0);
          } else {
            this.spanList.push(1);
            sIndex = i;
          }

          //if(data[i].pName == data[i -1 ].pName){
          //this.spanList2[sIndex2]++
          //this.spanList2.push(0);
          //}else{
          //this.spanList2.push(1);
          //sIndex2 = index;
          //}

        }
      }

      //序号值
      let serialNo = 0;
      for(let n in this.spanList){
        if(this.spanList[n] > 0){
          serialNo += 1;
          this.$set(data[n],'serialNo',serialNo);
        }
      }
    },
    handleSpanMethod({row,column,rowIndex,columnIndex}){
      // if (columnIndex != 1 && columnIndex < 7) {
      if (columnIndex < 7 ) {
        const _row = this.spanList[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      //else if (columnIndex == 8) {
      //const _row = this.spanList2[rowIndex];
      //const _col = _row > 0 ? 1 : 0;
      //return {
      //rowspan: _row,
      //colspan: _col
      //}
      //}
    },
    handleSummaryMethod(param) {
      const { columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          //只计算倒数第5列、第6列
        } else if (index === columns.length - 5 || index === columns.length - 6) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += '';
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      })
      return sums;
    },
    handleLinkClick(row, title) {
      if (title == '名称') {
        console.log('名称跳转====>', row.name);
      } else if (title == '详情') {
        console.log('详情跳转----->', row.name);
      } else if (title == '进度') {
        console.log('进度跳转----->', row.name);
      }else{
        console.log('跳转---->', title);
      }
    },
    handleSelectionClick(selection) {
      console.log('勾选---->', selection);
    },
    handleRowClick(row) {
      console.log('行点击---->', row);
    },
    //注：背景色与斑马纹不能同在
    rowClassName({row,rowIndex}) {
      row.index = rowIndex;
      if (row.color) return row.color + '-bg';
    },
    filterOrderItems(params, list) {
      for (const key in params) {
        if (key.indexOf('orders[') > -1) {
          delete params[key];
        }
      }
      if (list && list.length>0) {
        for (let i = 0; i < list.length; i++) {
          for (const key in list[i]) {
            params['orders[' + i + '].' + key] = list[i][key];
          }
        }
      }
      return params;
    }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .orange-bg {
  background-color: #e6a23c !important;
}

::v-deep .green-bg {
  background-color: #4cd964 !important;
}

::v-deep .red-bg {
  background-color: #f56c6c !important;
}
</style>
