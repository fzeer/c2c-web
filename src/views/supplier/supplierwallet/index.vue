<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="码商ID" prop="supplierId" >
        <el-input
          v-model="queryParams.supplierId"
          placeholder="请输入码商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="钱包编号" prop="walletNo" >
        <el-input
          v-model="queryParams.walletNo"
          placeholder="请输入钱包编号"
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
      <el-form-item label="可用余额" prop="availBalance"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.availBalance"
          placeholder="请输入可用余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="冻结金额" prop="frozeBalance"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.frozeBalance"
          placeholder="请输入冻结金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当日进款" prop="todayMoneyIn"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.todayMoneyIn"
          placeholder="请输入当日进款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当日出款" prop="todayMoneyOut"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.todayMoneyOut"
          placeholder="请输入当日出款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计进款" prop="totalMoneyIn"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.totalMoneyIn"
          placeholder="请输入累计进款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计出款" prop="totalMoneyOut"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.totalMoneyOut"
          placeholder="请输入累计出款"
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
          v-hasPermi="['supplier:supplierwallet:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['supplier:supplierwallet:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['supplier:supplierwallet:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['supplier:supplierwallet:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="supplierwalletList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="钱包ID" align="center" prop="walletId" />
      <el-table-column label="码商ID" align="center" prop="supplierId" show-overflow-tooltip />
      <el-table-column label="钱包编号" align="center" prop="walletNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="动账时间戳" align="center" prop="timestamp" show-overflow-tooltip />
     <el-table-column label="余额" align="right" prop="balance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.balance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="可用余额" align="right" prop="availBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.availBalance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="冻结金额" align="right" prop="frozeBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.frozeBalance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="当日进款" align="right" prop="todayMoneyIn" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.todayMoneyIn) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="当日出款" align="right" prop="todayMoneyOut" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.todayMoneyOut) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="累计进款" align="right" prop="totalMoneyIn" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.totalMoneyIn) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="累计出款" align="right" prop="totalMoneyOut" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.totalMoneyOut) }}</span>
       </template>
     </el-table-column>
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
            v-hasPermi="['supplier:supplierwallet:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['supplier:supplierwallet:remove']"
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

    <!-- 添加或修改码商钱包对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="码商ID" prop="supplierId">
          <el-input v-model="form.supplierId" placeholder="请输入码商ID" />
        </el-form-item>
        <el-form-item label="钱包编号" prop="walletNo">
          <el-input v-model="form.walletNo" placeholder="请输入钱包编号" />
        </el-form-item>
        <el-form-item label="动账时间戳" prop="timestamp">
          <el-input v-model="form.timestamp" placeholder="请输入动账时间戳" />
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="可用余额" prop="availBalance">
          <el-input v-model="form.availBalance" placeholder="请输入可用余额" />
        </el-form-item>
        <el-form-item label="冻结金额" prop="frozeBalance">
          <el-input v-model="form.frozeBalance" placeholder="请输入冻结金额" />
        </el-form-item>
        <el-form-item label="当日进款" prop="todayMoneyIn">
          <el-input v-model="form.todayMoneyIn" placeholder="请输入当日进款" />
        </el-form-item>
        <el-form-item label="当日出款" prop="todayMoneyOut">
          <el-input v-model="form.todayMoneyOut" placeholder="请输入当日出款" />
        </el-form-item>
        <el-form-item label="累计进款" prop="totalMoneyIn">
          <el-input v-model="form.totalMoneyIn" placeholder="请输入累计进款" />
        </el-form-item>
        <el-form-item label="累计出款" prop="totalMoneyOut">
          <el-input v-model="form.totalMoneyOut" placeholder="请输入累计出款" />
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
import { listSupplierwallet, getSupplierwallet, delSupplierwallet, addSupplierwallet, updateSupplierwallet } from "@/api/supplier/supplierwallet";

export default {
  name: "Supplierwallet",
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
      // 码商钱包表格数据
      supplierwalletList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplierId: null,
        walletNo: null,
        timestamp: null,
        balance: null,
        availBalance: null,
        frozeBalance: null,
        todayMoneyIn: null,
        todayMoneyOut: null,
        totalMoneyIn: null,
        totalMoneyOut: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplierId: [
          { required: true, message: "码商ID不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "部门ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询码商钱包列表 */
    getList() {
      this.loading = true;
      listSupplierwallet(this.queryParams).then(response => {
        this.supplierwalletList = response.rows;
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
        walletId: null,
        supplierId: null,
        walletNo: null,
        timestamp: null,
        balance: null,
        availBalance: null,
        frozeBalance: null,
        todayMoneyIn: null,
        todayMoneyOut: null,
        totalMoneyIn: null,
        totalMoneyOut: null,
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
      this.ids = selection.map(item => item.walletId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加码商钱包";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const walletId = row.walletId || this.ids
      getSupplierwallet(walletId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改码商钱包";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.walletId != null) {
            updateSupplierwallet(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplierwallet(this.form).then(response => {
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
      const walletIds = row.walletId || this.ids;
      this.$modal.confirm('是否确认删除码商钱包编号为"' + walletIds + '"的数据项？').then(function() {
        return delSupplierwallet(walletIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('supplier/supplierwallet/export', {
        ...this.queryParams
      }, `supplierwallet_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
