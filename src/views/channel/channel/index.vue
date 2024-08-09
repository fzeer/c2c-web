<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="渠道编号" prop="channelNo" >
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道名称" prop="channelName" >
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道类型" prop="channelType" v-if="moreSearch" >
        <el-select v-model="queryParams.channelType" placeholder="请选择渠道类型" clearable>
          <el-option
            v-for="dict in dict.type.channel_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
      <el-form-item label="接口商户号" prop="interfaceMchNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.interfaceMchNo"
          placeholder="请输入接口商户号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口代码" prop="interfaceCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.interfaceCode"
          placeholder="请输入接口代码"
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
          v-hasPermi="['channel:channel:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['channel:channel:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['channel:channel:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['channel:channel:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="channelList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="渠道ID" align="center" prop="channelId" />
      <el-table-column label="渠道编号" align="center" prop="channelNo" min-width="100" show-overflow-tooltip />
      <el-table-column label="渠道名称" align="center" prop="channelName" min-width="120" show-overflow-tooltip />
      <el-table-column label="渠道类型" align="center" prop="channelType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.channel_type" :value="scope.row.channelType"/>
        </template>
      </el-table-column>
      <el-table-column label="接口代码" align="center" prop="interfaceCode" show-overflow-tooltip />
      <el-table-column label="码商" align="center" prop="supplierName" show-overflow-tooltip />
      <el-table-column label="网关" align="center" prop="interfaceUrl" show-overflow-tooltip />
      <el-table-column label="商户号" align="center" prop="interfaceMchNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="签名方式" align="center" prop="signType" show-overflow-tooltip />
      <el-table-column label="APPID" align="center" prop="appId" show-overflow-tooltip />
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
            v-hasPermi="['channel:channel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['channel:channel:remove']"
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

        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-form-item label="渠道编码" prop="channelNo">
              <el-input v-model="form.channelNo" placeholder="请输入渠道编码" />
            </el-form-item>
            <el-form-item label="渠道名称" prop="channelName">
              <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
            </el-form-item>
            <el-form-item label="渠道类型" prop="channelType">
              <el-select v-model="form.channelType" placeholder="请选择渠道类型" style="width: 100%">
                <el-option
                  v-for="dict in dict.type.channel_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属码商">
              <el-select v-model="form.supplierId" style="width: 100%" placeholder="请选择">
                <el-option
                  v-for="item in supplierOptions"
                  :key="item.supplierId"
                  :label="item.supplierShortName"
                  :value="item.supplierId"
                  :disabled="item.status != '0'"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="接口代码" prop="interfaceCode">
              <el-input v-model="form.interfaceCode" placeholder="请输入接口代码" />
            </el-form-item>

            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
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
          <el-tab-pane label="接口配置" name="second">
            <el-form-item label="网关地址" prop="interfaceUrl">
              <el-input v-model="form.interfaceUrl" placeholder="请输入网关地址" />
            </el-form-item>
            <el-form-item label="商户号" prop="interfaceMchNo">
              <el-input v-model="form.interfaceMchNo" placeholder="请输入接口商户号" />
            </el-form-item>
            <el-form-item label="接口密钥" prop="interfaceMchKey">
              <el-input v-model="form.interfaceMchKey" placeholder="请输入接口密钥" />
            </el-form-item>
            <el-form-item label="签名方式" prop="signType">
              <el-input v-model="form.signType" placeholder="请输入签名方式" />
            </el-form-item>
            <el-form-item label="APPID" prop="appId">
              <el-input v-model="form.appId" placeholder="请输入接口APPID" />
            </el-form-item>
            <el-form-item label="接口私钥" prop="privateKey">
              <el-input v-model="form.privateKey" placeholder="请输入接口私钥" />
            </el-form-item>
            <el-form-item label="接口公钥" prop="publicKey">
              <el-input v-model="form.publicKey" placeholder="请输入接口公钥" />
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
import { listChannel, getChannel, delChannel, addChannel, updateChannel } from "@/api/channel/channel";
import { listSelectSupplier } from '@/api/supplier/supplier'

export default {
  name: "Channel",
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
      // 当前页
      activeName: 'first',
      // 总条数
      total: 0,
      // 支付渠道表格数据
      channelList: [],
      // 码商下拉数据
      supplierOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        channelNo: null,
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
        channelNo: [
          { required: true, message: "渠道编号不能为空", trigger: "blur" }
        ],
        channelName: [
          { required: true, message: "渠道名称不能为空", trigger: "blur" }
        ],
        channelType: [
          { required: true, message: "渠道类型不能为空", trigger: "blur" }
        ],
        interfaceCode: [
          { required: true, message: "接口代码不能为空", trigger: "blur" }
        ],
        // interfaceUrl: [
        //   { required: true, message: "网关地址不能为空", trigger: "blur" }
        // ],
        // interfaceMchNo: [
        //   { required: true, message: "商户号不能为空", trigger: "blur" }
        // ],
        // interfaceMchKey: [
        //   { required: true, message: "商户密钥不能为空", trigger: "blur" }
        // ],
        supplierId: [
          { required: true, message: "码商ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getSupplierOptions();
  },
  methods: {
    /** 查询支付渠道列表 */
    getList() {
      this.loading = true;
      listChannel(this.queryParams).then(response => {
        this.channelList = response.rows;
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
        channelNo: null,
        channelName: null,
        channelType: '0',
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
      getChannel(channelId).then(response => {
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
            updateChannel(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChannel(this.form).then(response => {
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
        return delChannel(channelIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('channel/channel/export', {
        ...this.queryParams
      }, `channel_${new Date().getTime()}.xlsx`)
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
