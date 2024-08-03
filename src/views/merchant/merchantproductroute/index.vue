<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">

      <el-form-item label="商户名称" prop="merchantId">
        <el-select v-model="queryParams.merchantId" style="width: 100%" placeholder="请选择" clearable>
          <el-option
            v-for="item in merchantOptions"
            :key="item.merchantId"
            :label="item.merchantShortName"
            :value="item.merchantId"
            :disabled="item.status != '0'"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付编码">
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

      <el-form-item label="产品名称" prop="productId">
        <el-select v-model="queryParams.productId" style="width: 100%" placeholder="请选择" clearable>
          <el-option
            v-for="item in productOptions"
            :key="item.productId"
            :label="item.productCode + ' - ' + item.productName"
            :value="item.productId"
            :disabled="item.status != '0'"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="比重" prop="weight"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入比重"
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
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['merchant:merchantproductroute:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['merchant:merchantproductroute:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="merchantproductrouteList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="路由ID" align="center" prop="id" min-width="100" sortable  />
      <el-table-column label="商户名称" align="center" prop="merchantName" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="支付编码" align="center" prop="wayCode" min-width="100"  sortableshow-overflow-tooltip />
      <el-table-column label="产品名称" align="center" prop="productName" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="产品编号" align="center" prop="productCode" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="比重" align="center" prop="weight" min-width="100" sortable show-overflow-tooltip />
      <el-table-column label="状态" align="center" prop="status" sortable>
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.updateTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="70" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['merchant:merchantproductroute:edit']"
          >修改</el-button>
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

    <!-- 添加或修改商户产品路由对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="比重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入比重" />
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
import { listMerchantproductroute, getMerchantproductroute, delMerchantproductroute, addMerchantproductroute, updateMerchantproductroute } from "@/api/merchant/merchantproductroute";
import { listSelectMerchant } from '@/api/merchant/merchant'
import { listSelectPayproduct } from '@/api/channel/payproduct'
import { listSelectPayWay } from '@/api/channel/payway'

export default {
  name: "Merchantproductroute",
  dicts: ['sys_normal_disable'],
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
      // 商户产品路由表格数据
      merchantproductrouteList: [],
      // 商户选项
      merchantOptions: [],
      // 产品选项
      productOptions: [],
      // 支付方式选项
      wayOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        merchantId: null,
        wayCode: null,
        productId: null,
        weight: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        weight: [
          { required: true, message: "比重不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    listSelectMerchant().then(response => {
      this.merchantOptions = response.data;
    });
    listSelectPayproduct().then(response => {
      this.productOptions = response.data;
    });
    listSelectPayWay().then(response => {
      this.wayOptions = response.data;
    });
  },
  methods: {
    /** 查询商户产品路由列表 */
    getList() {
      this.loading = true;
      listMerchantproductroute(this.queryParams).then(response => {
        this.merchantproductrouteList = response.rows;
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
        merchantId: null,
        wayCode: null,
        productId: null,
        weight: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商户产品路由";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMerchantproductroute(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户产品路由";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMerchantproductroute(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMerchantproductroute(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商户产品路由编号为"' + ids + '"的数据项？').then(function() {
        return delMerchantproductroute(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('merchant/merchantproductroute/export', {
        ...this.queryParams
      }, `merchantproductroute_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
