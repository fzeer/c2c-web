<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="订单编号" prop="orderCode" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求方式" prop="requestMethod" >
        <el-input
          v-model="queryParams.requestMethod"
          placeholder="请输入请求方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内容类型" prop="requestContentType" >
        <el-input
          v-model="queryParams.requestContentType"
          placeholder="请输入内容类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已回调次数" prop="callbackTimes"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.callbackTimes"
          placeholder="请输入已回调次数"
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
          v-hasPermi="['paying:payorderrequest:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['paying:payorderrequest:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['paying:payorderrequest:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['paying:payorderrequest:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="payorderrequestList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="orderId" />
      <el-table-column label="订单编号" align="center" prop="orderCode" min-width="100" sortable />
      <el-table-column label="请求时间" align="center" prop="requestTime" sortable>
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.requestTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求地址" align="center" prop="requestUrl" />
      <el-table-column label="请求方式" align="center" prop="requestMethod" />
      <el-table-column label="内容类型" align="center" prop="requestContentType" />
      <el-table-column label="请求载荷" align="center" prop="requestPayload" />
      <el-table-column label="回调地址" align="center" prop="callbackUrl" />
      <el-table-column label="回调载荷" align="center" prop="callbackPayload" />
      <el-table-column label="回调时间" align="center" prop="callbackTime" sortable>
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.callbackTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已回调次数" align="center" prop="callbackTimes" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['paying:payorderrequest:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['paying:payorderrequest:remove']"
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

    <!-- 添加或修改渠道下单请求对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="请求时间" prop="requestTime">
          <el-date-picker clearable
            v-model="form.requestTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择请求时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请求地址" prop="requestUrl">
          <el-input v-model="form.requestUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="请求方式" prop="requestMethod">
          <el-input v-model="form.requestMethod" placeholder="请输入请求方式" />
        </el-form-item>
        <el-form-item label="内容类型" prop="requestContentType">
          <el-input v-model="form.requestContentType" placeholder="请输入内容类型" />
        </el-form-item>
        <el-form-item label="请求载荷" prop="requestPayload">
          <el-input v-model="form.requestPayload" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="回调地址" prop="callbackUrl">
          <el-input v-model="form.callbackUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="回调载荷" prop="callbackPayload">
          <el-input v-model="form.callbackPayload" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="回调时间" prop="callbackTime">
          <el-date-picker clearable
            v-model="form.callbackTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择回调时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="已回调次数" prop="callbackTimes">
          <el-input v-model="form.callbackTimes" placeholder="请输入已回调次数" />
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
import { listPayorderrequest, getPayorderrequest, delPayorderrequest, addPayorderrequest, updatePayorderrequest } from "@/api/paying/payorderrequest";

export default {
  name: "Payorderrequest",
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
      // 渠道下单请求表格数据
      payorderrequestList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderCode: null,
        requestTime: null,
        requestUrl: null,
        requestMethod: null,
        requestContentType: null,
        requestPayload: null,
        callbackUrl: null,
        callbackPayload: null,
        callbackTime: null,
        callbackTimes: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询渠道下单请求列表 */
    getList() {
      this.loading = true;
      listPayorderrequest(this.queryParams).then(response => {
        this.payorderrequestList = response.rows;
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
        orderId: null,
        orderCode: null,
        requestTime: null,
        requestUrl: null,
        requestMethod: null,
        requestContentType: null,
        requestPayload: null,
        callbackUrl: null,
        callbackPayload: null,
        callbackTime: null,
        callbackTimes: null,
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
      this.ids = selection.map(item => item.orderId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加渠道下单请求";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getPayorderrequest(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改渠道下单请求";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderId != null) {
            updatePayorderrequest(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayorderrequest(this.form).then(response => {
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
      const orderIds = row.orderId || this.ids;
      this.$modal.confirm('是否确认删除渠道下单请求编号为"' + orderIds + '"的数据项？').then(function() {
        return delPayorderrequest(orderIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('paying/payorderrequest/export', {
        ...this.queryParams
      }, `payorderrequest_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
