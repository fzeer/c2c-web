<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="系统订单号" prop="orderCode" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入系统订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户订单号" prop="mchOrderCode" >
        <el-input
          v-model="queryParams.mchOrderCode"
          placeholder="请输入商户订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="订单状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态" clearable>
          <el-option
            v-for="dict in dict.type.order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商户编号" prop="merchantNo"    v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantNo"
          placeholder="请输入商户编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="渠道订单号" prop="channelOrderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelOrderCode"
          placeholder="请输入渠道订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="代理商ID" prop="agentId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入代理商ID"
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
      <el-form-item label="代理商" prop="agentName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.agentName"
          placeholder="请输入代理商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户名称" prop="merchantName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantName"
          placeholder="请输入商户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道名称" prop="channelName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品编号" prop="productCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.productCode"
          placeholder="请输入产品编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款账号" prop="accountNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.accountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付方式编码" prop="wayCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.wayCode"
          placeholder="请输入支付方式编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户端IP" prop="clientIp"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.clientIp"
          placeholder="请输入客户端IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="订单金额" prop="totalMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.totalMoney"
          placeholder="请输入订单金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户费率%" prop="ratePercent"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.ratePercent"
          placeholder="请输入商户费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理费率%" prop="agentRatPercent"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.agentRatePercent"
          placeholder="请输入代理费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道费率%" prop="channelRatePercent"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelRate"
          placeholder="请输入渠道费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="通知状态" prop="notifyStatus"  v-if="moreSearch" >
        <el-select v-model="queryParams.notifyStatus" placeholder="请选择通知状态" clearable>
          <el-option
            v-for="dict in dict.type.order_notify_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否为补单" prop="supplementYn"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplementYn"
          placeholder="请输入是否为补单"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补单流水号" prop="supplementRefNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplementRefNo"
          placeholder="请输入补单流水号"
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
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="multiple"
          @click="handleNotify"
          v-hasPermi="['paying:payorder:notify']"
        >批量通知</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleSupplement"
          v-hasPermi="['paying:payorder:supplement']"
        >补单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['paying:payorder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="payorderList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="订单ID" align="center" prop="orderId" />-->
      <el-table-column label="系统订单号" align="center" prop="orderCode" min-width="180" sortable show-overflow-tooltip/>
      <el-table-column label="商户编号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户名称" align="center" prop="merchantName" show-overflow-tooltip />
      <el-table-column label="商户订单号" align="center" prop="mchOrderCode" min-width="130" show-overflow-tooltip />
      <el-table-column label="订单金额" align="right" prop="totalMoney" min-width="100" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span class="text-money">{{ parseMoney(scope.row.totalMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣金额" align="right" prop="realMoney" min-width="100" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span class="text-money">{{ parseMoney(scope.row.realMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="过期时间" align="center" prop="expiryTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiryTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="订单状态">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="payTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.payTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip />
      <el-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip />
      <el-table-column label="内部名称" align="center" prop="productNameInner" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="银行名称" align="center" prop="bankName" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="收款账号" align="center" prop="accountNo" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="支付编码" align="center" prop="wayCode" show-overflow-tooltip />
      <el-table-column label="支付方式" align="center" prop="wayName" show-overflow-tooltip />
      <el-table-column label="客户端IP" align="center" prop="clientIp" show-overflow-tooltip />
      <el-table-column label="渠道名称" align="center" prop="channelName" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="渠道费率%" align="right" prop="channelRate" min-width="110" v-has-role="['admin']" show-overflow-tooltip >
        <template v-slot="scope">
          <span class="text-money">{{ parseDecimal(scope.row.channelRate * 100, 2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道订单号" align="center" prop="channelOrderCode" min-width="110" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="代理商" align="center" prop="agentName" v-has-role="['agent','admin']" show-overflow-tooltip />
      <el-table-column label="代理费率%" align="right" prop="agentRate" min-width="110" v-has-role="['agent','admin']" show-overflow-tooltip >
        <template v-slot="scope">
          <span class="text-money">{{ parseDecimal(scope.row.agentRate * 100, 2)}}</span>
        </template>
      </el-table-column>
     <el-table-column label="商户费率%" align="right" prop="rate" min-width="110" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseDecimal(scope.row.rate * 100, 2)}}</span>
       </template>
     </el-table-column>
      <el-table-column label="单笔手续费" align="right" prop="single" min-width="110" show-overflow-tooltip />
      <el-table-column label="总手续费" align="right" prop="fee" show-overflow-tooltip />
      <el-table-column label="入账金额" align="right" prop="enteredMoney" min-width="100" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span class="text-money">{{ parseMoney(scope.row.enteredMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道错误" align="center" prop="channelErrMsg" v-has-role="['admin']" show-overflow-tooltip />
<!--      <el-table-column label="货币代码" align="center" prop="currency" show-overflow-tooltip />-->
<!--      <el-table-column label="汇率" align="right" prop="exchangeRate" show-overflow-tooltip />-->
<!--     <el-table-column label="原币金额" align="right" prop="originMoney" min-width="100" sortable show-overflow-tooltip >-->
<!--       <template v-slot="scope">-->
<!--         <span class="text-money">{{ parseMoney(scope.row.originMoney) }}</span>-->
<!--       </template>-->
<!--     </el-table-column>-->
      <el-table-column label="成功时间" align="center" prop="successTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.successTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知状态" align="center" prop="notifyStatus">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_notify_status" :value="scope.row.notifyStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="是否补单" align="center" prop="supplementYn" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="补单时间" align="center" prop="supplementTime" min-width="110" v-has-role="['admin']" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.supplementTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补单流水号" align="center" prop="supplementRefNo" min-width="110" v-has-role="['admin']" sortable show-overflow-tooltip/>
      <el-table-column label="补单原因" align="center" prop="supplementReason" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="补单人员" align="center" prop="supplementUser" v-has-role="['admin']" show-overflow-tooltip />
      <el-table-column label="关闭时间" align="center" prop="expiredTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiredTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="170" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-bell"
            @click="handleNotify(scope.row)"
            v-hasPermi="['paying:payorder:notify']"
          >通知</el-button>
          <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['paying:payorder:supplement', 'paying:payorder:noifylog',  'paying:payorder:requestlog', 'paying:payorder:delete']">
                <span class="el-dropdown-link">
                  <i class="el-icon-d-arrow-right el-icon--right"></i>更多
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleResetPwd" icon="el-icon-edit"
                                v-hasPermi="['paying:payorder:supplement']" v-has-role="['admin']">补单</el-dropdown-item>
              <el-dropdown-item command="handleSupplement" icon="el-icon-info"
                                v-hasPermi="['paying:payorder:noifylog']" v-has-role="['admin']">回调报文</el-dropdown-item>
              <el-dropdown-item command="handleNotifyLog" icon="el-icon-s-operation"
                                v-hasPermi="['paying:payorder:channellog']" v-has-role="['admin']">渠道请求记录</el-dropdown-item>
              <el-dropdown-item command="handleChannelLog" icon="el-icon-delete"
                                v-hasPermi="['paying:payorder:delete']" v-has-role="['admin']">删除订单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <!-- 添加或修改商户支付订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="Ref.NO." prop="supplementRefNo">
          <el-input v-model="form.supplementRefNo" placeholder="请输入补单流水号" />
        </el-form-item>
        <el-form-item label="补单原因" prop="supplementReason">
          <el-input v-model="form.supplementReason" placeholder="请输入补单原因" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

<!--    详情页面-->
    <el-drawer
      title="详情页面"
      :with-header="false"
      :visible.sync="drawerDetailShow"
      direction="rtl">
      <template>
        <el-descriptions class="mt5 ml10" title="订单详情" :column="1" size="medium">
<!--          <template slot="extra">-->
<!--            <el-button type="primary" size="small">操作</el-button>-->
<!--          </template>-->
          <el-descriptions-item label="订单状态" label-class-name="text-muted">
            <dict-tag :options="dict.type.order_status" :value="detailForm.status"/>
          </el-descriptions-item>
          <el-descriptions-item label="通知状态" label-class-name="text-muted">
            <span>
              <el-col :span="12">
                <dict-tag :options="dict.type.order_notify_status" :value="detailForm.notifyStatus"/>
              </el-col>
<!--              订单状态：0=订单生成, 1=支付中, 2=支付成功, 3=支付失败, 4=已撤销, 5=已退款, 6=订单关闭-->
              <el-col :span="12">
                <el-button
                  size="mini"
                  icon="el-icon-bell"
                  @click="handleNotify(detailForm)"
                  v-hasPermi="['paying:payorder:notify']"
                  :disabled="detailForm.status != '2'"
                >重发通知</el-button>
              </el-col>
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="系统订单号" label-class-name="text-muted">{{detailForm.orderCode}}</el-descriptions-item>
          <el-descriptions-item label="商户订单号" label-class-name="text-muted">{{detailForm.mchOrderCode}}</el-descriptions-item>
          <el-descriptions-item label="商户号" label-class-name="text-muted">{{detailForm.merchantNo}}</el-descriptions-item>
          <el-descriptions-item label="商户名称" label-class-name="text-muted">{{detailForm.merchantName}}</el-descriptions-item>
          <el-descriptions-item label="订单金额" label-class-name="text-muted" content-class-name="text-money">{{parseMoney(detailForm.totalMoney)}}</el-descriptions-item>
          <el-descriptions-item label="折扣金额" label-class-name="text-muted">{{parseMoney(detailForm.realMoney)}}</el-descriptions-item>
          <el-descriptions-item label="过期时间" label-class-name="text-muted">{{parseTime(detailForm.expiryTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</el-descriptions-item>
          <el-descriptions-item label="支付时间" label-class-name="text-muted">{{parseTime(detailForm.payTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</el-descriptions-item>
          <el-descriptions-item label="产品编号" label-class-name="text-muted">{{detailForm.productCode}}</el-descriptions-item>
          <el-descriptions-item label="产品名称" label-class-name="text-muted">{{detailForm.productName}}</el-descriptions-item>
          <el-descriptions-item label="内部名称" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.productNameInner}}</el-descriptions-item>
          <el-descriptions-item label="银行名称" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.bankName}}</el-descriptions-item>
          <el-descriptions-item label="收款账号" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.accountNo}}</el-descriptions-item>
          <el-descriptions-item label="支付编码" label-class-name="text-muted">{{detailForm.wayCode}}</el-descriptions-item>
          <el-descriptions-item label="支付方式" label-class-name="text-muted">{{detailForm.wayName}}</el-descriptions-item>
          <el-descriptions-item label="支付连接" label-class-name="text-muted">{{detailForm.payUrl}}</el-descriptions-item>
          <el-descriptions-item label="客户端IP" label-class-name="text-muted">{{detailForm.clientIp}}</el-descriptions-item>
          <el-descriptions-item label="渠道名称" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.channelName}}</el-descriptions-item>
          <el-descriptions-item label="渠道费率%" label-class-name="text-muted" v-has-role="['admin']">{{parseDecimal(detailForm.channelRate * 100, 2)}}</el-descriptions-item>
          <el-descriptions-item label="渠道订单号" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.channelOrderCode}}</el-descriptions-item>
          <el-descriptions-item label="代理商" label-class-name="text-muted" v-has-role="['agent', 'admin']">{{detailForm.agentName}}</el-descriptions-item>
          <el-descriptions-item label="代理费率%" label-class-name="text-muted" v-has-role="['agent', 'admin']">{{parseDecimal(detailForm.agentRate * 100, 2)}}</el-descriptions-item>
          <el-descriptions-item label="商户费率%" label-class-name="text-muted">{{parseDecimal(detailForm.rate * 100, 2)}}</el-descriptions-item>
          <el-descriptions-item label="单笔手续费" label-class-name="text-muted">{{detailForm.single}}</el-descriptions-item>
          <el-descriptions-item label="总手续费" label-class-name="text-muted">{{detailForm.fee}}</el-descriptions-item>
          <el-descriptions-item label="入账金额" label-class-name="text-muted" content-class-name="text-money">{{parseMoney(detailForm.enteredMoney)}}</el-descriptions-item>
          <el-descriptions-item label="渠道错误代码" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.channelErrCode}}</el-descriptions-item>
          <el-descriptions-item label="渠道错误" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.channelErrMsg}}</el-descriptions-item>
          <el-descriptions-item label="成功时间" label-class-name="text-muted">{{parseTime(detailForm.successTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</el-descriptions-item>
          <el-descriptions-item label="通知地址" label-class-name="text-muted">{{detailForm.notifyUrl}}</el-descriptions-item>
          <el-descriptions-item label="通知内容" label-class-name="text-muted">{{detailForm.notifyData}}</el-descriptions-item>
          <el-descriptions-item label="商户返回" label-class-name="text-muted">{{detailForm.notifyResult}}</el-descriptions-item>
          <el-descriptions-item label="渠道地址" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.returnUrl}}</el-descriptions-item>
          <el-descriptions-item label="是否补单" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.supplementYn}}</el-descriptions-item>
          <el-descriptions-item label="补单时间" label-class-name="text-muted" v-has-role="['admin']">{{parseTime(detailForm.supplementTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</el-descriptions-item>
          <el-descriptions-item label="补单流水号" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.supplementRefNo}}</el-descriptions-item>
          <el-descriptions-item label="补单原因" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.supplementReason}}</el-descriptions-item>
          <el-descriptions-item label="补单人员" label-class-name="text-muted" v-has-role="['admin']">{{detailForm.supplementUser}}</el-descriptions-item>
        </el-descriptions>
      </template>
    </el-drawer>

  </div>
