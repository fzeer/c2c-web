<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="唯一标志" prop="identifyCode" >
        <el-input
          v-model="queryParams.identifyCode"
          placeholder="请输入唯一标志"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile" >
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目编号" prop="projectCode" >
        <el-input
          v-model="queryParams.projectCode"
          placeholder="请输入项目编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应用编号" prop="appCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.appCode"
          placeholder="请输入应用编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应用版本" prop="appVersion"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.appVersion"
          placeholder="请输入应用版本"
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
      <el-form-item label="收款账号" prop="accountNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.accountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="userName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
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
      <el-form-item label="消息类型" prop="otpType"  v-if="moreSearch" >
        <el-select v-model="queryParams.otpType" placeholder="请选择消息类型" clearable>
          <el-option
            v-for="dict in dict.type.otp_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="验证码" prop="captchaText"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.captchaText"
          placeholder="请输入验证码"
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
          v-hasPermi="['bank:otpmessage:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bank:otpmessage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bank:otpmessage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bank:otpmessage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="otpmessageList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="otpId" />
      <el-table-column label="唯一标志" align="center" prop="identifyCode" show-overflow-tooltip />
      <el-table-column label="手机号码" align="center" prop="mobile" show-overflow-tooltip />
      <el-table-column label="项目编号" align="center" prop="projectCode" show-overflow-tooltip />
      <el-table-column label="项目名称" align="center" prop="projectName" show-overflow-tooltip />
      <el-table-column label="应用编号" align="center" prop="appCode" show-overflow-tooltip />
      <el-table-column label="应用版本" align="center" prop="appVersion" show-overflow-tooltip />
      <el-table-column label="银行名称" align="center" prop="bankName" show-overflow-tooltip />
      <el-table-column label="收款账号" align="center" prop="accountNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="用户名称" align="center" prop="userName" show-overflow-tooltip />
      <el-table-column label="码商ID" align="center" prop="supplierId" show-overflow-tooltip />
      <el-table-column label="码商名称" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="消息类型" align="center" prop="otpType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.otp_type" :value="scope.row.otpType"/>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" align="center" prop="otpContent" show-overflow-tooltip />
      <el-table-column label="验证码" align="center" prop="captchaText" show-overflow-tooltip />
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
            v-hasPermi="['bank:otpmessage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:otpmessage:remove']"
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

    <!-- 添加或修改OTP消息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="唯一标志" prop="identifyCode">
          <el-input v-model="form.identifyCode" placeholder="请输入唯一标志" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectCode">
          <el-input v-model="form.projectCode" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="应用编号" prop="appCode">
          <el-input v-model="form.appCode" placeholder="请输入应用编号" />
        </el-form-item>
        <el-form-item label="应用版本" prop="appVersion">
          <el-input v-model="form.appVersion" placeholder="请输入应用版本" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="收款账号" prop="accountNo">
          <el-input v-model="form.accountNo" placeholder="请输入收款账号" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名称" />
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
        <el-form-item label="消息类型" prop="otpType">
          <el-select v-model="form.otpType" placeholder="请选择消息类型">
            <el-option
              v-for="dict in dict.type.otp_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容">
          <editor v-model="form.otpContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaText">
          <el-input v-model="form.captchaText" placeholder="请输入验证码" />
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
import { listOtpmessage, getOtpmessage, delOtpmessage, addOtpmessage, updateOtpmessage } from "@/api/bank/otpmessage";

export default {
  name: "Otpmessage",
  dicts: ['otp_type', 'sys_normal_disable'],
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
      // OTP消息表格数据
      otpmessageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        identifyCode: null,
        mobile: null,
        projectCode: null,
        projectName: null,
        appCode: null,
        appVersion: null,
        bankName: null,
        accountNo: null,
        userName: null,
        supplierId: null,
        supplierName: null,
        status: null,
        otpType: null,
        otpContent: null,
        captchaText: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        identifyCode: [
          { required: true, message: "唯一标志不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询OTP消息列表 */
    getList() {
      this.loading = true;
      listOtpmessage(this.queryParams).then(response => {
        this.otpmessageList = response.rows;
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
        otpId: null,
        identifyCode: null,
        mobile: null,
        projectCode: null,
        projectName: null,
        appCode: null,
        appVersion: null,
        bankName: null,
        accountNo: null,
        userName: null,
        supplierId: null,
        supplierName: null,
        status: "0",
        otpType: null,
        otpContent: null,
        captchaText: null,
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
      this.ids = selection.map(item => item.otpId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加OTP消息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const otpId = row.otpId || this.ids
      getOtpmessage(otpId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改OTP消息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.otpId != null) {
            updateOtpmessage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOtpmessage(this.form).then(response => {
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
      const otpIds = row.otpId || this.ids;
      this.$modal.confirm('是否确认删除OTP消息编号为"' + otpIds + '"的数据项？').then(function() {
        return delOtpmessage(otpIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/otpmessage/export', {
        ...this.queryParams
      }, `otpmessage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
