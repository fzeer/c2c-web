<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="商户编号" prop="merchantNo" >
        <el-input
          v-model="queryParams.merchantNo"
          placeholder="请输入商户编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="商户名称" prop="merchantName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantName"
          placeholder="请输入商户全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="代理ID" prop="agentId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入代理ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="商户类型" prop="merchantType"  v-if="moreSearch" >
        <el-select v-model="queryParams.merchantType" placeholder="请选择商户类型" clearable>
          <el-option
            v-for="dict in dict.type.merchant_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="业务员ID" prop="adminId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.adminId"
          placeholder="请输入业务员ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['merchant:merchant:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['merchant:merchant:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['merchant:merchant:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['merchant:merchant:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="merchantList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商户ID" align="center" prop="merchantId" />
      <el-table-column label="商户编号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户简称" align="center" prop="merchantShortName" show-overflow-tooltip sortable min-width="100"  />
      <el-table-column label="商户全称" align="center" prop="merchantName" show-overflow-tooltip  sortable min-width="120" />
      <el-table-column label="商户类型" align="center" prop="merchantType"  min-width="100" sortable>
        <template v-slot="scope">
          <dict-tag :options="dict.type.merchant_type" :value="scope.row.merchantType"/>
        </template>
      </el-table-column>
      <el-table-column label="商户密钥" align="center" prop="apiSecret" show-overflow-tooltip />
      <el-table-column label="代理名称" align="center" prop="agentName" v-has-role="['agent']" show-overflow-tooltip sortable min-width="100"/>
      <el-table-column label="业务员" align="center" prop="adminName" show-overflow-tooltip sortable min-width="100" />
<!--      <el-table-column label="联系人" align="center" prop="owner" show-overflow-tooltip />-->
<!--      <el-table-column label="联系方式" align="center" prop="tel" show-overflow-tooltip />-->
<!--      <el-table-column label="LOGO" align="center" prop="logo" show-overflow-tooltip />-->
      <el-table-column label="授信额度" align="center" prop="creditAmount" show-overflow-tooltip sortable min-width="100" />
      <el-table-column label="金额列表" align="center" prop="limitAmountList" show-overflow-tooltip />
      <el-table-column label="最小金额" align="center" prop="limitMin" show-overflow-tooltip />
      <el-table-column label="最大金额" align="center" prop="limitMax" show-overflow-tooltip />
      <el-table-column label="每笔限额" align="center" prop="limitPerPayment" show-overflow-tooltip />
      <el-table-column label="每日限额" align="center" prop="limitPerDay" show-overflow-tooltip />
