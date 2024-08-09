<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="代付订单号" prop="orderCode" >
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入代付订单号"
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
      <el-form-item label="商户ID" prop="merchantId" >
        <el-input
          v-model="queryParams.merchantId"
          placeholder="请输入商户ID"
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
      <el-form-item label="钱包ID" prop="walletId"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.walletId"
          placeholder="请输入钱包ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提交方式" prop="submitType"  v-if="moreSearch" >
        <el-select v-model="queryParams.submitType" placeholder="请选择提交方式" clearable>
          <el-option
            v-for="dict in dict.type.payout_submit_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入账金额" prop="enteredMoney"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.enteredMoney"
          placeholder="请输入入账金额"
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
      <el-form-item label="银行名称" prop="sourceBankName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.sourceBankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款账号" prop="sourceaccountNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.sourceaccountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="targetBankName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetBankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款账号" prop="targetaccountNo"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetaccountNo"
          placeholder="请输入收款账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支行" prop="targetBankSonName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetBankSonName"
          placeholder="请输入支行"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户人" prop="targetAccountName"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetAccountName"
          placeholder="请输入开户人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户人身份证" prop="targetIdCard"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetIdCard"
          placeholder="请输入开户人身份证"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="targetMobile"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.targetMobile"
          placeholder="请输入手机号"
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
      <el-form-item label="费率" prop="rate"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入费率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手续费" prop="fee"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入手续费"
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
      <el-form-item label="代付类型" prop="payoutType"  v-if="moreSearch" >
        <el-select v-model="queryParams.payoutType" placeholder="请选择代付类型" clearable>
          <el-option
            v-for="dict in dict.type.payout_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代付人员" prop="payoutUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.payoutUser"
          placeholder="请输入代付人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核方式" prop="auditStatus"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.auditStatus"
          placeholder="请输入审核方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人员" prop="auditUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审核人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="锁定状态" prop="lockedYn"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.lockedYn"
          placeholder="请输入锁定状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="锁定人员" prop="lockedUser"  v-if="moreSearch" >
        <el-input
          v-model="queryParams.lockedUser"
          placeholder="请输入锁定人员"
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
          v-hasPermi="['payout:payoutorder:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['payout:payoutorder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['payout:payoutorder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['payout:payoutorder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
      :data="payoutorderList"
      @selection-change="handleSelectionChange"
      border
      stripe
      resizable
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="代付订单号" align="center" prop="orderCode" min-width="130" sortable show-overflow-tooltip/>
      <el-table-column label="商户订单号" align="center" prop="mchOrderCode" show-overflow-tooltip />
      <el-table-column label="代理商" align="center" prop="agentName" show-overflow-tooltip />
      <el-table-column label="商户编号" align="center" prop="merchantNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="商户名称" align="center" prop="merchantName" min-width="120"  show-overflow-tooltip />
     <el-table-column label="订单金额" align="right" prop="totalMoney" min-width="110" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.totalMoney) }}</span>
       </template>
     </el-table-column>
     <el-table-column label="实际金额" align="right" prop="realMoney" min-width="110" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.realMoney) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="钱包ID" align="center" prop="walletId" show-overflow-tooltip />
      <el-table-column label="提交方式" align="center" prop="submitType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.payout_submit_type" :value="scope.row.submitType"/>
        </template>
      </el-table-column>
     <el-table-column label="入账金额" align="right" prop="enteredMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.enteredMoney) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="货币代码" align="center" prop="currency" show-overflow-tooltip />
      <el-table-column label="汇率" align="center" prop="exchangeRate" show-overflow-tooltip />
     <el-table-column label="原币金额" align="right" prop="originMoney" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.originMoney) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="银行名称" align="center" prop="sourceBankName" show-overflow-tooltip />
      <el-table-column label="收款账号" align="center" prop="sourceaccountNo" show-overflow-tooltip />
      <el-table-column label="银行名称" align="center" prop="targetBankName" show-overflow-tooltip />
      <el-table-column label="收款账号" align="center" prop="targetaccountNo" show-overflow-tooltip />
      <el-table-column label="支行" align="center" prop="targetBankSonName" show-overflow-tooltip />
      <el-table-column label="开户人" align="center" prop="targetAccountName" show-overflow-tooltip />
      <el-table-column label="开户人身份证" align="center" prop="targetIdCard" show-overflow-tooltip />
      <el-table-column label="手机号" align="center" prop="targetMobile" show-overflow-tooltip />
      <el-table-column label="单笔手续费" align="center" min-width="120" prop="single" show-overflow-tooltip />
     <el-table-column label="费率" align="right" prop="rate" min-width="100" sortable show-overflow-tooltip >
       <template v-slot="scope">
         <span class="text-money">{{ parseMoney(scope.row.rate) }}</span>
       </template>
     </el-table-column>
      <el-table-column label="手续费" align="center" prop="fee" show-overflow-tooltip />
      <el-table-column label="特定渠道发起额外参数" align="center" prop="channelExtra" show-overflow-tooltip />
      <el-table-column label="渠道用户标识,如微信openId,支付宝账号" align="center" prop="channelUser" show-overflow-tooltip />
      <el-table-column label="渠道订单号" align="center" prop="channelOrderCode" show-overflow-tooltip />
      <el-table-column label="代付类型" align="center" prop="payoutType">
        <template v-slot="scope">
          <dict-tag :options="dict.type.payout_type" :value="scope.row.payoutType"/>
        </template>
      </el-table-column>
      <el-table-column label="代付人员" align="center" prop="payoutUser" show-overflow-tooltip />
      <el-table-column label="审核方式" align="center" prop="auditStatus" show-overflow-tooltip />
      <el-table-column label="审核人员" align="center" prop="auditUser" show-overflow-tooltip />
      <el-table-column label="锁定状态" align="center" prop="lockedYn" show-overflow-tooltip />
      <el-table-column label="锁定时间" align="center" prop="lockedTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.lockedTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="锁定人员" align="center" prop="lockedUser" show-overflow-tooltip />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="失效时间" align="center" prop="expiredTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.expiredTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成功时间" align="center" prop="successTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.successTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道ID" align="center" prop="channelId" show-overflow-tooltip />
      <el-table-column label="产品ID" align="center" prop="productId" show-overflow-tooltip />
      <el-table-column label="通知状态" align="center" prop="notifyStatus">
        <template v-slot="scope">
          <dict-tag :options="dict.type.order_notify_status" :value="scope.row.notifyStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="通知URL" align="center" prop="notifyUrl" show-overflow-tooltip />
      <el-table-column label="是否为补单" align="center" prop="supplementYn" show-overflow-tooltip />
      <el-table-column label="补单时间" align="center" prop="supplementTime" min-width="110" sortable show-overflow-tooltip >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.supplementTime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补单流水号" align="center" prop="supplementRefNo" min-width="100" sortable show-overflow-tooltip/>
      <el-table-column label="补单原因" align="center" prop="supplementReason" show-overflow-tooltip />
      <el-table-column label="补单人员" align="center" prop="supplementUser" show-overflow-tooltip />
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
            v-hasPermi="['payout:payoutorder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['payout:payoutorder:remove']"
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

    <!-- 添加或修改代付订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代付订单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入代付订单号" />
        </el-form-item>
        <el-form-item label="商户订单号" prop="mchOrderCode">
          <el-input v-model="form.mchOrderCode" placeholder="请输入商户订单号" />
        </el-form-item>
        <el-form-item label="商户ID" prop="merchantId">
          <el-input v-model="form.merchantId" placeholder="请输入商户ID" />
        </el-form-item>
        <el-form-item label="代理商ID" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入代理商ID" />
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
        <el-form-item label="订单金额" prop="totalMoney">
          <el-input v-model="form.totalMoney" placeholder="请输入订单金额" />
        </el-form-item>
        <el-form-item label="实际金额" prop="realMoney">
          <el-input v-model="form.realMoney" placeholder="请输入实际金额" />
        </el-form-item>
        <el-form-item label="钱包ID" prop="walletId">
          <el-input v-model="form.walletId" placeholder="请输入钱包ID" />
        </el-form-item>
        <el-form-item label="提交方式" prop="submitType">
          <el-select v-model="form.submitType" placeholder="请选择提交方式">
            <el-option
              v-for="dict in dict.type.payout_submit_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入账金额" prop="enteredMoney">
          <el-input v-model="form.enteredMoney" placeholder="请输入入账金额" />
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
        <el-form-item label="银行名称" prop="sourceBankName">
          <el-input v-model="form.sourceBankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="收款账号" prop="sourceaccountNo">
          <el-input v-model="form.sourceaccountNo" placeholder="请输入收款账号" />
        </el-form-item>
        <el-form-item label="银行名称" prop="targetBankName">
          <el-input v-model="form.targetBankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="收款账号" prop="targetaccountNo">
          <el-input v-model="form.targetaccountNo" placeholder="请输入收款账号" />
        </el-form-item>
        <el-form-item label="支行" prop="targetBankSonName">
          <el-input v-model="form.targetBankSonName" placeholder="请输入支行" />
        </el-form-item>
        <el-form-item label="开户人" prop="targetAccountName">
          <el-input v-model="form.targetAccountName" placeholder="请输入开户人" />
        </el-form-item>
        <el-form-item label="开户人身份证" prop="targetIdCard">
          <el-input v-model="form.targetIdCard" placeholder="请输入开户人身份证" />
        </el-form-item>
        <el-form-item label="手机号" prop="targetMobile">
          <el-input v-model="form.targetMobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="单笔手续费" prop="single">
          <el-input v-model="form.single" placeholder="请输入单笔手续费" />
        </el-form-item>
        <el-form-item label="费率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入费率" />
        </el-form-item>
        <el-form-item label="手续费" prop="fee">
          <el-input v-model="form.fee" placeholder="请输入手续费" />
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
        <el-form-item label="代付类型" prop="payoutType">
          <el-select v-model="form.payoutType" placeholder="请选择代付类型">
            <el-option
              v-for="dict in dict.type.payout_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代付人员" prop="payoutUser">
          <el-input v-model="form.payoutUser" placeholder="请输入代付人员" />
        </el-form-item>
        <el-form-item label="审核方式" prop="auditStatus">
          <el-input v-model="form.auditStatus" placeholder="请输入审核方式" />
        </el-form-item>
        <el-form-item label="审核人员" prop="auditUser">
          <el-input v-model="form.auditUser" placeholder="请输入审核人员" />
        </el-form-item>
        <el-form-item label="锁定状态" prop="lockedYn">
          <el-input v-model="form.lockedYn" placeholder="请输入锁定状态" />
        </el-form-item>
        <el-form-item label="锁定时间" prop="lockedTime">
          <el-date-picker clearable
            v-model="form.lockedTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择锁定时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="锁定人员" prop="lockedUser">
          <el-input v-model="form.lockedUser" placeholder="请输入锁定人员" />
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
        <el-form-item label="失效时间" prop="expiredTime">
          <el-date-picker clearable
            v-model="form.expiredTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成功时间" prop="successTime">
          <el-date-picker clearable
            v-model="form.successTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择成功时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道ID" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入渠道ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="productId">
          <el-input v-model="form.productId" placeholder="请输入产品ID" />
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
import { listPayoutorder, getPayoutorder, delPayoutorder, addPayoutorder, updatePayoutorder } from "@/api/payout/payoutorder";

