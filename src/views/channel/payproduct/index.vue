<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="产品编号" prop="productCode" >
        <el-input
          v-model="queryParams.productCode"
          placeholder="请输入产品编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName" >
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="渠道" >
        <el-select v-model="queryParams.channelId" style="width: 100%" placeholder="请选择"
                   clearable
                   @change="handleQuery">
          <el-option
            v-for="item in channelOptions"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
            :disabled="item.status != '0'"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付编码" v-if="moreSearch" >
        <el-select v-model="queryParams.wayCode" style="width: 100%" placeholder="请选择" clearable>
          <el-option
            v-for="item in wayOptions"
            :key="item.wayCode"
            :label="item.wayCode + ' - ' + item.wayName"
            :value="item.wayCode"
            :disabled="item.status != '0'"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内部名称" prop="productNameInner"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.productNameInner"
          placeholder="请输入内部名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bandCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bandCode"
          placeholder="请输入银行卡号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="结算类型" prop="settleType"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.settleType"
          placeholder="请输入结算类型"
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
      <el-form-item label="金额限制" prop="amountType"  v-if="moreSearch" >
        <el-select v-model="queryParams.amountType" placeholder="请选择金额限制" clearable>
          <el-option
            v-for="dict in dict.type.amount_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="附加参数" prop="extraParam"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.extraParam"
          placeholder="请输入附加参数"
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
          v-hasPermi="['channel:payproduct:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['channel:payproduct:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['channel:payproduct:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['channel:payproduct:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="payproductList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="productId" />
      <el-table-column label="产品编号" align="center" prop="productCode" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="产品名称" align="center" prop="productName"  min-width="100" show-overflow-tooltip />
      <el-table-column label="内部名称" align="center" prop="productNameInner"  min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="银行卡号" align="center" prop="bandCode" show-overflow-tooltip />
      <el-table-column label="支付编码" align="center" prop="wayCode" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="渠道" align="center" prop="channelName" min-width="100" sortable show-overflow-tooltip />
     <el-table-column label="费率" align="right" prop="rate" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.rate) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="单笔金额" align="center" prop="single" show-overflow-tooltip />
      <el-table-column label="最低手续费" align="center" prop="minFee" min-width="100" show-overflow-tooltip />
     <el-table-column label="最低金额" align="right" prop="minMoney" min-width="100" show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.minMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="最高金额" align="right" prop="maxMoney" min-width="100" show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.maxMoney) }}</span>
       </template>
     </el-table-column>
<!--      <el-table-column label="结算类型" align="center" prop="settleType" show-overflow-tooltip />-->
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="金额限制" align="center" prop="amountType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.amount_type" :value="scope.row.amountType"/>
        </template>
      </el-table-column>
      <el-table-column label="固定金额" align="center" prop="amountLst" show-overflow-tooltip />
      <el-table-column label="附加参数" align="center" prop="extraParam" show-overflow-tooltip />
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
            v-hasPermi="['channel:payproduct:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['channel:payproduct:remove']"
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

    <!-- 添加或修改支付产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
              <el-form-item label="渠道">
                <el-select v-model="form.channelId" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in channelOptions"
                    :key="item.channelId"
                    :label="item.channelName"
                    :value="item.channelId"
                    :disabled="item.status != '0'"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品编号" prop="productCode">
                <el-input v-model="form.productCode" placeholder="请输入产品编号" />
              </el-form-item>
              <el-form-item label="产品名称" prop="productName">
                <el-input v-model="form.productName" placeholder="请输入产品名称" />
              </el-form-item>
              <el-form-item label="内部名称" prop="productNameInner">
                <el-input v-model="form.productNameInner" placeholder="请输入内部名称" />
              </el-form-item>
              <el-form-item label="银行卡号" prop="bandCode">
                <el-input v-model="form.bandCode" placeholder="请输入银行卡号" />
              </el-form-item>

              <el-form-item label="支付编码">
                <el-select v-model="form.wayCode" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in wayOptions"
                    :key="item.wayCode"
                    :label="item.wayCode + ' - ' + item.wayName"
                    :value="item.wayCode"
                    :disabled="item.status != '0'"
                  ></el-option>
                </el-select>
              </el-form-item>

