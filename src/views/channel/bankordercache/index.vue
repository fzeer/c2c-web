<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="订单编号" prop="orderCode" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType" >
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型" clearable>
          <el-option
            v-for="dict in dict.type.order_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收款账号" prop="accountNo" >
        <el-input
          v-model="queryParams.accountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款链接" prop="payLink"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.payLink"
          placeholder="请输入收款链接"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际金额" prop="amount"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入实际金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="status"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.status"
          placeholder="请输入订单状态"
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
          v-hasPermi="['channel:bankordercache:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['channel:bankordercache:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['channel:bankordercache:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['channel:bankordercache:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="bankordercacheList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="cacheId" />
      <el-table-column label="订单编号" align="center" prop="orderCode" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="订单类型" align="center" prop="orderType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_type" :value="scope.row.orderType"/>
        </template>
      </el-table-column>
      <el-table-column label="收款账号" align="center" prop="accountNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="收款链接" align="center" prop="payLink" show-overflow-tooltip />
      <el-table-column label="实际金额" align="center" prop="amount" show-overflow-tooltip />
      <el-table-column label="失效时间" align="center" prop="expiredTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiredTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="status" show-overflow-tooltip />
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
            v-hasPermi="['channel:bankordercache:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['channel:bankordercache:remove']"
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

    <!-- 添加或修改收款账户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入订单编号" />
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
        <el-form-item label="收款账号" prop="accountNo">
          <el-input v-model="form.accountNo" placeholder="请输入收款账号" />
        </el-form-item>
        <el-form-item label="收款链接" prop="payLink">
          <el-input v-model="form.payLink" placeholder="请输入收款链接" />
        </el-form-item>
        <el-form-item label="实际金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入实际金额" />
        </el-form-item>
        <el-form-item label="失效时间" prop="expiredTime">
          <el-date-picker clearable
            v-model="form.expiredTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input v-model="form.status" placeholder="请输入订单状态" />
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
import { listBankordercache, getBankordercache, delBankordercache, addBankordercache, updateBankordercache } from "@/api/channel/bankordercache";

export default {
  name: "Bankordercache",
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
      // 收款账户表格数据
      bankordercacheList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderCode: null,
        orderType: null,
        accountNo: null,
        payLink: null,
        amount: null,
        expiredTime: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderCode: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        accountNo: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "订单状态(0-订单生成, 1-支付中)不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询收款账户列表 */
    getList() {
      this.loading = true;
      listBankordercache(this.queryParams).then(response => {
        this.bankordercacheList = response.rows;
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
        cacheId: null,
        orderCode: null,
        orderType: null,
        accountNo: null,
        payLink: null,
        amount: null,
        expiredTime: null,
        status: null,
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
      this.ids = selection.map(item => item.cacheId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加收款账户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cacheId = row.cacheId || this.ids
      getBankordercache(cacheId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收款账户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cacheId != null) {
            updateBankordercache(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBankordercache(this.form).then(response => {
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
      const cacheIds = row.cacheId || this.ids;
      this.$modal.confirm('是否确认删除收款账户编号为"' + cacheIds + '"的数据项？').then(function() {
        return delBankordercache(cacheIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('channel/bankordercache/export', {
        ...this.queryParams
      }, `bankordercache_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
