<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="项目编号" prop="projectCode" >
        <el-input
          v-model="queryParams.projectCode"
          placeholder="请输入项目编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName" >
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易ID" prop="transactionId" >
        <el-input
          v-model="queryParams.transactionId"
          placeholder="请输入交易ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应用版本号" prop="appVersion"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.appVersion"
          placeholder="请输入应用版本号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易类型" prop="transactionType"  v-if="moreSearch" >
        <el-select v-model="queryParams.transactionType" placeholder="请选择交易类型" clearable>
          <el-option
            v-for="dict in dict.type.transaction_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="系统地址" prop="hexAddress"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.hexAddress"
          placeholder="请输入系统地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="系统地址" prop="viewAddress"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.viewAddress"
          placeholder="请输入系统地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对方地址" prop="otherHexAddress"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.otherHexAddress"
          placeholder="请输入对方地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对方地址" prop="otherViewAddress"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.otherViewAddress"
          placeholder="请输入对方地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易金额" prop="amount"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入交易金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易金额" prop="usdtBalance"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.usdtBalance"
          placeholder="请输入交易金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易金额" prop="trxBalance"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.trxBalance"
          placeholder="请输入交易金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商ID" prop="supplierId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplierId"
          placeholder="请输入码商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商名称" prop="supplierName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入码商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status"  v-if="moreSearch" >
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="监控消息类型" prop="msgType"  v-if="moreSearch" >
        <el-select v-model="queryParams.msgType" placeholder="请选择监控消息类型" clearable>
          <el-option
            v-for="dict in dict.type.crawl_msg_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="匹配状态" prop="matchYn"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.matchYn"
          placeholder="请输入匹配状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType"  v-if="moreSearch" >
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型" clearable>
          <el-option
            v-for="dict in dict.type.order_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="匹配订单号" prop="orderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入匹配订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户号" prop="merchantNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantNo"
          placeholder="请输入商户号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户名称" prop="merchantName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantName"
          placeholder="请输入商户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门ID" prop="deptId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入部门ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button :icon="moreSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" size="mini" @click="moreSearch = !moreSearch">{{moreSearch ? '收起条件' : '展开条件'}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['bank:usdtmessage:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bank:usdtmessage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bank:usdtmessage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bank:usdtmessage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="usdtmessageList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="msgId" />
      <el-table-column label="项目编号" align="center" prop="projectCode" show-overflow-tooltip />
      <el-table-column label="项目名称" align="center" prop="projectName" show-overflow-tooltip />
      <el-table-column label="交易ID" align="center" prop="transactionId" show-overflow-tooltip />
      <el-table-column label="应用版本号" align="center" prop="appVersion" show-overflow-tooltip />
      <el-table-column label="交易类型" align="center" prop="transactionType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.transaction_type" :value="scope.row.transactionType"/>
        </template>
      </el-table-column>
      <el-table-column label="系统地址" align="center" prop="hexAddress" show-overflow-tooltip />
      <el-table-column label="系统地址" align="center" prop="viewAddress" show-overflow-tooltip />
      <el-table-column label="对方地址" align="center" prop="otherHexAddress" show-overflow-tooltip />
      <el-table-column label="对方地址" align="center" prop="otherViewAddress" show-overflow-tooltip />
      <el-table-column label="交易金额" align="center" prop="amount" show-overflow-tooltip />
     <el-table-column label="交易金额" align="right" prop="usdtBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.usdtBalance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="交易金额" align="right" prop="trxBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.trxBalance) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="码商ID" align="center" prop="supplierId" show-overflow-tooltip />
      <el-table-column label="码商名称" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="监控消息类型" align="center" prop="msgType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.crawl_msg_type" :value="scope.row.msgType"/>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" align="center" prop="msgContent" show-overflow-tooltip />
      <el-table-column label="匹配状态" align="center" prop="matchYn" show-overflow-tooltip />
      <el-table-column label="解析时间" align="center" prop="matchTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.matchTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" prop="orderType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_type" :value="scope.row.orderType"/>
        </template>
      </el-table-column>
      <el-table-column label="匹配订单号" align="center" prop="orderCode" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户名称" align="center" prop="merchantName" show-overflow-tooltip />
      <el-table-column label="部门ID" align="center" prop="deptId" show-overflow-tooltip />
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="120" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bank:usdtmessage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:usdtmessage:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改USDT消息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目编号" prop="projectCode">
          <el-input v-model="form.projectCode" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="交易ID" prop="transactionId">
          <el-input v-model="form.transactionId" placeholder="请输入交易ID" />
        </el-form-item>
        <el-form-item label="应用版本号" prop="appVersion">
          <el-input v-model="form.appVersion" placeholder="请输入应用版本号" />
        </el-form-item>
        <el-form-item label="交易类型" prop="transactionType">
          <el-select v-model="form.transactionType" placeholder="请选择交易类型">
            <el-option
              v-for="dict in dict.type.transaction_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统地址" prop="hexAddress">
          <el-input v-model="form.hexAddress" placeholder="请输入系统地址" />
        </el-form-item>
        <el-form-item label="系统地址" prop="viewAddress">
          <el-input v-model="form.viewAddress" placeholder="请输入系统地址" />
        </el-form-item>
        <el-form-item label="对方地址" prop="otherHexAddress">
          <el-input v-model="form.otherHexAddress" placeholder="请输入对方地址" />
        </el-form-item>
        <el-form-item label="对方地址" prop="otherViewAddress">
          <el-input v-model="form.otherViewAddress" placeholder="请输入对方地址" />
        </el-form-item>
        <el-form-item label="交易金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入交易金额" />
        </el-form-item>
        <el-form-item label="交易金额" prop="usdtBalance">
          <el-input v-model="form.usdtBalance" placeholder="请输入交易金额" />
        </el-form-item>
        <el-form-item label="交易金额" prop="trxBalance">
          <el-input v-model="form.trxBalance" placeholder="请输入交易金额" />
        </el-form-item>
        <el-form-item label="码商ID" prop="supplierId">
          <el-input v-model="form.supplierId" placeholder="请输入码商ID" />
        </el-form-item>
        <el-form-item label="码商名称" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入码商名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="监控消息类型" prop="msgType">
          <el-select v-model="form.msgType" placeholder="请选择监控消息类型">
            <el-option
              v-for="dict in dict.type.crawl_msg_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容">
          <editor v-model="form.msgContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="匹配状态" prop="matchYn">
          <el-input v-model="form.matchYn" placeholder="请输入匹配状态" />
        </el-form-item>
        <el-form-item label="解析时间" prop="matchTime">
          <el-date-picker clearable
            v-model="form.matchTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择解析时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单类型">
            <el-option
              v-for="dict in dict.type.order_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="匹配订单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入匹配订单号" />
        </el-form-item>
        <el-form-item label="商户号" prop="merchantNo">
          <el-input v-model="form.merchantNo" placeholder="请输入商户号" />
        </el-form-item>
        <el-form-item label="商户名称" prop="merchantName">
          <el-input v-model="form.merchantName" placeholder="请输入商户名称" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUsdtmessage, getUsdtmessage, delUsdtmessage, addUsdtmessage, updateUsdtmessage } from "@/api/bank/usdtmessage";

