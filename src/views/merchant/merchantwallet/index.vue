<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="钱包编号" prop="walletNo" >
        <el-input
          v-model="queryParams.walletNo"
          placeholder="请输入钱包编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户ID" prop="merchantId" >
        <el-input
          v-model="queryParams.merchantId"
          placeholder="请输入商户ID"
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
          v-hasPermi="['merchant:merchantwallet:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="merchantwalletList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="钱包编号" align="center" prop="walletNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户ID" align="center" prop="merchantId" show-overflow-tooltip />
      <el-table-column label="商户名称" align="center" prop="merchantName" show-overflow-tooltip />
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
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime, '{m}-{d} {h}:{i}') }}</span>
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

    <!-- 添加或修改商户钱包对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listMerchantwallet, getMerchantwallet, delMerchantwallet, addMerchantwallet, updateMerchantwallet } from "@/api/merchant/merchantwallet";

export default {
  name: "Merchantwallet",
  dicts: ['sys_normal_disable'],
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
      // 商户钱包表格数据
      merchantwalletList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        walletNo: null,
        merchantId: null,
        merchantShortName: null,
        apiSecret: null,
        merchantName: null,
        owner: null,
        tel: null,
        logo: null,
        timestamp: null,
        balance: null,
        availBalance: null,
        frozeBalance: null,
        todayMoneyIn: null,
        todayMoneyOut: null,
        totalMoneyIn: null,
        totalMoneyOut: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        merchantId: [
          { required: true, message: "商户ID不能为空", trigger: "blur" }
        ],
        merchantShortName: [
          { required: true, message: "商户简称不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户全称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询商户钱包列表 */
    getList() {
      this.loading = true;
      listMerchantwallet(this.queryParams).then(response => {
        this.merchantwalletList = response.rows;
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
        walletNo: null,
        merchantId: null,
        merchantShortName: null,
        apiSecret: null,
        merchantName: null,
        owner: null,
        tel: null,
        logo: null,
        timestamp: null,
        balance: null,
        availBalance: null,
        frozeBalance: null,
        todayMoneyIn: null,
        todayMoneyOut: null,
        totalMoneyIn: null,
        totalMoneyOut: null,
        status: "0",
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
      this.title = "添加商户钱包";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMerchantwallet(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户钱包";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMerchantwallet(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMerchantwallet(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商户钱包编号为"' + ids + '"的数据项？').then(function() {
        return delMerchantwallet(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('merchant/merchantwallet/export', {
        ...this.queryParams
      }, `merchantwallet_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
