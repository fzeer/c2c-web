<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="银行ID" prop="bankId" >
        <el-input
          v-model="queryParams.bankId"
          placeholder="请输入银行ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCode" >
        <el-input
          v-model="queryParams.bankCode"
          placeholder="请输入银行卡号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName" >
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
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
          v-hasPermi="['bank:collectionbanklog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="collectionbanklogList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="id" />
      <el-table-column label="银行ID" align="center" prop="bankId" />
      <el-table-column label="银行卡号" align="center" prop="bankCode" />
      <el-table-column label="银行名称" align="center" prop="bankName" />
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
            v-hasPermi="['bank:collectionbanklog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:collectionbanklog:remove']"
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

    <!-- 添加或修改银行流水对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="银行ID" prop="bankId">
          <el-input v-model="form.bankId" placeholder="请输入银行ID" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" />
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
import { listCollectionbanklog, getCollectionbanklog, delCollectionbanklog, addCollectionbanklog, updateCollectionbanklog } from "@/api/bank/collectionbanklog";

export default {
  name: "Collectionbanklog",
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
      // 银行流水表格数据
      collectionbanklogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bankId: null,
        bankCode: null,
        bankName: null,
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
        bankId: [
          { required: true, message: "银行ID不能为空", trigger: "blur" }
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
    /** 查询银行流水列表 */
    getList() {
      this.loading = true;
      listCollectionbanklog(this.queryParams).then(response => {
        this.collectionbanklogList = response.rows;
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
        bankId: null,
        bankCode: null,
        bankName: null,
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
      this.title = "添加银行流水";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCollectionbanklog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改银行流水";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCollectionbanklog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCollectionbanklog(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除银行流水编号为"' + ids + '"的数据项？').then(function() {
        return delCollectionbanklog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/collectionbanklog/export', {
        ...this.queryParams
      }, `collectionbanklog_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
