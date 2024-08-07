<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="昵称" prop="nickName" >
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="USDT地址" prop="viewAddress" >
        <el-input
          v-model="queryParams.viewAddress"
          placeholder="请输入USDT地址"
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
          v-hasPermi="['bank:usdtaccount:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bank:usdtaccount:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bank:usdtaccount:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bank:usdtaccount:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="usdtaccountList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="账户ID" align="center" prop="usdtId" />
      <el-table-column label="昵称" align="center" prop="nickName" show-overflow-tooltip />
      <el-table-column label="码商" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="USDT地址" align="center" prop="viewAddress" min-width="120" show-overflow-tooltip />
      <el-table-column label="用途" align="center" prop="useType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.bank_use_type" :value="scope.row.useType"/>
        </template>
      </el-table-column>
      <el-table-column label="超时设置" align="center" prop="payTimeoutSec" show-overflow-tooltip />
     <el-table-column label="系统TRX余额" align="right" prop="sysBalanceTrx" min-width="140" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.sysBalanceTrx) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="系统USDT余额" align="right" prop="sysBalanceUsdt" min-width="140" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.sysBalanceUsdt) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="实际TRX余额" align="right" prop="crawlBalanceTrx" min-width="140" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.crawlBalanceTrx) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="实际USDT余额" align="right" prop="crawlBalanceUsdt" min-width="140" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.crawlBalanceUsdt) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="汇率" align="center" prop="exchangeRate" show-overflow-tooltip />
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
      <el-table-column label="抓取错误提示" align="center" prop="crawlMsg" min-width="130" show-overflow-tooltip />
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
            v-hasPermi="['bank:usdtaccount:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bank:usdtaccount:remove']"
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

    <!-- 添加或修改USDT账户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
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
        <el-form-item label="USDT地址" prop="viewAddress">
          <el-input v-model="form.viewAddress" placeholder="请输入USDT地址" />
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
        <el-form-item label="超时设置" prop="payTimeoutSec">
          <el-input v-model="form.payTimeoutSec" placeholder="请输入超时设置" />
        </el-form-item>
        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="form.exchangeRate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="抓取开关" prop="crawlOpen">
          <el-select v-model="form.crawlOpen" placeholder="请选择抓取开关">
            <el-option
              v-for="dict in dict.type.crawl_open"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUsdtaccount, getUsdtaccount, delUsdtaccount, addUsdtaccount, updateUsdtaccount } from "@/api/bank/usdtaccount";
import { listSelectSupplier } from '@/api/supplier/supplier'

export default {
  name: "Usdtaccount",
  dicts: ['crawl_status', 'crawl_open', 'bank_use_type', 'sys_normal_disable'],
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
      // USDT账户表格数据
      usdtaccountList: [],
      // 码商选项
      supplierOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nickName: null,
        supplierId: null,
        viewAddress: null,
        useType: null,
        payTimeoutSec: null,
        userName: null,
        password: null,
        timestamp: null,
        sysBalanceTrx: null,
        sysBalanceUsdt: null,
        crawlBalanceTrx: null,
        crawlBalanceUsdt: null,
        exchangeRate: null,
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
        viewAddress: [
          { required: true, message: "USDT地址不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getSupplierOptions()
  },
  methods: {
    /** 查询USDT账户列表 */
    getList() {
      this.loading = true;
      listUsdtaccount(this.queryParams).then(response => {
        this.usdtaccountList = response.rows;
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
        usdtId: null,
        nickName: null,
        supplierId: null,
        viewAddress: null,
        useType: null,
        payTimeoutSec: null,
        userName: null,
        password: null,
        timestamp: null,
        sysBalanceTrx: null,
        sysBalanceUsdt: null,
        crawlBalanceTrx: null,
        crawlBalanceUsdt: null,
        exchangeRate: null,
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
      this.ids = selection.map(item => item.usdtId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加USDT账户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const usdtId = row.usdtId || this.ids
      getUsdtaccount(usdtId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改USDT账户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.usdtId != null) {
            updateUsdtaccount(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUsdtaccount(this.form).then(response => {
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
      const usdtIds = row.usdtId || this.ids;
      this.$modal.confirm('是否确认删除USDT账户编号为"' + usdtIds + '"的数据项？').then(function() {
        return delUsdtaccount(usdtIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bank/usdtaccount/export', {
        ...this.queryParams
      }, `usdtaccount_${new Date().getTime()}.xlsx`)
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
