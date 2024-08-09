<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="所属码商">
        <el-select v-model="queryParams.supplierId" style="width: 100%" @change="handleQuery" placeholder="请选择">
          <el-option
            v-for="item in supplierOptions"
            :key="item.supplierId"
            :label="item.supplierShortName"
            :value="item.supplierId"
            :disabled="item.status != '0'"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName" >
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款账号" prop="accountNo" >
        <el-input
          v-model="queryParams.accountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户人" prop="accountName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.accountName"
          placeholder="请输入开户人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用途" prop="useType"  v-if="moreSearch" >
        <el-select v-model="queryParams.useType" placeholder="请选择用途" clearable>
          <el-option
            v-for="dict in dict.type.bank_use_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.idCard"
          placeholder="请输入身份证"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号"
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
      <el-form-item label="用户名" prop="userName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="爬虫版本" prop="crawlVersion"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.crawlVersion"
          placeholder="请输入爬虫版本"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抓取开关" prop="crawlOpen"  v-if="moreSearch" >
        <el-select v-model="queryParams.crawlOpen" placeholder="请选择抓取开关" clearable>
          <el-option
            v-for="dict in dict.type.crawl_open"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="抓取状态" prop="crawlStatus"  v-if="moreSearch" >
        <el-select v-model="queryParams.crawlStatus" placeholder="请选择抓取状态" clearable>
          <el-option
            v-for="dict in dict.type.crawl_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['bank:collectionbank:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bank:collectionbank:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bank:collectionbank:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bank:collectionbank:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="collectionbankList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="accountId" />
      <el-table-column label="码商" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="银行名称" align="center" prop="bankName" show-overflow-tooltip />
      <el-table-column label="收款账号" align="center" prop="accountNo" show-overflow-tooltip />
      <el-table-column label="开户人" align="center" prop="accountName" show-overflow-tooltip />
      <el-table-column label="用途" align="center" prop="useType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.bank_use_type" :value="scope.row.useType"/>
        </template>
      </el-table-column>
      <el-table-column label="身份证" align="center" prop="idCard" show-overflow-tooltip />
      <el-table-column label="手机号" align="center" prop="mobile" show-overflow-tooltip />
      <el-table-column label="收款链接" align="center" prop="payLink" show-overflow-tooltip />
      <el-table-column label="超时设置" align="center" prop="payTimeoutSec" min-width="120"  show-overflow-tooltip />
      <el-table-column label="用户名" align="center" prop="userName" show-overflow-tooltip />
     <el-table-column label="系统余额" align="right" prop="sysBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.sysBalance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="实际余额" align="right" prop="crawlBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.crawlBalance) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="冻结金额" align="right" prop="frozeBalance" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.frozeBalance) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="累计收款" align="center" prop="totalReceive" show-overflow-tooltip />
      <el-table-column label="累计付款" align="center" prop="totalPayment" show-overflow-tooltip />
      <el-table-column label="每笔限额" align="center" prop="limitPerPayment" show-overflow-tooltip />
      <el-table-column label="每日限额" align="center" prop="limitPerDay" show-overflow-tooltip />
      <el-table-column label="爬虫版本" align="center" prop="crawlVersion" show-overflow-tooltip />
      <el-table-column label="抓取开关" align="center" prop="crawlOpen">
        <template v-slot="scope">
          <dict-tag :options="dict.type.crawl_open" :value="scope.row.crawlOpen"/>
        </template>
      </el-table-column>
      <el-table-column label="抓取状态" align="center" prop="crawlStatus">
        <template v-slot="scope">
          <dict-tag :options="dict.type.crawl_status" :value="scope.row.crawlStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="最后抓取时间" align="center" prop="crawlActiveTime" min-width="140" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.crawlActiveTime, '{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="抓取错误提示" align="center" prop="crawlMsg" min-width="140" show-overflow-tooltip />
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="120" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bank:collectionbank:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:collectionbank:remove']"
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-form-item label="所属码商">
              <el-select v-model="form.supplierId" style="width: 100%" @change="supplierSelectChange" placeholder="请选择">
                <el-option
                  v-for="item in supplierOptions"
                  :key="item.supplierId"
                  :label="item.supplierShortName"
                  :value="item.supplierId"
                  :disabled="item.status != '0'"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行名称" prop="bankName">
              <el-input v-model="form.bankName" placeholder="请输入银行名称" />
            </el-form-item>
            <el-form-item label="收款账号" prop="accountNo">
              <el-input v-model="form.accountNo" placeholder="请输入收款账号" />
            </el-form-item>
            <el-form-item label="开户人" prop="accountName">
              <el-input v-model="form.accountName" placeholder="请输入开户人" />
            </el-form-item>
            <el-form-item label="用途" prop="useType">
              <el-select v-model="form.useType" placeholder="请选择用途">
                <el-option
                  v-for="dict in dict.type.bank_use_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="form.idCard" placeholder="请输入身份证" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机号" />
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
            <el-form-item label="超时设置" prop="payTimeoutSec">
              <el-input v-model="form.payTimeoutSec" placeholder="请输入超时设置" />
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="银行密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入银行密码" />
            </el-form-item>
            <el-form-item label="每笔限额" prop="limitPerPayment">
              <el-input v-model="form.limitPerPayment" placeholder="请输入每笔限额" />
            </el-form-item>
            <el-form-item label="每日限额" prop="limitPerDay">
              <el-input v-model="form.limitPerDay" placeholder="请输入每日限额" />
            </el-form-item>
            <el-form-item label="收款链接" prop="payLink">
              <el-input v-model="form.payLink" placeholder="请输入收款链接" />
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
import { listCollectionbank, getCollectionbank, delCollectionbank, addCollectionbank, updateCollectionbank } from "@/api/bank/collectionbank";
import { listSelectSupplier } from '@/api/supplier/supplier'

