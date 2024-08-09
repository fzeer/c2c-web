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

      <el-form-item label="状态" prop="status" >
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="费率%" prop="ratePercent"   v-if="moreSearch">
        <el-input
          v-model="queryParams.ratePercent"
          placeholder="请输入费率"
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
          v-hasPermi="['merchant:merchantproduct:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['merchant:merchantproduct:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['merchant:merchantproduct:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['merchant:merchantproduct:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="merchantproductList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="商户号" align="center" prop="merchantNo" min-width="100"  sortable show-overflow-tooltip />
      <el-table-column label="商户名" align="center" prop="merchantName" min-width="100"  sortable show-overflow-tooltip />
      <el-table-column label="产品编号" align="center" prop="productCode" min-width="100"  sortable show-overflow-tooltip />
      <el-table-column label="产品名称" align="center" prop="productName" min-width="100"  sortable show-overflow-tooltip />
      <el-table-column label="支付编码" align="center" prop="wayCode" min-width="100"  sortable show-overflow-tooltip />
     <el-table-column label="费率%" align="right" prop="rate" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseDecimal(scope.row.rate * 100, 2) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="单笔费用" align="right" prop="single" min-width="100" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span class="">{{ parseMoney(scope.row.single) }}</span>
        </template>
      </el-table-column>
     <el-table-column label="单笔最小金额" align="right" prop="minMoney" min-width="130" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="">{{ parseMoney(scope.row.minMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="单笔最大金额" align="right" prop="maxMoney" min-width="130" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="">{{ parseMoney(scope.row.maxMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="每日最大金额" align="right" prop="dayMaxMoney" min-width="130" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="">{{ parseMoney(scope.row.dayMaxMoney) }}</span>
       </template>
     </el-table-column>
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
            v-hasPermi="['merchant:merchantproduct:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['merchant:merchantproduct:remove']"
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

    <!-- 添加或修改商户支付产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-form-item label="商户名称" prop="merchantId">
              <el-select v-model="form.merchantId" style="width: 100%" @change="merchantSelectChange" placeholder="请选择" :disabled="!!form.id">
                <el-option
                  v-for="item in merchantOptions"
                  :key="item.merchantId"
                  :label="item.merchantShortName"
                  :value="item.merchantId"
                  :disabled="item.status != '0'"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品名称" prop="productId">
              <el-select v-model="form.productId" style="width: 100%" placeholder="请选择" :disabled="!!form.id">
                <el-option
                  v-for="item in (form.id ? productOptions: productNoConfigOptions)"
                  :key="item.productId"
                  :label="item.productCode + ' - ' + item.productName"
                  :value="item.productId"
                  :disabled="item.status != '0'"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="费率%" prop="ratePercent">
              <el-input-number :disabled="false" v-model="form.ratePercent" :min="0.00" :step="0.10" :max="50.00" placeholder="请输入费率"/>
            </el-form-item>

            <el-form-item label="单笔费用" prop="single">
              <el-input v-model="form.single" placeholder="请输入单笔费用" />
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
          <el-tab-pane label="金额设置" name="second">
            <el-form-item label="单笔最小金额" prop="minMoney">
              <el-input v-model="form.minMoney" placeholder="请输入单笔最小金额" />
            </el-form-item>
            <el-form-item label="单笔最大金额" prop="maxMoney">
              <el-input v-model="form.maxMoney" placeholder="请输入单笔最大金额" />
            </el-form-item>
            <el-form-item label="每日最大金额" prop="dayMaxMoney">
              <el-input v-model="form.dayMaxMoney" placeholder="请输入每日最大金额" />
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
import { listMerchantproduct, getMerchantproduct, delMerchantproduct, addMerchantproduct, updateMerchantproduct } from "@/api/merchant/merchantproduct";
import { listSelectMerchant } from '@/api/merchant/merchant'
import { listSelectPayproduct, listSelectProductMerchantNoConfig } from '@/api/channel/payproduct'
import { parseDecimal } from '@/utils/ruoyi'

export default {
  name: "Merchantproduct",
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
      // 当前页
      activeName: 'first',
      // 总条数
      total: 0,
      // 商户支付产品表格数据
      merchantproductList: [],
      // 商户选项
      merchantOptions: [],
      // 产品选项
      productOptions: [],
      // 产品选项
      productNoConfigOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        merchantId: null,
        productId: null,
        rate: null,
        ratePercent: null,
        single: null,
        minMoney: null,
        maxMoney: null,
        dayMaxMoney: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        merchantId: [
          { required: true, message: "商户ID不能为空", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        ratePercent: [
          { required: true, message: "费率不能为空", trigger: "blur" }
        ],
        single: [
          { required: true, message: "单笔费用不能为空", trigger: "blur" }
        ],
        minMoney: [
          { required: true, message: "单笔最小金额不能为空", trigger: "blur" }
        ],
        maxMoney: [
          { required: true, message: "单笔最大金额不能为空", trigger: "blur" }
        ],
        dayMaxMoney: [
          { required: true, message: "每日最大金额不能为空", trigger: "blur" }
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
    })
  },
  methods: {
    parseDecimal,
    /** 查询商户支付产品列表 */
    getList() {
      this.loading = true;
      this.queryParams.rate = this.queryParams.ratePercent ?  Number(parseDecimal(this.queryParams.ratePercent / 100, 4)) : null
      listMerchantproduct(this.queryParams).then(response => {
        this.merchantproductList = response.rows;
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
        productId: null,
        rate: null,
        ratePercent: null,
        single: 0,
        minMoney: 0,
        maxMoney: 0,
        dayMaxMoney: 0,
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
      this.title = "添加商户支付产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMerchantproduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户支付产品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        this.form.rate = Number(parseDecimal(this.form.ratePercent / 100, 4));
        if (valid) {
          if (this.form.id != null) {
            updateMerchantproduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMerchantproduct(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商户支付产品编号为"' + ids + '"的数据项？').then(function() {
        return delMerchantproduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('merchant/merchantproduct/export', {
        ...this.queryParams
      }, `merchantproduct_${new Date().getTime()}.xlsx`)
    },
    /** 导出按钮操作 */
    merchantSelectChange() {
      listSelectProductMerchantNoConfig(this.form.merchantId).then(response => {
        this.productNoConfigOptions = response.data;
      })
    }
  }
};
</script>
