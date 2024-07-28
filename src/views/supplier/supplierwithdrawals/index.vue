<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="申请单号" prop="applyOrderCode" >
        <el-input
          v-model="queryParams.applyOrderCode"
          placeholder="请输入申请单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商ID" prop="supplierId" >
        <el-input
          v-model="queryParams.supplierId"
          placeholder="请输入码商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现申请金额 " prop="money" >
        <el-input
          v-model="queryParams.money"
          placeholder="请输入提现申请金额 "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际提现金额" prop="realMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.realMoney"
          placeholder="请输入实际提现金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单笔手续费" prop="single"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.single"
          placeholder="请输入单笔手续费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费率" prop="rate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手续费" prop="fee"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入手续费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankCode"
          placeholder="请输入银行卡号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户人" prop="name"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.name"
          placeholder="请输入开户人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支行" prop="bankSonName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankSonName"
          placeholder="请输入支行"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现状态" prop="status"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.status"
          placeholder="请输入提现状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人员" prop="auditUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审核人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代付订单号" prop="orderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入代付订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作员" prop="operator"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.operator"
          placeholder="请输入操作员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现失败原因" prop="respDesc"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.respDesc"
          placeholder="请输入提现失败原因"
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
          v-hasPermi="['supplier:supplierwithdrawals:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['supplier:supplierwithdrawals:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['supplier:supplierwithdrawals:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['supplier:supplierwithdrawals:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="supplierwithdrawalsList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="id" />
      <el-table-column label="申请单号" align="center" prop="applyOrderCode" />
      <el-table-column label="码商ID" align="center" prop="supplierId" />
      <el-table-column label="提现申请金额 " align="center" prop="money" min-width="100" sortable />
      <el-table-column label="实际提现金额" align="center" prop="realMoney" min-width="100" sortable />
      <el-table-column label="单笔手续费" align="center" prop="single" />
      <el-table-column label="费率" align="center" prop="rate" min-width="100" sortable />
      <el-table-column label="手续费" align="center" prop="fee" />
      <el-table-column label="银行名称" align="center" prop="bankName" />
      <el-table-column label="银行卡号" align="center" prop="bankCode" />
      <el-table-column label="开户人" align="center" prop="name" />
      <el-table-column label="支行" align="center" prop="bankSonName" />
      <el-table-column label="提现状态" align="center" prop="status" />
      <el-table-column label="审核时间" align="center" prop="auditTime" sortable>
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.auditTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人员" align="center" prop="auditUser" />
      <el-table-column label="代付订单号" align="center" prop="orderCode" min-width="100" sortable />
      <el-table-column label="操作员" align="center" prop="operator" />
      <el-table-column label="成功时间" align="center" prop="successTime" sortable>
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.successTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现失败原因" align="center" prop="respDesc" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['supplier:supplierwithdrawals:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['supplier:supplierwithdrawals:remove']"
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

    <!-- 添加或修改码商提现申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请单号" prop="applyOrderCode">
          <el-input v-model="form.applyOrderCode" placeholder="请输入申请单号" />
        </el-form-item>
        <el-form-item label="码商ID" prop="supplierId">
          <el-input v-model="form.supplierId" placeholder="请输入码商ID" />
        </el-form-item>
        <el-form-item label="提现申请金额 " prop="money">
          <el-input v-model="form.money" placeholder="请输入提现申请金额 " />
        </el-form-item>
        <el-form-item label="实际提现金额" prop="realMoney">
          <el-input v-model="form.realMoney" placeholder="请输入实际提现金额" />
        </el-form-item>
        <el-form-item label="单笔手续费" prop="single">
          <el-input v-model="form.single" placeholder="请输入单笔手续费" />
        </el-form-item>
        <el-form-item label="费率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入费率" />
        </el-form-item>
        <el-form-item label="手续费" prop="fee">
          <el-input v-model="form.fee" placeholder="请输入手续费" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="开户人" prop="name">
          <el-input v-model="form.name" placeholder="请输入开户人" />
        </el-form-item>
        <el-form-item label="支行" prop="bankSonName">
          <el-input v-model="form.bankSonName" placeholder="请输入支行" />
        </el-form-item>
        <el-form-item label="提现状态" prop="status">
          <el-input v-model="form.status" placeholder="请输入提现状态" />
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核人员" prop="auditUser">
          <el-input v-model="form.auditUser" placeholder="请输入审核人员" />
        </el-form-item>
        <el-form-item label="代付订单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入代付订单号" />
        </el-form-item>
        <el-form-item label="操作员" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入操作员" />
        </el-form-item>
        <el-form-item label="成功时间" prop="successTime">
          <el-date-picker clearable
            v-model="form.successTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择成功时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提现失败原因" prop="respDesc">
          <el-input v-model="form.respDesc" placeholder="请输入提现失败原因" />
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
import { listSupplierwithdrawals, getSupplierwithdrawals, delSupplierwithdrawals, addSupplierwithdrawals, updateSupplierwithdrawals } from "@/api/supplier/supplierwithdrawals";

export default {
  name: "Supplierwithdrawals",
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
      // 码商提现申请表格数据
      supplierwithdrawalsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applyOrderCode: null,
        supplierId: null,
        money: null,
        realMoney: null,
        single: null,
        rate: null,
        fee: null,
        bankName: null,
        bankCode: null,
        name: null,
        bankSonName: null,
        status: null,
        auditTime: null,
        auditUser: null,
        orderCode: null,
        operator: null,
        successTime: null,
        respDesc: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        applyOrderCode: [
          { required: true, message: "申请单号不能为空", trigger: "blur" }
        ],
        supplierId: [
          { required: true, message: "码商ID不能为空", trigger: "blur" }
        ],
        money: [
          { required: true, message: "提现申请金额 不能为空", trigger: "blur" }
        ],
        realMoney: [
          { required: true, message: "实际提现金额不能为空", trigger: "blur" }
        ],
        single: [
          { required: true, message: "单笔手续费不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "费率不能为空", trigger: "blur" }
        ],
        fee: [
          { required: true, message: "手续费不能为空", trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        bankCode: [
          { required: true, message: "银行卡号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "开户人不能为空", trigger: "blur" }
        ],
        bankSonName: [
          { required: true, message: "支行不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "提现状态不能为空", trigger: "blur" }
        ],
        orderCode: [
          { required: true, message: "代付订单号不能为空", trigger: "blur" }
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
    /** 查询码商提现申请列表 */
    getList() {
      this.loading = true;
      listSupplierwithdrawals(this.queryParams).then(response => {
        this.supplierwithdrawalsList = response.rows;
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
        applyOrderCode: null,
        supplierId: null,
        money: null,
        realMoney: null,
        single: null,
        rate: null,
        fee: null,
        bankName: null,
        bankCode: null,
        name: null,
        bankSonName: null,
        status: null,
        auditTime: null,
        auditUser: null,
        orderCode: null,
        operator: null,
        successTime: null,
        respDesc: null,
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
      this.title = "添加码商提现申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupplierwithdrawals(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改码商提现申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSupplierwithdrawals(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplierwithdrawals(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除码商提现申请编号为"' + ids + '"的数据项？').then(function() {
        return delSupplierwithdrawals(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('supplier/supplierwithdrawals/export', {
        ...this.queryParams
      }, `supplierwithdrawals_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
