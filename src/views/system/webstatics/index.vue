<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="动作类型" prop="actionType">
        <el-select v-model="queryParams.actionType" placeholder="请选择动作类型" clearable>
          <el-option
            v-for="dict in dict.type.action_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户IP" prop="clientIp">
        <el-input
          v-model="queryParams.clientIp"
          placeholder="请输入客户IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="终端类型" prop="terminal">
        <el-input
          v-model="queryParams.terminal"
          placeholder="请输入终端类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:webstatics:add']"
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
          v-hasPermi="['system:webstatics:edit']"
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
          v-hasPermi="['system:webstatics:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:webstatics:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
 -->
    <el-table v-loading="loading" :data="webstaticsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column label="记录时间" align="center" prop="createTime" />
      <el-table-column label="客户IP" align="center" prop="clientIp" />
      <el-table-column label="终端类型" align="center" prop="terminal" />
      <el-table-column label="动作类型" align="center" prop="actionType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.action_type" :value="scope.row.actionType"/>
        </template>
      </el-table-column>
      <el-table-column label="动作内容" align="center" prop="actionContent" />
      <el-table-column label="备注" align="center" prop="remark" />
    <!--  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:webstatics:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:webstatics:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改网页统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="动作类型" prop="actionType">
          <el-select v-model="form.actionType" placeholder="请选择动作类型">
            <el-option
              v-for="dict in dict.type.action_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作内容">
          <editor v-model="form.actionContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="客户IP" prop="clientIp">
          <el-input v-model="form.clientIp" placeholder="请输入客户IP" />
        </el-form-item>
        <el-form-item label="终端类型" prop="terminal">
          <el-input v-model="form.terminal" placeholder="请输入终端类型" />
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
import { listWebstatics, getWebstatics, delWebstatics, addWebstatics, updateWebstatics } from "@/api/system/webstatics";

export default {
  name: "Webstatics",
  dicts: ['action_type'],
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
      // 网页统计表格数据
      webstaticsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        actionType: null,
        actionContent: null,
        clientIp: null,
        terminal: null,
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
    /** 查询网页统计列表 */
    getList() {
      this.loading = true;
      listWebstatics(this.queryParams).then(response => {
        this.webstaticsList = response.rows;
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
        actionType: null,
        actionContent: null,
        clientIp: null,
        terminal: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      this.title = "添加网页统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWebstatics(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改网页统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWebstatics(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWebstatics(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除网页统计编号为"' + ids + '"的数据项？').then(function() {
        return delWebstatics(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/webstatics/export', {
        ...this.queryParams
      }, `webstatics_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
