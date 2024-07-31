<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="订单ID" prop="orderCode" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入订单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType" >
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型" clearable>
          <el-option
            v-for="dict in dict.type.order_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商户订单号" prop="mOrderCode" >
        <el-input
          v-model="queryParams.mOrderCode"
          placeholder="请输入商户订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户号" prop="merchantNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantNo"
          placeholder="请输入商户号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户名称" prop="merchantName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantName"
          placeholder="请输入商户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应用ID" prop="appId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.appId"
          placeholder="请输入应用ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知次数" prop="notifyCount"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.notifyCount"
          placeholder="请输入通知次数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大通知次数, 默认6次" prop="notifyCountLimit"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.notifyCountLimit"
          placeholder="请输入最大通知次数, 默认6次"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知状态" prop="notifyStatus"  v-if="moreSearch" >
        <el-select v-model="queryParams.notifyStatus" placeholder="请选择通知状态" clearable>
          <el-option
            v-for="dict in dict.type.order_notify_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['paying:notifyrecord:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['paying:notifyrecord:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['paying:notifyrecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['paying:notifyrecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="notifyrecordList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商户通知记录ID" align="center" prop="notifyId" />
      <el-table-column label="订单ID" align="center" prop="orderCode" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="订单类型" align="center" prop="orderType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_type" :value="scope.row.orderType"/>
        </template>
      </el-table-column>
      <el-table-column label="商户订单号" align="center" prop="mOrderCode" show-overflow-tooltip />
      <el-table-column label="商户号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户名称" align="center" prop="merchantName" show-overflow-tooltip />
      <el-table-column label="应用ID" align="center" prop="appId" show-overflow-tooltip />
      <el-table-column label="通知地址" align="center" prop="notifyUrl" show-overflow-tooltip />
      <el-table-column label="通知响应结果" align="center" prop="resResult" show-overflow-tooltip />
      <el-table-column label="通知次数" align="center" prop="notifyCount" show-overflow-tooltip />
      <el-table-column label="最大通知次数, 默认6次" align="center" prop="notifyCountLimit" show-overflow-tooltip />
      <el-table-column label="通知状态" align="center" prop="notifyStatus">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_notify_status" :value="scope.row.notifyStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="最后一次通知时间" align="center" prop="lastNotifyTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.lastNotifyTime, '{m}-{d} {h}:{i}') }}</span>
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
            v-hasPermi="['paying:notifyrecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['paying:notifyrecord:remove']"
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

    <!-- 添加或修改商户通知记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单类型">
            <el-option
              v-for="dict in dict.type.order_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户订单号" prop="mOrderCode">
          <el-input v-model="form.mOrderCode" placeholder="请输入商户订单号" />
        </el-form-item>
        <el-form-item label="商户号" prop="merchantNo">
          <el-input v-model="form.merchantNo" placeholder="请输入商户号" />
        </el-form-item>
        <el-form-item label="商户名称" prop="merchantName">
          <el-input v-model="form.merchantName" placeholder="请输入商户名称" />
        </el-form-item>
        <el-form-item label="应用ID" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入应用ID" />
        </el-form-item>
        <el-form-item label="通知地址" prop="notifyUrl">
          <el-input v-model="form.notifyUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="通知响应结果" prop="resResult">
          <el-input v-model="form.resResult" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="通知次数" prop="notifyCount">
          <el-input v-model="form.notifyCount" placeholder="请输入通知次数" />
        </el-form-item>
        <el-form-item label="最大通知次数, 默认6次" prop="notifyCountLimit">
          <el-input v-model="form.notifyCountLimit" placeholder="请输入最大通知次数, 默认6次" />
        </el-form-item>
        <el-form-item label="通知状态" prop="notifyStatus">
          <el-select v-model="form.notifyStatus" placeholder="请选择通知状态">
            <el-option
              v-for="dict in dict.type.order_notify_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最后一次通知时间" prop="lastNotifyTime">
          <el-date-picker clearable
            v-model="form.lastNotifyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后一次通知时间">
          </el-date-picker>
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
import { listNotifyrecord, getNotifyrecord, delNotifyrecord, addNotifyrecord, updateNotifyrecord } from "@/api/paying/notifyrecord";

export default {
  name: "Notifyrecord",
  dicts: ['order_type', 'order_notify_status'],
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
      // 商户通知记录表格数据
      notifyrecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderCode: null,
        orderType: null,
        mOrderCode: null,
        merchantNo: null,
        merchantName: null,
        appId: null,
        notifyUrl: null,
        resResult: null,
        notifyCount: null,
        notifyCountLimit: null,
        notifyStatus: null,
        lastNotifyTime: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderCode: [
          { required: true, message: "订单ID不能为空", trigger: "blur" }
        ],
        orderType: [
          { required: true, message: "订单类型(0=代收,1=代付)不能为空", trigger: "change" }
        ],
        mOrderCode: [
          { required: true, message: "商户订单号不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商户号不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户名称不能为空", trigger: "blur" }
        ],
        appId: [
          { required: true, message: "应用ID不能为空", trigger: "blur" }
        ],
        notifyUrl: [
          { required: true, message: "通知地址不能为空", trigger: "blur" }
        ],
        notifyCount: [
          { required: true, message: "通知次数不能为空", trigger: "blur" }
        ],
        notifyCountLimit: [
          { required: true, message: "最大通知次数, 默认6次不能为空", trigger: "blur" }
        ],
        notifyStatus: [
          { required: true, message: "通知状态不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询商户通知记录列表 */
    getList() {
      this.loading = true;
      listNotifyrecord(this.queryParams).then(response => {
        this.notifyrecordList = response.rows;
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
        notifyId: null,
        orderCode: null,
        orderType: null,
        mOrderCode: null,
        merchantNo: null,
        merchantName: null,
        appId: null,
        notifyUrl: null,
        resResult: null,
        notifyCount: null,
        notifyCountLimit: null,
        notifyStatus: null,
        lastNotifyTime: null,
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
      this.ids = selection.map(item => item.notifyId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商户通知记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const notifyId = row.notifyId || this.ids
      getNotifyrecord(notifyId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户通知记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.notifyId != null) {
            updateNotifyrecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotifyrecord(this.form).then(response => {
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
      const notifyIds = row.notifyId || this.ids;
      this.$modal.confirm('是否确认删除商户通知记录编号为"' + notifyIds + '"的数据项？').then(function() {
        return delNotifyrecord(notifyIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('paying/notifyrecord/export', {
        ...this.queryParams
      }, `notifyrecord_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
