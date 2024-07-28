<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="代理编号" prop="agentNo" >
        <el-input
          v-model="queryParams.agentNo"
          placeholder="请输入代理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理简称" prop="agentShortName" >
        <el-input
          v-model="queryParams.agentShortName"
          placeholder="请输入代理简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理全称" prop="agentName" >
        <el-input
          v-model="queryParams.agentName"
          placeholder="请输入代理全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理类型" prop="agentType"  v-if="moreSearch" >
        <el-select v-model="queryParams.agentType" placeholder="请选择代理类型" clearable>
          <el-option
            v-for="dict in dict.type.agent_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上级代理ID" prop="parentId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入上级代理ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="授信额度" prop="creditAmount"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.creditAmount"
          placeholder="请输入授信额度"
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
      <el-form-item label="业务员ID" prop="adminId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.adminId"
          placeholder="请输入业务员ID"
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
          v-hasPermi="['agent:agent:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['agent:agent:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['agent:agent:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['agent:agent:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="agentList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="代理ID" align="center" prop="agentId" />
      <el-table-column label="代理编号" align="center" prop="agentNo" min-width="100" sortable />
      <el-table-column label="代理简称" align="center" prop="agentShortName" />
      <el-table-column label="代理全称" align="center" prop="agentName" />
      <el-table-column label="代理类型" align="center" prop="agentType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.agent_type" :value="scope.row.agentType"/>
        </template>
      </el-table-column>
      <el-table-column label="上级代理ID" align="center" prop="parentId" />
      <el-table-column label="授信额度" align="center" prop="creditAmount" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="业务员ID" align="center" prop="adminId" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['agent:agent:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['agent:agent:remove']"
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

    <!-- 添加或修改代理商列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代理编号" prop="agentNo">
          <el-input v-model="form.agentNo" placeholder="请输入代理编号" />
        </el-form-item>
        <el-form-item label="代理简称" prop="agentShortName">
          <el-input v-model="form.agentShortName" placeholder="请输入代理简称" />
        </el-form-item>
        <el-form-item label="代理全称" prop="agentName">
          <el-input v-model="form.agentName" placeholder="请输入代理全称" />
        </el-form-item>
        <el-form-item label="代理类型" prop="agentType">
          <el-select v-model="form.agentType" placeholder="请选择代理类型">
            <el-option
              v-for="dict in dict.type.agent_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级代理ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入上级代理ID" />
        </el-form-item>
        <el-form-item label="授信额度" prop="creditAmount">
          <el-input v-model="form.creditAmount" placeholder="请输入授信额度" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="业务员ID" prop="adminId">
          <el-input v-model="form.adminId" placeholder="请输入业务员ID" />
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
import { listAgent, getAgent, delAgent, addAgent, updateAgent } from "@/api/agent/agent";

export default {
  name: "Agent",
  dicts: ['agent_type', 'sys_normal_disable'],
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
      // 代理商列表格数据
      agentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agentNo: null,
        agentShortName: null,
        agentName: null,
        agentType: null,
        parentId: null,
        creditAmount: null,
        deptId: null,
        adminId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        agentShortName: [
          { required: true, message: "代理简称不能为空", trigger: "blur" }
        ],
        agentName: [
          { required: true, message: "代理全称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询代理商列列表 */
    getList() {
      this.loading = true;
      listAgent(this.queryParams).then(response => {
        this.agentList = response.rows;
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
        agentId: null,
        agentNo: null,
        agentShortName: null,
        agentName: null,
        agentType: null,
        parentId: null,
        creditAmount: null,
        deptId: null,
        adminId: null,
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
      this.ids = selection.map(item => item.agentId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加代理商列";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const agentId = row.agentId || this.ids
      getAgent(agentId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代理商列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.agentId != null) {
            updateAgent(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAgent(this.form).then(response => {
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
      const agentIds = row.agentId || this.ids;
      this.$modal.confirm('是否确认删除代理商列编号为"' + agentIds + '"的数据项？').then(function() {
        return delAgent(agentIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('agent/agent/export', {
        ...this.queryParams
      }, `agent_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