export default {
  name: "Collectionbank",
  dicts: ['crawl_status', 'crawl_open', 'bank_use_type', 'sys_normal_disable'],
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
      // 收款账户表格数据
      collectionbankList: [],
      // 码商列表
      supplierOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplierId: null,
        bankName: null,
        accountNo: null,
        accountName: null,
        bankSonName: null,
        useType: null,
        idCard: null,
        mobile: null,
        payLink: null,
        payTimeoutSec: null,
        userName: null,
        password: null,
        timestamp: null,
        sysBalance: null,
        crawlBalance: null,
        frozeBalance: null,
        totalReceive: null,
        totalPayment: null,
        limitPerPayment: null,
        limitPerDay: null,
        crawlVersion: null,
        crawlOpen: null,
        crawlStatus: null,
        crawlActiveTime: null,
        crawlMsg: null,
        deptId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        bankName: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        accountNo: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        accountName: [
          { required: true, message: "开户人不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getSupplierOptions();
  },
  methods: {
    /** 查询收款账户列表 */
    getList() {
      this.loading = true;
      listCollectionbank(this.queryParams).then(response => {
        this.collectionbankList = response.rows;
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
        accountId: null,
        supplierId: null,
        bankName: null,
        accountNo: null,
        accountName: null,
        bankSonName: null,
        useType: null,
        idCard: null,
        mobile: null,
        payLink: null,
        payTimeoutSec: null,
        userName: null,
        password: null,
        timestamp: null,
        sysBalance: null,
        crawlBalance: null,
        frozeBalance: null,
        totalReceive: null,
        totalPayment: null,
        limitPerPayment: null,
        limitPerDay: null,
        crawlVersion: null,
        crawlOpen: null,
        crawlStatus: null,
        crawlActiveTime: null,
        crawlMsg: null,
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
      this.ids = selection.map(item => item.accountId)
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
      const accountId = row.accountId || this.ids
      getCollectionbank(accountId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收款账户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.accountId != null) {
            updateCollectionbank(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCollectionbank(this.form).then(response => {
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
      const accountIds = row.accountId || this.ids;
      this.$modal.confirm('是否确认删除收款账户编号为"' + accountIds + '"的数据项？').then(function() {
        return delCollectionbank(accountIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/collectionbank/export', {
        ...this.queryParams
      }, `collectionbank_${new Date().getTime()}.xlsx`)
    },
    getSupplierOptions() {
      listSelectSupplier().then(response => {
        this.supplierOptions = response.data;
      });
    },
    supplierSelectChange() {
    }
  }
};
</script>
