<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="代理商ID" prop="agentId" >
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入代理商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务员ID" prop="adminId" >
        <el-input
          v-model="queryParams.adminId"
          placeholder="请输入业务员ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户ID" prop="merchantId" >
        <el-input
          v-model="queryParams.merchantId"
          placeholder="请输入商户ID"
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
      <el-form-item label="商户编号" prop="merchantNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.merchantNo"
          placeholder="请输入商户编号"
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
      <el-form-item label="系统订单号" prop="orderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入系统订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户订单号" prop="mOrderCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.mOrderCode"
          placeholder="请输入商户订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道用户标识,如微信openId,支付宝账号" prop="channelUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelUser"
          placeholder="请输入渠道用户标识,如微信openId,支付宝账号"
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
      <el-form-item label="渠道ID" prop="channelId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelId"
          placeholder="请输入渠道ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品ID" prop="productId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.productId"
          placeholder="请输入产品ID"
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
      <el-form-item label="内部产品名称" prop="productNameInner"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.productNameInner"
          placeholder="请输入内部产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡ID" prop="bankId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankId"
          placeholder="请输入银行卡ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.bankCode"
          placeholder="请输入银行卡号"
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
      <el-form-item label="支付方式" prop="wayName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.wayName"
          placeholder="请输入支付方式"
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
      <el-form-item label="商品标题" prop="subject"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.subject"
          placeholder="请输入商品标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品描述信息" prop="body"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.body"
          placeholder="请输入商品描述信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户扩展参数" prop="extParam"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.extParam"
          placeholder="请输入商户扩展参数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="status"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.status"
          placeholder="请输入订单状态"
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
      <el-form-item label="实际金额" prop="realMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.realMoney"
          placeholder="请输入实际金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入账金额" prop="enteredMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.enteredMoney"
          placeholder="请输入入账金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单笔手续费" prop="single"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.single"
          placeholder="请输入单笔手续费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户费率" prop="rate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入商户费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手续费" prop="poundage"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.poundage"
          placeholder="请输入手续费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理费率" prop="agentRate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.agentRate"
          placeholder="请输入代理费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道费率" prop="channelRate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelRate"
          placeholder="请输入渠道费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道支付错误码" prop="channelErrCode"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelErrCode"
          placeholder="请输入渠道支付错误码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道支付错误描述" prop="channelErrMsg"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.channelErrMsg"
          placeholder="请输入渠道支付错误描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货币代码" prop="currency"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.currency"
          placeholder="请输入货币代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇率" prop="exchangeRate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.exchangeRate"
          placeholder="请输入汇率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原币金额" prop="originMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.originMoney"
          placeholder="请输入原币金额"
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
      <el-form-item label="补单原因" prop="supplementReason"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplementReason"
          placeholder="请输入补单原因"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补单人员" prop="supplementUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.supplementUser"
          placeholder="请输入补单人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="退款状态:" prop="refundStatus"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.refundStatus"
          placeholder="请输入退款状态:"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="退款次数" prop="refundTimes"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.refundTimes"
          placeholder="请输入退款次数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="退款总金额" prop="refundAmount"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.refundAmount"
          placeholder="请输入退款总金额"
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
          v-hasPermi="['paying:payorder:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['paying:payorder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['paying:payorder:remove']"
        >删除</el-button>
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
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="代理商ID" align="center" prop="agentId" show-overflow-tooltip />
      <el-table-column label="业务员ID" align="center" prop="adminId" show-overflow-tooltip />
      <el-table-column label="商户ID" align="center" prop="merchantId" show-overflow-tooltip />
      <el-table-column label="代理商" align="center" prop="agentName" show-overflow-tooltip />
      <el-table-column label="商户编号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户名称" align="center" prop="merchantName" show-overflow-tooltip />
      <el-table-column label="系统订单号" align="center" prop="orderCode" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户订单号" align="center" prop="mOrderCode" show-overflow-tooltip />
      <el-table-column label="特定渠道发起额外参数" align="center" prop="channelExtra" show-overflow-tooltip />
      <el-table-column label="渠道用户标识,如微信openId,支付宝账号" align="center" prop="channelUser" show-overflow-tooltip />
      <el-table-column label="渠道订单号" align="center" prop="channelOrderCode" show-overflow-tooltip />
      <el-table-column label="过期时间" align="center" prop="expiryTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiryTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="payTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.payTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道ID" align="center" prop="channelId" show-overflow-tooltip />
      <el-table-column label="产品ID" align="center" prop="productId" show-overflow-tooltip />
      <el-table-column label="渠道名称" align="center" prop="channelName" show-overflow-tooltip />
      <el-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip />
      <el-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip />
      <el-table-column label="内部产品名称" align="center" prop="productNameInner" show-overflow-tooltip />
      <el-table-column label="银行卡ID" align="center" prop="bankId" show-overflow-tooltip />
      <el-table-column label="银行名称" align="center" prop="bankName" show-overflow-tooltip />
      <el-table-column label="银行卡号" align="center" prop="bankCode" show-overflow-tooltip />
      <el-table-column label="支付方式编码" align="center" prop="wayCode" show-overflow-tooltip />
      <el-table-column label="支付方式" align="center" prop="wayName" show-overflow-tooltip />
      <el-table-column label="客户端IP" align="center" prop="clientIp" show-overflow-tooltip />
      <el-table-column label="商品标题" align="center" prop="subject" show-overflow-tooltip />
      <el-table-column label="商品描述信息" align="center" prop="body" show-overflow-tooltip />
      <el-table-column label="商户扩展参数" align="center" prop="extParam" show-overflow-tooltip />
      <el-table-column label="订单状态" align="center" prop="status" show-overflow-tooltip />
     <el-table-column label="订单金额" align="right" prop="totalMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.totalMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="实际金额" align="right" prop="realMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.realMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="入账金额" align="right" prop="enteredMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.enteredMoney) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="单笔手续费" align="center" prop="single" show-overflow-tooltip />
     <el-table-column label="商户费率" align="right" prop="rate" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.rate) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="手续费" align="center" prop="poundage" show-overflow-tooltip />
      <el-table-column label="代理费率" align="center" prop="agentRate" show-overflow-tooltip />
      <el-table-column label="渠道费率" align="center" prop="channelRate" show-overflow-tooltip />
      <el-table-column label="渠道支付链接" align="center" prop="channelPayUrl" show-overflow-tooltip />
      <el-table-column label="渠道支付错误码" align="center" prop="channelErrCode" show-overflow-tooltip />
      <el-table-column label="渠道支付错误描述" align="center" prop="channelErrMsg" show-overflow-tooltip />
      <el-table-column label="收银台链接" align="center" prop="payUrl" show-overflow-tooltip />
      <el-table-column label="货币代码" align="center" prop="currency" show-overflow-tooltip />
      <el-table-column label="汇率" align="center" prop="exchangeRate" show-overflow-tooltip />
     <el-table-column label="原币金额" align="right" prop="originMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.originMoney) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="订单失效时间" align="center" prop="expiredTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiredTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单支付成功时间" align="center" prop="successTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.successTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知状态" align="center" prop="notifyStatus">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_notify_status" :value="scope.row.notifyStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="通知URL" align="center" prop="notifyUrl" show-overflow-tooltip />
      <el-table-column label="跳转链接" align="center" prop="returnUrl" show-overflow-tooltip />
      <el-table-column label="是否为补单" align="center" prop="supplementYn" show-overflow-tooltip />
      <el-table-column label="补单时间" align="center" prop="supplementTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.supplementTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补单流水号" align="center" prop="supplementRefNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="补单原因" align="center" prop="supplementReason" show-overflow-tooltip />
      <el-table-column label="补单人员" align="center" prop="supplementUser" show-overflow-tooltip />
      <el-table-column label="退款状态:" align="center" prop="refundStatus" show-overflow-tooltip />
      <el-table-column label="退款次数" align="center" prop="refundTimes" show-overflow-tooltip />
      <el-table-column label="退款总金额" align="center" prop="refundAmount" show-overflow-tooltip />
      <el-table-column label="部门ID" align="center" prop="deptId" show-overflow-tooltip />
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
            v-hasPermi="['paying:payorder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['paying:payorder:remove']"
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

    <!-- 添加或修改商户支付订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代理商ID" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入代理商ID" />
        </el-form-item>
        <el-form-item label="业务员ID" prop="adminId">
          <el-input v-model="form.adminId" placeholder="请输入业务员ID" />
        </el-form-item>
        <el-form-item label="商户ID" prop="merchantId">
          <el-input v-model="form.merchantId" placeholder="请输入商户ID" />
        </el-form-item>
        <el-form-item label="代理商" prop="agentName">
          <el-input v-model="form.agentName" placeholder="请输入代理商" />
        </el-form-item>
        <el-form-item label="商户编号" prop="merchantNo">
          <el-input v-model="form.merchantNo" placeholder="请输入商户编号" />
        </el-form-item>
        <el-form-item label="商户名称" prop="merchantName">
          <el-input v-model="form.merchantName" placeholder="请输入商户名称" />
        </el-form-item>
        <el-form-item label="系统订单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入系统订单号" />
        </el-form-item>
        <el-form-item label="商户订单号" prop="mOrderCode">
          <el-input v-model="form.mOrderCode" placeholder="请输入商户订单号" />
        </el-form-item>
        <el-form-item label="特定渠道发起额外参数" prop="channelExtra">
          <el-input v-model="form.channelExtra" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="渠道用户标识,如微信openId,支付宝账号" prop="channelUser">
          <el-input v-model="form.channelUser" placeholder="请输入渠道用户标识,如微信openId,支付宝账号" />
        </el-form-item>
        <el-form-item label="渠道订单号" prop="channelOrderCode">
          <el-input v-model="form.channelOrderCode" placeholder="请输入渠道订单号" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expiryTime">
          <el-date-picker clearable
            v-model="form.expiryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-date-picker clearable
            v-model="form.payTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道ID" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入渠道ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="productId">
          <el-input v-model="form.productId" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入产品编号" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="内部产品名称" prop="productNameInner">
          <el-input v-model="form.productNameInner" placeholder="请输入内部产品名称" />
        </el-form-item>
        <el-form-item label="银行卡ID" prop="bankId">
          <el-input v-model="form.bankId" placeholder="请输入银行卡ID" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="支付方式编码" prop="wayCode">
          <el-input v-model="form.wayCode" placeholder="请输入支付方式编码" />
        </el-form-item>
        <el-form-item label="支付方式" prop="wayName">
          <el-input v-model="form.wayName" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="客户端IP" prop="clientIp">
          <el-input v-model="form.clientIp" placeholder="请输入客户端IP" />
        </el-form-item>
        <el-form-item label="商品标题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入商品标题" />
        </el-form-item>
        <el-form-item label="商品描述信息" prop="body">
          <el-input v-model="form.body" placeholder="请输入商品描述信息" />
        </el-form-item>
        <el-form-item label="商户扩展参数" prop="extParam">
          <el-input v-model="form.extParam" placeholder="请输入商户扩展参数" />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input v-model="form.status" placeholder="请输入订单状态" />
        </el-form-item>
        <el-form-item label="订单金额" prop="totalMoney">
          <el-input v-model="form.totalMoney" placeholder="请输入订单金额" />
        </el-form-item>
        <el-form-item label="实际金额" prop="realMoney">
          <el-input v-model="form.realMoney" placeholder="请输入实际金额" />
        </el-form-item>
        <el-form-item label="入账金额" prop="enteredMoney">
          <el-input v-model="form.enteredMoney" placeholder="请输入入账金额" />
        </el-form-item>
        <el-form-item label="单笔手续费" prop="single">
          <el-input v-model="form.single" placeholder="请输入单笔手续费" />
        </el-form-item>
        <el-form-item label="商户费率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入商户费率" />
        </el-form-item>
        <el-form-item label="手续费" prop="poundage">
          <el-input v-model="form.poundage" placeholder="请输入手续费" />
        </el-form-item>
        <el-form-item label="代理费率" prop="agentRate">
          <el-input v-model="form.agentRate" placeholder="请输入代理费率" />
        </el-form-item>
        <el-form-item label="渠道费率" prop="channelRate">
          <el-input v-model="form.channelRate" placeholder="请输入渠道费率" />
        </el-form-item>
        <el-form-item label="渠道支付链接" prop="channelPayUrl">
          <el-input v-model="form.channelPayUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="渠道支付错误码" prop="channelErrCode">
          <el-input v-model="form.channelErrCode" placeholder="请输入渠道支付错误码" />
        </el-form-item>
        <el-form-item label="渠道支付错误描述" prop="channelErrMsg">
          <el-input v-model="form.channelErrMsg" placeholder="请输入渠道支付错误描述" />
        </el-form-item>
        <el-form-item label="收银台链接" prop="payUrl">
          <el-input v-model="form.payUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="货币代码" prop="currency">
          <el-input v-model="form.currency" placeholder="请输入货币代码" />
        </el-form-item>
        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="form.exchangeRate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="原币金额" prop="originMoney">
          <el-input v-model="form.originMoney" placeholder="请输入原币金额" />
        </el-form-item>
        <el-form-item label="订单失效时间" prop="expiredTime">
          <el-date-picker clearable
            v-model="form.expiredTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择订单失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单支付成功时间" prop="successTime">
          <el-date-picker clearable
            v-model="form.successTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择订单支付成功时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通知状态" prop="notifyStatus">
          <el-select v-model="form.notifyStatus" placeholder="请选择通知状态">
            <el-option
              v-for="dict in dict.type.order_notify_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知URL" prop="notifyUrl">
          <el-input v-model="form.notifyUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="跳转链接" prop="returnUrl">
          <el-input v-model="form.returnUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否为补单" prop="supplementYn">
          <el-input v-model="form.supplementYn" placeholder="请输入是否为补单" />
        </el-form-item>
        <el-form-item label="补单时间" prop="supplementTime">
          <el-date-picker clearable
            v-model="form.supplementTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补单时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="补单流水号" prop="supplementRefNo">
          <el-input v-model="form.supplementRefNo" placeholder="请输入补单流水号" />
        </el-form-item>
        <el-form-item label="补单原因" prop="supplementReason">
          <el-input v-model="form.supplementReason" placeholder="请输入补单原因" />
        </el-form-item>
        <el-form-item label="补单人员" prop="supplementUser">
          <el-input v-model="form.supplementUser" placeholder="请输入补单人员" />
        </el-form-item>
        <el-form-item label="退款状态:" prop="refundStatus">
          <el-input v-model="form.refundStatus" placeholder="请输入退款状态:" />
        </el-form-item>
        <el-form-item label="退款次数" prop="refundTimes">
          <el-input v-model="form.refundTimes" placeholder="请输入退款次数" />
        </el-form-item>
        <el-form-item label="退款总金额" prop="refundAmount">
          <el-input v-model="form.refundAmount" placeholder="请输入退款总金额" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
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
import { listPayorder, getPayorder, delPayorder, addPayorder, updatePayorder } from "@/api/paying/payorder";

