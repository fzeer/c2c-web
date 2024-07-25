<!-- 封装表格 -->
<!--  参考  https://blog.csdn.net/weixin_46899191/article/details/131110825?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-131110825-blog-130348654.235%5Ev43%5Epc_blog_bottom_relevance_base1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-131110825-blog-130348654.235%5Ev43%5Epc_blog_bottom_relevance_base1&utm_relevant_index=11-->
<template>
  <!-- :data="tableData"
  v-loading='loading' -->
  <div>
    <el-table
      v-bind="$attrs"
      border
      style="width: 100%"
      :header-cell-style="{ background:'#f5f5f5',height:'40px',color:'#515a6e'}"
      :style="`height:${config.tableHeight}px;width: 100%`"
      :max-height="config.tableHeight"
      :stripe="config.isStripe"
      :span-method="spanMethod"
      :row-class-name="rowClassName"
      :summary-method="summaryMethod"
      :show-summary='config.isShowSummary'
      @row-click="rowClick"
      @sort-change="sortChange"
      @selection-change="selectionChange">
      <el-table-column align='center' type="selection" width="55" v-if="config.isSelection" />
      <el-table-column align='center' type="index" label="序号" width="55" v-if="config.isIndex"/>
      <el-table-column align='center'
                       v-for='(item,index) in tableHeader'
                       :key='index'
                       :prop="item.prop"
                       :width="item.colWidth"
                       :label="item.title"
                       :sortable="item.isSort?'custom':false"
                       show-overflow-tooltip>
        <!-- 一级 -->
        <template slot-scope="scope">
          <template v-if="item.type === 'customIndex'">
            <span>{{scope.row[item.prop]}}</span>
          </template>
          <template v-else-if="item.type === 'link'">
            <el-link type="primary" @click.stop="linkClick(scope.row,item.title)">{{scope.row[item.prop]}}</el-link>
          </template>
          <template v-else-if="item.type === 'button'">
            <el-button type="text" size='mini' @click.stop="linkClick(scope.row,item.title)">{{item.btnText}}</el-button>
          </template>
          <template v-else-if="item.type === 'tag'">
            <el-tag :type="scope.row[item.prop]?'':'danger'">{{scope.row[item.prop]?'是':'否'}}</el-tag>
          </template>
          <template v-else-if="item.type === 'price'">
            <span>{{ handleNum(Number(scope.row[item.prop])) }}</span>
          </template>
          <template v-else-if="item.type === 'priceLink'">
            <el-link type="primary" @click.stop="linkClick(scope.row,item.title)">{{ handleNum(Number(scope.row[item.prop])) }}</el-link>
          </template>
          <template v-else-if="item.type === 'process'">
                    <span @click.stop="linkClick(scope.row,item.title)">
                        <!-- 当0.07*100结果是7.000000000000001 -->
                        <el-progress :percentage="item.isRide?Number(scope.row[item.prop])*10/10*100:Number(scope.row[item.prop])*10/10"  :text-inside="true" :stroke-width="13"></el-progress>
                    </span>
          </template>
          <!-- 插槽 -->
          <slot v-else-if="item.type === 'slot'"  :name="item.prop"  :row="scope.row" :index="scope.$index"></slot>
          <template v-else>
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </template>

        <!-- 二级 子项 -->
        <template v-for='(v,i) in item.children'>
          <el-table-column align='center'
                           :key='i'
                           :prop="v.prop"
                           :width="v.colWidth"
                           :label="v.title"
                           :sortable="v.isSort?'custom':false"
                           show-overflow-tooltip>
            <template slot-scope="scope" @click.stop>
              <template v-if="v.type === 'link'">
                <el-link type="primary" @click.stop="linkClick(scope.row,v.title)">{{scope.row[v.prop]}}</el-link>
              </template>
              <template v-else-if="v.type === 'button'">
                <el-button type="text" size='mini' @click.stop="linkClick(scope.row,v.title)">{{v.btnText}}</el-button>
              </template>
              <template v-else-if="v.type === 'tag'">
                <el-tag :type="scope.row[v.prop]?'':'danger'">{{scope.row[v.prop]?'是':'否'}}</el-tag>
              </template>
              <template v-else-if="v.type === 'price'">
                <span>{{ handleNum(Number(scope.row[v.prop])) }}</span>
              </template>
              <template v-else-if="v.type === 'priceLink'">
                <el-link type="primary" @click.stop="linkClick(scope.row,v.title)">{{ handleNum(Number(scope.row[v.prop])) }}</el-link>
              </template>
              <template v-else-if="v.type === 'process'">
                            <span @click.stop="linkClick(scope.row,v.title)">
                                <el-progress :percentage="v.isRide?Number(scope.row[v.prop])*10/10*100:Number(scope.row[v.prop])*10/10"  :text-inside="true" :stroke-width="13"></el-progress>
                            </span>
              </template>
              <template v-else>
                <span>{{scope.row[v.prop]}}</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ZTable",
  props: {
    config:{},
    rowClassName: {
      type: Function
    },
    summaryMethod:{
      type: Function
    },
    spanMethod:{
      type: Function
    },
    tableHeader:{
      type: Array,
      default: () => [],
    },
    loading: Boolean,
    tableData:{
      type: Array,
      default: () => [],
    },

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    linkClick(row,title){
      this.$emit('link-click', row, title);
    },
    selectionChange(selection) {
      this.$emit('selection-change', selection);
    },
    rowClick(row) {
      if(this.config.isRowClick) this.$emit('row-click', row);
    },
    sortChange(value) {
      if(value.order) this.$emit('sort-change', value);
    },
    handleNum(num){
      //(1)保留两位小数
      var dot = String(num).indexOf(".");
      if(dot != -1){
        var dotCnt = String(num).substring(dot+1,num.length);
        if(dotCnt.length > 2)  num = num.toFixed(2);
      }
      //(2)四舍五入取整数
      // num = Math.round(num)
      //三位隔开
      return String(num).replace(/\d+/, function(n) {
        return  n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      });
    }

  }

}
</script>