<!--              <el-form-item label="结算类型" prop="settleType">-->
<!--                <el-input v-model="form.settleType" placeholder="请输入结算类型" />-->
<!--              </el-form-item>-->

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
          <el-tab-pane label="金额设置" name="second">
            <el-form-item label="最低金额" prop="minMoney">
              <el-input v-model="form.minMoney" placeholder="请输入最低金额" />
            </el-form-item>
            <el-form-item label="最高金额" prop="maxMoney">
              <el-input v-model="form.maxMoney" placeholder="请输入最高金额" />
            </el-form-item>
            <el-form-item label="金额限制" prop="amountType">
              <el-select v-model="form.amountType" placeholder="请选择金额限制">
                <el-option
                  v-for="dict in dict.type.amount_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定金额" prop="amountLst">
              <el-input v-model="form.amountLst" type="textarea" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="附加参数" prop="extraParam">
              <el-input v-model="form.extraParam" placeholder="请输入附加参数" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="渠道费率" name="third">
            <el-form-item label="费率" prop="rate">
              <el-input-number :disabled="false" v-model="form.rate" :min="0.01" :step="0.01" :max="0.99" placeholder="请输入费率"/>
            </el-form-item>
            <el-form-item label="单笔金额" prop="single">
              <el-input v-model="form.single" placeholder="请输入单笔金额" />
            </el-form-item>
            <el-form-item label="最低手续费" prop="minFee">
              <el-input v-model="form.minFee" placeholder="请输入最低手续费" />
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
import { listPayproduct, getPayproduct, delPayproduct, addPayproduct, updatePayproduct } from "@/api/channel/payproduct";
import { listSelectChannel } from '@/api/channel/paymentchannel'
import { listSelectPayWay } from '@/api/channel/payway'

export default {
  name: "Payproduct",
  dicts: ['sys_normal_disable', 'amount_type'],
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
      // 支付产品表格数据
      payproductList: [],
      // 渠道下拉框数据
      channelOptions: [],
      // 支付编码下拉框数据
      wayOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 当前页
      activeName: 'first',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productCode: null,
        productName: null,
        productNameInner: null,
        bandCode: null,
        wayCode: null,
        channelId: null,
        rate: null,
        single: null,
        minFee: null,
        minMoney: null,
        maxMoney: null,
        settleType: null,
        status: null,
        amountType: null,
        amountLst: null,
        extraParam: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        productCode: [
          { required: true, message: "产品编号不能为空", trigger: "blur" }
        ],
        productName: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        productNameInner: [
          { required: true, message: "内部名称不能为空", trigger: "blur" }
        ],
        bandCode: [
          { required: true, message: "银行卡号不能为空", trigger: "blur" }
        ],
        wayCode: [
          { required: true, message: "支付编码不能为空", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "渠道不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "费率不能为空", trigger: "blur" }
        ],
        single: [
          { required: true, message: "单笔金额不能为空", trigger: "blur" }
        ],
        minFee: [
          { required: true, message: "最低手续费不能为空", trigger: "blur" }
        ],
        minMoney: [
          { required: true, message: "最低金额不能为空", trigger: "blur" }
        ],
        maxMoney: [
          { required: true, message: "最高金额不能为空", trigger: "blur" }
        ],
        settleType: [
          { required: true, message: "结算类型不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        amountType: [
          { required: true, message: "金额限制不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getChannelOptions();
    this.getWayOptions();
  },
  methods: {
    /** 查询支付产品列表 */
    getList() {
      this.loading = true;
      listPayproduct(this.queryParams).then(response => {
        this.payproductList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询渠道下拉框数据 */
    getChannelOptions() {
      listSelectChannel().then(response => {
        this.channelOptions = response.data;
      });
    },
    /** 查询支付编码下拉框数据 */
    getWayOptions() {
      listSelectPayWay().then(response => {
        this.wayOptions = response.data;
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
        productId: null,
        productCode: null,
        productName: null,
        productNameInner: null,
        bandCode: null,
        wayCode: null,
        channelId: null,
        rate: null,
        single: 0,
        minFee: 0,
        minMoney: 0,
        maxMoney: 0,
        settleType: '0',
        status: "0",
        amountType: '0',
        amountLst: null,
        extraParam: null,
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
      this.ids = selection.map(item => item.productId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加支付产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const productId = row.productId || this.ids
      getPayproduct(productId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改支付产品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.productId != null) {
            updatePayproduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayproduct(this.form).then(response => {
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
      const productIds = row.productId || this.ids;
      this.$modal.confirm('是否确认删除支付产品编号为"' + productIds + '"的数据项？').then(function() {
        return delPayproduct(productIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('channel/payproduct/export', {
        ...this.queryParams
      }, `payproduct_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