export default {
  name: "Usdtmessage",
  dicts: ['crawl_msg_type', 'transaction_type', 'order_type', 'sys_normal_disable'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示更多筛选项
      moreSearch: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // USDT消息表格数据
      usdtmessageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectCode: null,
        projectName: null,
        transactionId: null,
        appVersion: null,
        transactionType: null,
        hexAddress: null,
        viewAddress: null,
        otherHexAddress: null,
        otherViewAddress: null,
        amount: null,
        usdtBalance: null,
        trxBalance: null,
        supplierId: null,
        supplierName: null,
        status: null,
        msgType: null,
        msgContent: null,
        matchYn: null,
        matchTime: null,
        orderType: null,
        orderCode: null,
        merchantNo: null,
        merchantName: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        transactionId: [
          { required: true, message: "交易ID不能为空", trigger: "blur" }
        ],
        orderCode: [
          { required: true, message: "匹配订单号不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商户号不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询USDT消息列表 */
    getList() {
      this.loading = true;
      listUsdtmessage(this.queryParams).then(response => {
        this.usdtmessageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        msgId: null,
        projectCode: null,
        projectName: null,
        transactionId: null,
        appVersion: null,
        transactionType: null,
        hexAddress: null,
        viewAddress: null,
        otherHexAddress: null,
        otherViewAddress: null,
        amount: null,
        usdtBalance: null,
        trxBalance: null,
        supplierId: null,
        supplierName: null,
        status: "0",
        msgType: null,
        msgContent: null,
        matchYn: null,
        matchTime: null,
        orderType: null,
        orderCode: null,
        merchantNo: null,
        merchantName: null,
        deptId: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.msgId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加USDT消息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const msgId = row.msgId || this.ids
      getUsdtmessage(msgId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改USDT消息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.msgId != null) {
            updateUsdtmessage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUsdtmessage(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const msgIds = row.msgId || this.ids;
      this.$modal.confirm('是否确认删除USDT消息编号为"' + msgIds + '"的数据项？').then(function() {
        return delUsdtmessage(msgIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/usdtmessage/export', {
        ...this.queryParams
      }, `usdtmessage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
