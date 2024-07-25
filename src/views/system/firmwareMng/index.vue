<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="设备类型" prop="devType">
        <el-select v-model="queryParams.devType" placeholder="请选择设备类型" clearable>
          <el-option
            v-for="dict in dict.type.device_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.version_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:firmwareMng:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:firmwareMng:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:firmwareMng:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:firmwareMng:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="firmwareMngList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="版本ID" align="center" prop="id" />
      <el-table-column label="设备类型" align="center" prop="devType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.device_type" :value="scope.row.devType"/>
        </template>
      </el-table-column>
      <el-table-column label="版本号" align="center" prop="firmwareVersion" />
     <!-- <el-table-column label="版本前缀" align="center" prop="versionPrefix" />
      <el-table-column label="版本后缀" align="center" prop="versionTail" />
      <el-table-column label="前置版本" align="center" prop="versionBasic" /> -->
      <el-table-column label="更新地址" align="center" prop="address" width="350"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.version_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="版本描述" align="center" prop="description"  width="200"/>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-upload"
            @click="handleUload(scope.row)"
            v-hasPermi="['system:firmwareMng:edit']"
          >上传</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:firmwareMng:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:firmwareMng:remove']"
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

    <!-- 添加或修改软件/固件版本管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <!--  <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item> -->
        <el-form-item label="设备类型" prop="devType">
          <el-select v-model="form.devType" placeholder="请选择设备类型">
            <el-option
              v-for="dict in dict.type.device_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="firmwareVersion">
          <el-input v-model="form.firmwareVersion" placeholder="请输入固件版本：prefix + tail" />
        </el-form-item>
 <!--       <el-form-item label="适配硬件版本" prop="hardwareVersion">
          <el-input v-model="form.hardwareVersion" placeholder="请输入适配硬件版本" />
        </el-form-item> -->
      <!--  <el-form-item label="版本前缀" prop="versionPrefix">
          <el-input v-model="form.versionPrefix" placeholder="请输入版本前缀: XXX.YYY" />
        </el-form-item>
        <el-form-item label="版本后缀" prop="versionTail">
          <el-input v-model="form.versionTail" placeholder="请输入版本后缀: ZZZ" />
        </el-form-item>
        <el-form-item label="前置版本" prop="versionBasic">
          <el-input v-model="form.versionBasic" placeholder="请输入前置版本: XXX.YYY" />
        </el-form-item> -->
        <el-form-item v-if="form.id" label="更新地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入固件存放路径" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.version_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="版本描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 文件上传对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".apk, .zip, .rar, .7z, .exe, .bin, .data, .dat, .ipa"
        :headers="upload.headers"
        :action="upload.url + '?id=' + upload.id"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <!-- <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否上传更新文件
          </div> -->
          <span>仅允许导入.apk, .zip, .rar, .7z, .exe, .bin, .data, .dat, .ipa格式文件。</span>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFirmwareMng, getFirmwareMng, delFirmwareMng, addFirmwareMng, updateFirmwareMng } from "@/api/system/firmwareMng";
import { getToken } from "@/utils/auth";

export default {
  name: "FirmwareMng",
  dicts: ['device_type', 'version_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
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
      // 软件/固件版本管理表格数据
      firmwareMngList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 文件上传参数
      upload: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: "",
        // 是否禁用上传
        isUploading: false,
        id: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/firmwareMng/upload"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        devType: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询软件/固件版本管理列表 */
    getList() {
      this.loading = true;
      listFirmwareMng(this.queryParams).then(response => {
        this.firmwareMngList = response.rows;
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
        deptId: null,
        devType: null,
        hardwareVersion: null,
        firmwareVersion: null,
        versionPrefix: null,
        versionTail: null,
        versionBasic: null,
        address: null,
        status: "0",
        description: null,
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
      this.title = "添加版本";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFirmwareMng(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改版本";
      });
    },
    /** 修改按钮操作 */
    handleUload(row) {
      const id = row.id || this.ids
      this.upload.id = id;
      this.upload.open = true;
      this.upload.title = "上传文件";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFirmwareMng(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFirmwareMng(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除版本管理编号为"' + ids + '"的数据项？').then(function() {
        return delFirmwareMng(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/firmwareMng/export', {
        ...this.queryParams
      }, `firmwareMng_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  }
};
</script>