export default {
  name: "Payorder",
  dicts: ['order_notify_status'],
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
        mOrderCode: null,
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
        bankId: null,
        bankName: null,
        bankCode: null,
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
        poundage: null,
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
      // 表单校验
      rules: {
        agentId: [
          { required: true, message: "代理商ID不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商户编号不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户名称不能为空", trigger: "blur" }
        ],
        orderCode: [
          { required: true, message: "系统订单号不能为空", trigger: "blur" }
        ],
        mOrderCode: [
          { required: true, message: "商户订单号不能为空", trigger: "blur" }
        ],
        channelOrderCode: [
          { required: true, message: "渠道订单号不能为空", trigger: "blur" }
        ],
        expiryTime: [
          { required: true, message: "过期时间不能为空", trigger: "blur" }
        ],
        payTime: [
          { required: true, message: "支付时间不能为空", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "渠道ID不能为空", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        channelName: [
          { required: true, message: "渠道名称不能为空", trigger: "blur" }
        ],
        productCode: [
          { required: true, message: "产品编号不能为空", trigger: "blur" }
        ],
        productNameInner: [
          { required: true, message: "内部产品名称不能为空", trigger: "blur" }
        ],
        wayCode: [
          { required: true, message: "支付方式编码不能为空", trigger: "blur" }
        ],
        wayName: [
          { required: true, message: "支付方式不能为空", trigger: "blur" }
        ],
        subject: [
          { required: true, message: "商品标题不能为空", trigger: "blur" }
        ],
        body: [
          { required: true, message: "商品描述信息不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "订单状态(0-订单生成, 1-支付中, 2-支付成功, 3-支付失败, 4-已撤销, 5-已退款, 6-订单关闭)不能为空", trigger: "blur" }
        ],
        totalMoney: [
          { required: true, message: "订单金额不能为空", trigger: "blur" }
        ],
        realMoney: [
          { required: true, message: "实际金额不能为空", trigger: "blur" }
        ],
        enteredMoney: [
          { required: true, message: "入账金额不能为空", trigger: "blur" }
        ],
        single: [
          { required: true, message: "单笔手续费不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "商户费率不能为空", trigger: "blur" }
        ],
        poundage: [
          { required: true, message: "手续费不能为空", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "货币代码(CNY=人民币元,INR=印度卢比,PHP=菲律宾比索,UST=波场币(USDT),TRX=波场币(TRX),VND=越南盾,USD=美元)不能为空", trigger: "blur" }
        ],
        exchangeRate: [
          { required: true, message: "汇率不能为空", trigger: "blur" }
        ],
        originMoney: [
          { required: true, message: "原币金额不能为空", trigger: "blur" }
        ],
        refundStatus: [
          { required: true, message: "退款状态:(0-未发生实际退款, 1-部分退款, 2-全额退款)不能为空", trigger: "blur" }
        ],
        refundTimes: [
          { required: true, message: "退款次数不能为空", trigger: "blur" }
        ],
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
    /** 查询商户支付订单列表 */
    getList() {
      this.loading = true;
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
        mOrderCode: null,
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
        bankId: null,
        bankName: null,
        bankCode: null,
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
        poundage: null,
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
    }
  }
};
</script>