</template>

<script>
import { listPayorder, getPayorder, delPayorder, addPayorder, updatePayorder, notifyPayorder } from "@/api/paying/payorder";
import { parseDecimal } from '../../../utils/ruoyi'

export default {
  name: "Payorder",
  dicts: ['order_status', 'order_notify_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示更多筛选项
      moreSearch: false,
      // 显示更多筛选项
      drawerDetailShow: false,
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
      // 商户支付订单表格数据
      payorderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agentId: null,
        adminId: null,
        merchantId: null,
        agentName: null,
        merchantNo: null,
        merchantName: null,
        orderCode: null,
        mchOrderCode: null,
        channelExtra: null,
        channelUser: null,
        channelOrderCode: null,
        expiryTime: null,
        payTime: null,
        channelId: null,
        productId: null,
        channelName: null,
        productCode: null,
        productName: null,
        productNameInner: null,
        accountId: null,
        bankName: null,
        accountNo: null,
        wayCode: null,
        wayName: null,
        clientIp: null,
        subject: null,
        body: null,
        extParam: null,
        status: null,
        totalMoney: null,
        realMoney: null,
        enteredMoney: null,
        single: null,
        rate: null,
        ratePercent: null,
        fee: null,
        agentRate: null,
        channelRate: null,
        channelPayUrl: null,
        channelErrCode: null,
        channelErrMsg: null,
        payUrl: null,
        currency: null,
        exchangeRate: null,
        originMoney: null,
        expiredTime: null,
        successTime: null,
        notifyStatus: null,
        notifyUrl: null,
        returnUrl: null,
        supplementYn: null,
        supplementTime: null,
        supplementRefNo: null,
        supplementReason: null,
        supplementUser: null,
        refundStatus: null,
        refundTimes: null,
        refundAmount: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      detailForm: {},
      // 表单校验
      rules: {
        refundAmount: [
          { required: true, message: "退款总金额不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    parseDecimal,
    /** 查询商户支付订单列表 */
    getList() {
      this.loading = true;
      this.queryParams.rate = this.queryParams.ratePercent ?  Number(parseDecimal(this.queryParams.ratePercent / 100, 4)) : null
      listPayorder(this.queryParams).then(response => {
        this.payorderList = response.rows;
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
        agentId: null,
        adminId: null,
        merchantId: null,
        agentName: null,
        merchantNo: null,
        merchantName: null,
        orderCode: null,
        mchOrderCode: null,
        channelExtra: null,
        channelUser: null,
        channelOrderCode: null,
        expiryTime: null,
        payTime: null,
        channelId: null,
        productId: null,
        channelName: null,
        productCode: null,
        productName: null,
        productNameInner: null,
        accountId: null,
        bankName: null,
        accountNo: null,
        wayCode: null,
        wayName: null,
        clientIp: null,
        subject: null,
        body: null,
        extParam: null,
        status: null,
        totalMoney: null,
        realMoney: null,
        enteredMoney: null,
        single: null,
        rate: null,
        fee: null,
        agentRate: null,
        channelRate: null,
        channelPayUrl: null,
        channelErrCode: null,
        channelErrMsg: null,
        payUrl: null,
        currency: null,
        exchangeRate: null,
        originMoney: null,
        expiredTime: null,
        successTime: null,
        notifyStatus: null,
        notifyUrl: null,
        returnUrl: null,
        supplementYn: null,
        supplementTime: null,
        supplementRefNo: null,
        supplementReason: null,
        supplementUser: null,
        refundStatus: null,
        refundTimes: null,
        refundAmount: null,
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
      this.title = "添加商户支付订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getPayorder(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商户支付订单";
      });
    },

    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleSupplement":
          this.handleSupplement(row);
          break;
        case "handleNotifyLog":
          this.handleNotifyLog(row);
          break;
        case "handleChannelLog":
          this.handleChannelLog(row);
          break;
        default:
          break;
      }
    },

    /** 查看 */
    handleView(row) {
      // this.$router.push("/pay/payorder/details/" + row.orderCode);
      this.detailForm = row
      this.drawerDetailShow = true
    },


    /** 通知 */
    handleNotify(row) {
      const orderIds = row.orderId || this.ids;
      this.$modal.confirm('是否确认对勾选的"' + orderIds.length + '笔订单重发通知"？').then(function() {
        return notifyPayorder(orderIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 补单 */
    handleSupplement(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getPayorder(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "补单";
      });
    },

    handleNotifyLog(row) {},
    handleChannelLog(row) {},

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderId != null) {
            updatePayorder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayorder(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商户支付订单编号为"' + orderIds + '"的数据项？').then(function() {
        return delPayorder(orderIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('paying/payorder/export', {
        ...this.queryParams
      }, `payorder_${new Date().getTime()}.xlsx`)
    },

  }
};
</script>
