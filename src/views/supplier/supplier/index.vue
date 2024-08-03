<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="码商编号" prop="supplierNo" >
        <el-input
          v-model="queryParams.supplierNo"
          placeholder="请输入码商编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商简称" prop="supplierShortName" >
        <el-input
          v-model="queryParams.supplierShortName"
          placeholder="请输入码商简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商全称" prop="supplierName" >
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入码商全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="码商类型" prop="supplierType"  v-if="moreSearch" >
        <el-select v-model="queryParams.supplierType" placeholder="请选择码商类型" clearable>
          <el-option
            v-for="dict in dict.type.supplier_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" prop="owner"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.owner"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="tel"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入联系方式"
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['supplier:supplier:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['supplier:supplier:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['supplier:supplier:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['supplier:supplier:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="supplierList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="码商ID" align="center" prop="supplierId" />
      <el-table-column label="码商编号" align="center" prop="supplierNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="码商简称" align="center" prop="supplierShortName" show-overflow-tooltip />
      <el-table-column label="码商全称" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="码商类型" align="center" prop="supplierType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.supplier_type" :value="scope.row.supplierType"/>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="owner" show-overflow-tooltip />
      <el-table-column label="联系方式" align="center" prop="tel" show-overflow-tooltip />
      <el-table-column label="LOGO" align="center" prop="logo" show-overflow-tooltip />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="金额列表" align="center" prop="limitAmountList" show-overflow-tooltip />-->
<!--      <el-table-column label="最小金额" align="center" prop="limitMin" show-overflow-tooltip />-->
<!--      <el-table-column label="最大金额" align="center" prop="limitMax" show-overflow-tooltip />-->
<!--      <el-table-column label="每笔限额" align="center" prop="limitPerPayment" show-overflow-tooltip />-->
<!--      <el-table-column label="每日限额" align="center" prop="limitPerDay" show-overflow-tooltip />-->
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
            v-hasPermi="['supplier:supplier:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['supplier:supplier:remove']"
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

    <!-- 添加或修改码商对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-form-item label="码商编号" prop="supplierNo">
              <el-input v-model="form.supplierNo" placeholder="请输入码商编号" />
            </el-form-item>
            <el-form-item label="码商简称" prop="supplierShortName">
              <el-input v-model="form.supplierShortName" placeholder="请输入码商简称" />
            </el-form-item>
            <el-form-item label="码商全称" prop="supplierName">
              <el-input v-model="form.supplierName" placeholder="请输入码商全称" />
            </el-form-item>
            <el-form-item label="码商类型" prop="supplierType">
              <el-select v-model="form.supplierType" placeholder="请选择码商类型">
                <el-option
                  v-for="dict in dict.type.supplier_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="owner">
              <el-input v-model="form.owner" placeholder="请输入联系人" />
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入联系方式" />
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
          </el-tab-pane>
          <el-tab-pane label="参数设置" name="second">
            <el-form-item label="金额列表" prop="limitAmountList">
              <el-input v-model="form.limitAmountList" placeholder="请输入金额列表" />
            </el-form-item>
            <el-form-item label="最小金额" prop="limitMin">
              <el-input v-model="form.limitMin" placeholder="请输入最小金额" />
            </el-form-item>
            <el-form-item label="最大金额" prop="limitMax">
              <el-input v-model="form.limitMax" placeholder="请输入最大金额" />
            </el-form-item>
            <el-form-item label="每笔限额" prop="limitPerPayment">
              <el-input v-model="form.limitPerPayment" placeholder="请输入每笔限额" />
            </el-form-item>
            <el-form-item label="每日限额" prop="limitPerDay">
              <el-input v-model="form.limitPerDay" placeholder="请输入每日限额" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier } from "@/api/supplier/supplier";

export default {
  name: "Supplier",
  dicts: ['supplier_type', 'sys_normal_disable'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示更多筛选项
      moreSearch: false,
      // 当前激活的标签页
      activeName: 'first',
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
      // 码商表格数据
      supplierList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplierNo: null,
        supplierShortName: null,
        supplierName: null,
        supplierType: null,
        owner: null,
        tel: null,
        logo: null,
        status: null,
        limitAmountList: null,
        limitMin: null,
        limitMax: null,
        limitPerPayment: null,
        limitPerDay: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplierNo: [
          { required: true, message: "码商编号不能为空", trigger: "blur" }
        ],
        supplierShortName: [
          { required: true, message: "码商简称不能为空", trigger: "blur" }
        ],
        supplierName: [
          { required: true, message: "码商全称不能为空", trigger: "blur" }
        ],
        supplierType: [
          { required: true, message: "码商类型不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询码商列表 */
    getList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
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
        supplierId: null,
        supplierNo: null,
        supplierShortName: null,
        supplierName: null,
        supplierType: null,
        owner: null,
        tel: null,
        logo: null,
        status: "0",
        limitAmountList: null,
        limitMin: null,
        limitMax: null,
        limitPerPayment: null,
        limitPerDay: null,
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
      this.ids = selection.map(item => item.supplierId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加码商";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const supplierId = row.supplierId || this.ids
      getSupplier(supplierId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改码商";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.supplierId != null) {
            updateSupplier(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplier(this.form).then(response => {
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
      const supplierIds = row.supplierId || this.ids;
      this.$modal.confirm('是否确认删除码商编号为"' + supplierIds + '"的数据项？').then(function() {
        return delSupplier(supplierIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('supplier/supplier/export', {
        ...this.queryParams
      }, `supplier_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