export default {
  name: "Payoutorder",
  dicts: ['payout_type', 'payout_submit_type', 'sys_normal_disable', 'order_notify_status'],
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
      // 代付订单表格数据
      payoutorderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderCode: null,
        mchOrderCode: null,
        merchantId: null,
        agentId: null,
        agentName: null,
        merchantNo: null,
        merchantName: null,
        totalMoney: null,
        realMoney: null,
        walletId: null,
        submitType: null,
        enteredMoney: null,
        currency: null,
        exchangeRate: null,
        originMoney: null,
        sourceBankName: null,
        sourceaccountNo: null,
        targetBankName: null,
        targetaccountNo: null,
        targetBankSonName: null,
        targetAccountName: null,
        targetIdCard: null,
        targetMobile: null,
        single: null,
        rate: null,
        fee: null,
        channelExtra: null,
        channelUser: null,
        channelOrderCode: null,
        payoutType: null,
        payoutUser: null,
        auditStatus: null,
        auditUser: null,
        lockedYn: null,
        lockedTime: null,
        lockedUser: null,
        status: null,
        expiredTime: null,
        successTime: null,
        channelId: null,
        productId: null,
        notifyStatus: null,
        notifyUrl: null,
        supplementYn: null,
        supplementTime: null,
        supplementRefNo: null,
        supplementReason: null,
        supplementUser: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderCode: [
          { required: true, message: "代付订单号不能为空", trigger: "blur" }
        ],
        mchOrderCode: [
          { required: true, message: "商户订单号不能为空", trigger: "blur" }
        ],
        merchantId: [
          { required: true, message: "商户ID不能为空", trigger: "blur" }
        ],
        agentId: [
          { required: true, message: "代理商ID不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商户编号不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商户名称不能为空", trigger: "blur" }
        ],
        totalMoney: [
          { required: true, message: "订单金额不能为空", trigger: "blur" }
        ],
        realMoney: [
          { required: true, message: "实际金额不能为空", trigger: "blur" }
        ],
        walletId: [
          { required: true, message: "钱包ID不能为空", trigger: "blur" }
        ],
        submitType: [
          { required: true, message: "提交方式不能为空", trigger: "change" }
        ],
        enteredMoney: [
          { required: true, message: "入账金额不能为空", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "货币代码不能为空", trigger: "blur" }
        ],
        exchangeRate: [
          { required: true, message: "汇率不能为空", trigger: "blur" }
        ],
        originMoney: [
          { required: true, message: "原币金额不能为空", trigger: "blur" }
        ],
        sourceBankName: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        sourceaccountNo: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        targetBankName: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        targetaccountNo: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        targetBankSonName: [
          { required: true, message: "支行不能为空", trigger: "blur" }
        ],
        targetAccountName: [
          { required: true, message: "开户人不能为空", trigger: "blur" }
        ],
        targetIdCard: [
          { required: true, message: "开户人身份证不能为空", trigger: "blur" }
        ],
        targetMobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        single: [
          { required: true, message: "单笔手续费不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "费率不能为空", trigger: "blur" }
        ],
        fee: [
          { required: true, message: "手续费不能为空", trigger: "blur" }
        ],
        channelOrderCode: [
          { required: true, message: "渠道订单号不能为空", trigger: "blur" }
        ],
        payoutType: [
          { required: true, message: "代付类型不能为空", trigger: "change" }
        ],
        auditStatus: [
          { required: true, message: "审核方式不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "渠道ID不能为空", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询代付订单列表 */
    getList() {
      this.loading = true;
      listPayoutorder(this.queryParams).then(response => {
        this.payoutorderList = response.rows;
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
        orderCode: null,
        mchOrderCode: null,
        merchantId: null,
        agentId: null,
        agentName: null,
        merchantNo: null,
        merchantName: null,
        totalMoney: null,
        realMoney: null,
        walletId: null,
        submitType: null,
        enteredMoney: null,
        currency: null,
        exchangeRate: null,
        originMoney: null,
        sourceBankName: null,
        sourceaccountNo: null,
        targetBankName: null,
        targetaccountNo: null,
        targetBankSonName: null,
        targetAccountName: null,
        targetIdCard: null,
        targetMobile: null,
        single: null,
        rate: null,
        fee: null,
        channelExtra: null,
        channelUser: null,
        channelOrderCode: null,
        payoutType: null,
        payoutUser: null,
        auditStatus: null,
        auditUser: null,
        lockedYn: null,
        lockedTime: null,
        lockedUser: null,
        status: "0",
        expiredTime: null,
        successTime: null,
        channelId: null,
        productId: null,
        notifyStatus: null,
        notifyUrl: null,
        supplementYn: null,
        supplementTime: null,
        supplementRefNo: null,
        supplementReason: null,
        supplementUser: null,
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
      this.title = "添加代付订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getPayoutorder(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代付订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderId != null) {
            updatePayoutorder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayoutorder(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除代付订单编号为"' + orderIds + '"的数据项？').then(function() {
        return delPayoutorder(orderIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('payout/payoutorder/export', {
        ...this.queryParams
      }, `payoutorder_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