<!--      <el-table-column label="TG群组TOKEN" align="center" prop="telegramToken" show-overflow-tooltip />-->
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="160" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['merchant:merchant:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['merchant:merchant:remove']"
          >删除</el-button>

          <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:user:resetPwd', 'system:user:edit']">
                <span class="el-dropdown-link">
                  <i class="el-icon-d-arrow-right el-icon--right"></i>更多
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleResetPwd" icon="el-icon-key"
                                v-hasPermi="['system:user:resetPwd']">重置密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <!-- 添加或修改商户列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
            <el-form-item label="所属代理">
              <el-select v-model="form.agentId" style="width: 100%" @change="parentSelectChange" placeholder="请选择">
                <el-option
                  v-for="item in parentAgentOptions"
                  :key="item.agentId"
                  :label="item.agentShortName"
                  :value="item.agentId"
                  :disabled="item.status != '0'"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商户编号" prop="merchantNo">
              <el-input v-model="form.merchantNo" placeholder="请输入商户编号" />
            </el-form-item>
            <el-form-item label="商户简称" prop="merchantShortName">
              <el-input v-model="form.merchantShortName" placeholder="请输入商户简称" />
            </el-form-item>
            <el-form-item label="商户全称" prop="merchantName">
              <el-input v-model="form.merchantName" placeholder="请输入商户全称" />
            </el-form-item>
            <el-form-item label="商户类型" prop="merchantType">
              <el-select v-model="form.merchantType" placeholder="请选择商户类型">
                <el-option
                  v-for="dict in dict.type.merchant_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务员" prop="adminName">
              <el-input v-model="form.adminName" placeholder="业务员" readonly>
                <el-button @click="openSelectAdmin" style="padding-right:10px" slot="suffix" type="text" >选择</el-button>
              </el-input>
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
          <el-form-item label="授信额度" prop="creditAmount">
            <el-input v-model="form.creditAmount" placeholder="请输入授信额度" />
          </el-form-item>
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
          <el-form-item label="TG群组TOKEN" prop="telegramToken">
            <el-input v-model="form.telegramToken" placeholder="请输入TG群组TOKEN" />
          </el-form-item>
        </el-tab-pane>
       </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <select-admin ref="select" userType="0" @ok="adminSelectChange" />
  </div>
</template>

<script>
import { listMerchant, getMerchant, delMerchant, addMerchant, updateMerchant } from "@/api/merchant/merchant";
import { listParentAgent } from '@/api/agent/agent'
import selectAdmin from '@/views/system/user/selectAdmin.vue'
import { resetUserPwd } from '@/api/system/user'

export default {
  name: "Merchant",
  components: { selectAdmin },
  dicts: ['merchant_type', 'sys_normal_disable'],
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
      // 商户列表格数据
      merchantList: [],
      // 当前选项卡
      activeName: 'first',
      // 代理选项
      parentAgentOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        merchantNo: null,
        merchantShortName: null,
        apiSecret: null,
        merchantName: null,
        merchantType: null,
        adminDeptId: null,
        adminId: null,
        owner: null,
        tel: null,
        logo: null,
        creditAmount: null,
        limitAmountList: null,
        limitMin: null,
        limitMax: null,
        limitPerPayment: null,
        limitPerDay: null,
        telegramToken: null,
        agentId: null,
        deptId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        adminName: [
          { required: true, message: "业务员不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商户号不能为空", trigger: "blur" }
        ],
        merchantShortName: [
          { required: true, message: "商户简称不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户全称不能为空", trigger: "blur" }
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
    /** 查询商户列列表 */
    getList() {
      this.loading = true;
      listMerchant(this.queryParams).then(response => {
        this.merchantList = response.rows;
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
        merchantId: null,
        merchantNo: null,
        merchantShortName: null,
        apiSecret: null,
        merchantName: null,
        merchantType: null,
        adminDeptId: null,
        adminName: null,
        adminId: null,
        owner: null,
        tel: null,
        logo: null,
        creditAmount: null,
        limitAmountList: null,
        limitMin: null,
        limitMax: null,
        limitPerPayment: null,
        limitPerDay: null,
        telegramToken: null,
        agentId: null,
        deptId: null,
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
      this.ids = selection.map(item => item.merchantId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商户列";
      listParentAgent().then(response => {
        this.parentAgentOptions = response.data;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const merchantId = row.merchantId || this.ids
      listParentAgent().then(response => {
        this.parentAgentOptions = response.data;
      });
      getMerchant(merchantId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.merchantId != null) {
            updateMerchant(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMerchant(this.form).then(response => {
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
      const merchantIds = row.merchantId || this.ids;
      this.$modal.confirm('是否确认删除商户列编号为"' + merchantIds + '"的数据项？').then(function() {
        return delMerchant(merchantIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('merchant/merchant/export', {
        ...this.queryParams
      }, `merchant_${new Date().getTime()}.xlsx`)
    },
    /** 选择业务员弹窗 */
    openSelectAdmin() {
      this.$refs.select.show();
    },
    /** 选择上级代理 */
    parentSelectChange() {

    },
    /** 选择业务员 */
    adminSelectChange() {
      if(this.$refs.select.users.length > 0) {
        this.form.adminId = this.$refs.select.users[0].userId;
        this.form.adminName = this.$refs.select.users[0].nickName;
      }
    },

    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        default:
          break;
      }
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.merchantNo + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间"
      }).then(({ value }) => {
        resetUserPwd(row.userId, value).then(response => {
          this.$modal.msgSuccess("修改成功，新密码是：" + value);
        });
      }).catch(() => {});
    },
  }
};
</script>
