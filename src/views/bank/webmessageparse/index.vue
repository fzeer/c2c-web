<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="消息ID" prop="msgId" >
        <el-input
          v-model="queryParams.msgId"
          placeholder="请输入消息ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流水号" prop="lotNo" >
        <el-input
          v-model="queryParams.lotNo"
          placeholder="请输入流水号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流水号" prop="refNo" >
        <el-input
          v-model="queryParams.refNo"
          placeholder="请输入流水号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="money"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.money"
          placeholder="请输入金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="余额" prop="balance"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.balance"
          placeholder="请输入余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="匹配状态" prop="matchStatus"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.matchStatus"
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
      <el-form-item label="卡商号" prop="supplierNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplierNo"
          placeholder="请输入卡商号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卡商号" prop="supplierName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入卡商号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卡商UPI" prop="supplierUpi"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplierUpi"
          placeholder="请输入卡商UPI"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对方UPI" prop="userUpi"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.userUpi"
          placeholder="请输入对方UPI"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="UTR" prop="utr"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.utr"
          placeholder="请输入UTR"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['bank:webmessageparse:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bank:webmessageparse:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bank:webmessageparse:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bank:webmessageparse:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="webmessageparseList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="消息ID" align="center" prop="msgId" />
      <el-table-column label="流水号" align="center" prop="lotNo" min-width="100" sortable />
      <el-table-column label="流水号" align="center" prop="refNo" min-width="100" sortable />
      <el-table-column label="金额" align="center" prop="money" min-width="100" sortable />
      <el-table-column label="余额" align="center" prop="balance" min-width="100" sortable />
      <el-table-column label="匹配状态" align="center" prop="matchStatus" />
      <el-table-column label="解析时间" align="center" prop="matchTime" sortable>
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.matchTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" prop="orderType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_type" :value="scope.row.orderType"/>
        </template>
      </el-table-column>
      <el-table-column label="卡商号" align="center" prop="supplierNo" min-width="100" sortable />
      <el-table-column label="卡商号" align="center" prop="supplierName" />
      <el-table-column label="卡商UPI" align="center" prop="supplierUpi" />
      <el-table-column label="对方UPI" align="center" prop="userUpi" />
      <el-table-column label="UTR" align="center" prop="utr" />
      <el-table-column label="匹配订单号" align="center" prop="orderCode" min-width="100" sortable />
      <el-table-column label="商户号" align="center" prop="merchantNo" min-width="100" sortable />
      <el-table-column label="商户名称" align="center" prop="merchantName" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bank:webmessageparse:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:webmessageparse:remove']"
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

    <!-- 添加或修改银行消息解析对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="消息ID" prop="msgId">
          <el-input v-model="form.msgId" placeholder="请输入消息ID" />
        </el-form-item>
        <el-form-item label="流水号" prop="lotNo">
          <el-input v-model="form.lotNo" placeholder="请输入流水号" />
        </el-form-item>
        <el-form-item label="流水号" prop="refNo">
          <el-input v-model="form.refNo" placeholder="请输入流水号" />
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="匹配状态" prop="matchStatus">
          <el-input v-model="form.matchStatus" placeholder="请输入匹配状态" />
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
        <el-form-item label="卡商号" prop="supplierNo">
          <el-input v-model="form.supplierNo" placeholder="请输入卡商号" />
        </el-form-item>
        <el-form-item label="卡商号" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入卡商号" />
        </el-form-item>
        <el-form-item label="卡商UPI" prop="supplierUpi">
          <el-input v-model="form.supplierUpi" placeholder="请输入卡商UPI" />
        </el-form-item>
        <el-form-item label="对方UPI" prop="userUpi">
          <el-input v-model="form.userUpi" placeholder="请输入对方UPI" />
        </el-form-item>
        <el-form-item label="UTR" prop="utr">
          <el-input v-model="form.utr" placeholder="请输入UTR" />
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
import { listWebmessageparse, getWebmessageparse, delWebmessageparse, addWebmessageparse, updateWebmessageparse } from "@/api/bank/webmessageparse";

export default {
  name: "Webmessageparse",
  dicts: ['order_type'],
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
      // 银行消息解析表格数据
      webmessageparseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        msgId: null,
        lotNo: null,
        refNo: null,
        money: null,
        balance: null,
        matchStatus: null,
        matchTime: null,
        orderType: null,
        supplierNo: null,
        supplierName: null,
        supplierUpi: null,
        userUpi: null,
        utr: null,
        orderCode: null,
        merchantNo: null,
        merchantName: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        msgId: [
          { required: true, message: "消息ID不能为空", trigger: "blur" }
        ],
        lotNo: [
          { required: true, message: "流水号不能为空", trigger: "blur" }
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
    /** 查询银行消息解析列表 */
    getList() {
      this.loading = true;
      listWebmessageparse(this.queryParams).then(response => {
        this.webmessageparseList = response.rows;
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
        id: null,
        msgId: null,
        lotNo: null,
        refNo: null,
        money: null,
        balance: null,
        matchStatus: null,
        matchTime: null,
        orderType: null,
        supplierNo: null,
        supplierName: null,
        supplierUpi: null,
        userUpi: null,
        utr: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加银行消息解析";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWebmessageparse(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改银行消息解析";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWebmessageparse(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWebmessageparse(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除银行消息解析编号为"' + ids + '"的数据项？').then(function() {
        return delWebmessageparse(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/webmessageparse/export', {
        ...this.queryParams
      }, `webmessageparse_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
