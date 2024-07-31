<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="渠道名称" prop="channelName" >
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道类型" prop="channelType" >
        <el-select v-model="queryParams.channelType" placeholder="请选择渠道类型" clearable>
          <el-option
            v-for="dict in dict.type.channel_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接口编码" prop="interfaceCode" >
        <el-input
          v-model="queryParams.interfaceCode"
          placeholder="请输入接口编码"
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
      <el-form-item label="接口APPID" prop="interfaceUrl"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.interfaceUrl"
          placeholder="请输入接口APPID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口商户号" prop="interfaceMchNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.interfaceMchNo"
          placeholder="请输入接口商户号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口密钥" prop="interfaceMchKey"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.interfaceMchKey"
          placeholder="请输入接口密钥"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签名方式" prop="signType"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.signType"
          placeholder="请输入签名方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口APPID" prop="appId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.appId"
          placeholder="请输入接口APPID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口私钥" prop="privateKey"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.privateKey"
          placeholder="请输入接口私钥"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口公钥" prop="publicKey"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.publicKey"
          placeholder="请输入接口公钥"
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
          v-hasPermi="['channel:paymentchannel:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['channel:paymentchannel:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['channel:paymentchannel:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['channel:paymentchannel:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="paymentchannelList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="渠道ID" align="center" prop="channelId" />
      <el-table-column label="渠道名称" align="center" prop="channelName" show-overflow-tooltip />
      <el-table-column label="渠道类型" align="center" prop="channelType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.channel_type" :value="scope.row.channelType"/>
        </template>
      </el-table-column>
      <el-table-column label="接口编码" align="center" prop="interfaceCode" show-overflow-tooltip />
      <el-table-column label="码商ID" align="center" prop="supplierId" show-overflow-tooltip />
      <el-table-column label="接口APPID" align="center" prop="interfaceUrl" show-overflow-tooltip />
      <el-table-column label="接口商户号" align="center" prop="interfaceMchNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="接口密钥" align="center" prop="interfaceMchKey" show-overflow-tooltip />
      <el-table-column label="签名方式" align="center" prop="signType" show-overflow-tooltip />
      <el-table-column label="接口APPID" align="center" prop="appId" show-overflow-tooltip />
      <el-table-column label="接口私钥" align="center" prop="privateKey" show-overflow-tooltip />
      <el-table-column label="接口公钥" align="center" prop="publicKey" show-overflow-tooltip />
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
            v-hasPermi="['channel:paymentchannel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['channel:paymentchannel:remove']"
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

    <!-- 添加或修改支付渠道对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="渠道类型" prop="channelType">
          <el-select v-model="form.channelType" placeholder="请选择渠道类型">
            <el-option
              v-for="dict in dict.type.channel_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口编码" prop="interfaceCode">
          <el-input v-model="form.interfaceCode" placeholder="请输入接口编码" />
        </el-form-item>
        <el-form-item label="码商ID" prop="supplierId">
          <el-input v-model="form.supplierId" placeholder="请输入码商ID" />
        </el-form-item>
        <el-form-item label="接口APPID" prop="interfaceUrl">
          <el-input v-model="form.interfaceUrl" placeholder="请输入接口APPID" />
        </el-form-item>
        <el-form-item label="接口商户号" prop="interfaceMchNo">
          <el-input v-model="form.interfaceMchNo" placeholder="请输入接口商户号" />
        </el-form-item>
        <el-form-item label="接口密钥" prop="interfaceMchKey">
          <el-input v-model="form.interfaceMchKey" placeholder="请输入接口密钥" />
        </el-form-item>
        <el-form-item label="签名方式" prop="signType">
          <el-input v-model="form.signType" placeholder="请输入签名方式" />
        </el-form-item>
        <el-form-item label="接口APPID" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入接口APPID" />
        </el-form-item>
        <el-form-item label="接口私钥" prop="privateKey">
          <el-input v-model="form.privateKey" placeholder="请输入接口私钥" />
        </el-form-item>
        <el-form-item label="接口公钥" prop="publicKey">
          <el-input v-model="form.publicKey" placeholder="请输入接口公钥" />
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
import { listPaymentchannel, getPaymentchannel, delPaymentchannel, addPaymentchannel, updatePaymentchannel } from "@/api/channel/paymentchannel";

export default {
  name: "Paymentchannel",
  dicts: ['channel_type', 'sys_normal_disable'],
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
      // 支付渠道表格数据
      paymentchannelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        channelName: null,
        channelType: null,
        interfaceCode: null,
        supplierId: null,
        interfaceUrl: null,
        interfaceMchNo: null,
        interfaceMchKey: null,
        signType: null,
        appId: null,
        privateKey: null,
        publicKey: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        interfaceCode: [
          { required: true, message: "接口编码不能为空", trigger: "blur" }
        ],
        supplierId: [
          { required: true, message: "码商ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询支付渠道列表 */
    getList() {
      this.loading = true;
      listPaymentchannel(this.queryParams).then(response => {
        this.paymentchannelList = response.rows;
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
        channelId: null,
        channelName: null,
        channelType: null,
        interfaceCode: null,
        supplierId: null,
        interfaceUrl: null,
        interfaceMchNo: null,
        interfaceMchKey: null,
        signType: null,
        appId: null,
        privateKey: null,
        publicKey: null,
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
      this.ids = selection.map(item => item.channelId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加支付渠道";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const channelId = row.channelId || this.ids
      getPaymentchannel(channelId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改支付渠道";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.channelId != null) {
            updatePaymentchannel(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPaymentchannel(this.form).then(response => {
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
      const channelIds = row.channelId || this.ids;
      this.$modal.confirm('是否确认删除支付渠道编号为"' + channelIds + '"的数据项？').then(function() {
        return delPaymentchannel(channelIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('channel/paymentchannel/export', {
        ...this.queryParams
      }, `paymentchannel_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
