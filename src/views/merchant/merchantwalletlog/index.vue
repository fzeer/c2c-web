<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="钱包ID" prop="walletId" >
        <el-input
          v-model="queryParams.walletId"
          placeholder="请输入钱包ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商ID" prop="merchantId" >
        <el-input
          v-model="queryParams.merchantId"
          placeholder="请输入码商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商名称" prop="merchantName" >
        <el-input
          v-model="queryParams.merchantName"
          placeholder="请输入码商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务类型" prop="bizType"  v-if="moreSearch" >
        <el-select v-model="queryParams.bizType" placeholder="请选择业务类型" clearable>
          <el-option
            v-for="dict in dict.type.agent_biz_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务描述" prop="bizDesc"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bizDesc"
          placeholder="请输入业务描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务单号" prop="orderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入业务单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变动金额" prop="money"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.money"
          placeholder="请输入变动金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="冻结金额" prop="frozeMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.frozeMoney"
          placeholder="请输入冻结金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变动前金额" prop="beforeMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.beforeMoney"
          placeholder="请输入变动前金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变动后金额" prop="afterMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.afterMoney"
          placeholder="请输入变动后金额"
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
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['merchant:merchantwalletlog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="merchantwalletlogList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商户ID" align="center" prop="id" />
      <el-table-column label="钱包ID" align="center" prop="walletId" />
      <el-table-column label="码商ID" align="center" prop="merchantId" />
      <el-table-column label="码商名称" align="center" prop="merchantName" />
      <el-table-column label="业务类型" align="center" prop="bizType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.agent_biz_type" :value="scope.row.bizType"/>
        </template>
      </el-table-column>
      <el-table-column label="业务描述" align="center" prop="bizDesc" />
      <el-table-column label="业务单号" align="center" prop="orderCode" min-width="100" sortable />
      <el-table-column label="变动金额" align="center" prop="money" min-width="100" sortable />
      <el-table-column label="冻结金额" align="center" prop="frozeMoney" min-width="100" sortable />
      <el-table-column label="变动前金额" align="center" prop="beforeMoney" min-width="100" sortable />
      <el-table-column label="变动后金额" align="center" prop="afterMoney" min-width="100" sortable />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['merchant:merchantwalletlog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['merchant:merchantwalletlog:remove']"
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

    <!-- 添加或修改商户资金流水对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="钱包ID" prop="walletId">
          <el-input v-model="form.walletId" placeholder="请输入钱包ID" />
        </el-form-item>
        <el-form-item label="码商ID" prop="merchantId">
          <el-input v-model="form.merchantId" placeholder="请输入码商ID" />
        </el-form-item>
        <el-form-item label="码商名称" prop="merchantName">
          <el-input v-model="form.merchantName" placeholder="请输入码商名称" />
        </el-form-item>
        <el-form-item label="业务类型" prop="bizType">
          <el-select v-model="form.bizType" placeholder="请选择业务类型">
            <el-option
              v-for="dict in dict.type.agent_biz_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务描述" prop="bizDesc">
          <el-input v-model="form.bizDesc" placeholder="请输入业务描述" />
        </el-form-item>
        <el-form-item label="业务单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入业务单号" />
        </el-form-item>
        <el-form-item label="变动金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入变动金额" />
        </el-form-item>
        <el-form-item label="冻结金额" prop="frozeMoney">
          <el-input v-model="form.frozeMoney" placeholder="请输入冻结金额" />
        </el-form-item>
        <el-form-item label="变动前金额" prop="beforeMoney">
          <el-input v-model="form.beforeMoney" placeholder="请输入变动前金额" />
        </el-form-item>
        <el-form-item label="变动后金额" prop="afterMoney">
          <el-input v-model="form.afterMoney" placeholder="请输入变动后金额" />
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
import { listMerchantwalletlog, getMerchantwalletlog, delMerchantwalletlog, addMerchantwalletlog, updateMerchantwalletlog } from "@/api/merchant/merchantwalletlog";

export default {
  name: "Merchantwalletlog",
  dicts: ['agent_biz_type'],
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
      // 商户资金流水表格数据
      merchantwalletlogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        walletId: null,
        merchantId: null,
        merchantName: null,
        bizType: null,
        bizDesc: null,
        orderCode: null,
        money: null,
        frozeMoney: null,
        beforeMoney: null,
        afterMoney: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        walletId: [
          { required: true, message: "钱包ID不能为空", trigger: "blur" }
        ],
        merchantId: [
          { required: true, message: "码商ID不能为空", trigger: "blur" }
        ],
        bizType: [
          { required: true, message: "业务类型(20=跑分进账，21=人工调整，22=冻结)不能为空", trigger: "change" }
        ],
        orderCode: [
          { required: true, message: "业务单号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询商户资金流水列表 */
    getList() {
      this.loading = true;
      listMerchantwalletlog(this.queryParams).then(response => {
        this.merchantwalletlogList = response.rows;
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
        walletId: null,
        merchantId: null,
        merchantName: null,
        bizType: null,
        bizDesc: null,
        orderCode: null,
        money: null,
        frozeMoney: null,
        beforeMoney: null,
        afterMoney: null,
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
      this.title = "添加商户资金流水";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMerchantwalletlog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户资金流水";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMerchantwalletlog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMerchantwalletlog(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商户资金流水编号为"' + ids + '"的数据项？').then(function() {
        return delMerchantwalletlog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('merchant/merchantwalletlog/export', {
        ...this.queryParams
      }, `merchantwalletlog_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
