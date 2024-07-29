<template>
  <!-- 授权用户 -->
  <el-dialog title="选择业务员" :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入用户昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="手机号码" prop="phonenumber">-->
<!--        <el-input-->
<!--          v-model="queryParams.phonenumber"-->
<!--          placeholder="请输入手机号码"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table @row-click="clickRow" ref="table" :data="userList" height="260px">
        <el-table-column label="选择" align="center" width="65">
          <template v-slot="scope">
            <el-radio :label="scope.$index + 1" v-model="radio"
                      @change.native="clickRadio(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="用户账号" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column label="用户昵称" prop="nickName" :show-overflow-tooltip="true" />
        <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true" />
        <el-table-column label="手机" prop="phonenumber" :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center" prop="status">
          <template v-slot="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelectUser">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { adminList } from "@/api/system/user";
export default {
  dicts: ['sys_normal_disable'],
  props: {
    // 用户类型
    userType: {
      type: [Number, String]
    }
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      // 选中数组值
      userIds: [],
      // 选中数组值
      users: [],
      // 总条数
      total: 0,
      // 未授权用户数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userType: undefined,
        userName: undefined,
        nickName: undefined,
        phonenumber: undefined
      },
      radio: '',
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.queryParams.userType = this.userType;
      this.getList();
      this.visible = true;
    },
    clickRadio(row) {
      // 只保留当前选中项目，其他取消选择
      this.userIds = [row.userId];
      this.users = [row];
    },
    clickRow(row) {
      // 只保留当前选中项目，其他取消选择
      this.userIds = [row.userId];
      this.users = [row];
      this.radio = this.userList.indexOf(row) + 1;
    },
    // 查询表数据
    getList() {
      adminList(this.queryParams).then(res => {
        this.userList = res.data;
        // this.total = res.total;
        this.total = res.data.length;
      });
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
    /** 选择授权用户操作 */
    handleSelectUser() {
      const userIds = this.userIds.join(",");
      if (userIds == "") {
        this.$modal.msgError("请选择用户");
        return;
      }

      this.visible = false;
      this.$emit("ok");
    }
  }
};
</script>
