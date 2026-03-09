<template>
  <div class="page-codes">
    <Tabs v-model="activeTab" @on-click="onTabClick">
      <TabPane label="活动列表" name="list">
        <Card>
          <div slot="title">
            <Icon type="ios-pricetag-outline" />
            单人兑换码活动列表
          </div>
          <div slot="extra">
            <Badge :count="batchSelectCount" :overflow-count="99">
              <Button type="default" :disabled="batchSelectCount === 0" @click="openBatchGenerate">批量生成审批</Button>
            </Badge>
            <Button type="primary" @click="openCreate">新增活动</Button>
          </div>
          <div class="filter-bar">
            <Input v-model="filterKeyword" placeholder="搜索活动名称…" style="width:180px" clearable />
            <Select v-model="filterCreator" placeholder="全部创建人" style="width:120px" clearable>
              <Option value="me">我创建的</Option>
              <Option value="u1">Jay.zhu</Option>
              <Option value="u2">Gali.hao</Option>
            </Select>
            <Select v-model="filterStatus" placeholder="全部活动状态" style="width:120px" clearable>
              <Option value="pending">待开始</Option>
              <Option value="running">进行中</Option>
              <Option value="ended">已结束</Option>
            </Select>
            <Select v-model="filterPurpose" placeholder="全部用途" style="width:120px" clearable>
              <Option value="free">免费活动</Option>
              <Option value="creator">创作者激励</Option>
              <Option value="sale">售卖</Option>
            </Select>
            <Button type="primary" @click="onSearch">查询</Button>
            <Button @click="onReset">重置</Button>
            <div class="filter-extra">
              <Button size="small" @click="onBatchUploadDisable">批量上传禁用</Button>
              <Button size="small" @click="onBatchUploadEnable">批量上传解禁</Button>
            </div>
          </div>
          <Table :columns="columns" :data="list" :loading="loading" border>
            <template slot-scope="{ row }" slot="action">
              <Button type="text" size="small" @click="onViewCodes(row)">查看码值</Button>
              <Button type="text" size="small" @click="onEdit(row)">修改</Button>
              <Button type="text" size="small" @click="onCopy(row)">复制</Button>
            </template>
          </Table>
          <div class="table-footer">
            <Page
              :total="total"
              :current="page"
              :page-size="pageSize"
              show-total
              show-elevator
              @on-change="onPageChange"
            />
          </div>
        </Card>
      </TabPane>
      <TabPane label="审批记录" name="approval">
        <Card>
          <div slot="title">
            <Icon type="ios-clipboard-outline" />
            审批记录
          </div>
          <div class="filter-bar">
            <Input v-model="approvalFilterName" placeholder="申请单名称…" style="width:180px" clearable />
            <Select v-model="approvalFilterStatus" placeholder="全部审批状态" style="width:120px" clearable>
              <Option value="pending">审批中</Option>
              <Option value="approved">已通过</Option>
              <Option value="rejected">已驳回</Option>
            </Select>
            <Button type="primary" @click="loadApprovalList">查询</Button>
            <Button @click="resetApprovalFilter">重置</Button>
          </div>
          <Table :columns="approvalColumns" :data="approvalList" :loading="approvalLoading" border>
            <template slot-scope="{ row }" slot="name">
              <a href="javascript:;" class="link-feishu" @click="goFeishu(row)">{{ row.name }}</a>
            </template>
            <template slot-scope="{ row }" slot="action">
              <Button type="text" size="small" @click="onViewApprovalDetail(row)">查看详情</Button>
            </template>
          </Table>
          <div class="table-footer">
            <Page
              :total="approvalTotal"
              :current="approvalPage"
              :page-size="10"
              show-total
              @on-change="onApprovalPageChange"
            />
          </div>
        </Card>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'CodesIndex',
  data() {
    return {
      activeTab: 'list',
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      batchSelectCount: 0,
      filterKeyword: '',
      filterCreator: '',
      filterStatus: '',
      filterPurpose: '',
      columns: [
        { type: 'selection', width: 48 },
        { title: '活动 ID', key: 'id', width: 120 },
        { title: '活动标题', key: 'title', minWidth: 160 },
        { title: '用途', key: 'purpose', width: 140 },
        { title: '单码价值', key: 'unitValue', width: 100, render: (h, { row }) => h('span', row.unitValue ? `¥${row.unitValue}` : '—') },
        { title: '已生成/审批中', key: 'generated', width: 120 },
        { title: '有效期', key: 'validPeriod', width: 180 },
        { title: '活动状态', key: 'status', width: 90 },
        { title: '创建人', key: 'creator', width: 100 },
        { title: '操作', slot: 'action', width: 180, fixed: 'right' }
      ],
      approvalLoading: false,
      approvalList: [],
      approvalTotal: 0,
      approvalPage: 1,
      approvalFilterName: '',
      approvalFilterStatus: '',
      approvalColumns: [
        { title: '申请单名称', slot: 'name', minWidth: 200 },
        { title: '申请时间', key: 'applyTime', width: 160 },
        { title: '申请人', key: 'applicant', width: 100 },
        { title: '关联活动数量', key: 'activityCount', width: 120 },
        { title: '审批状态', key: 'approvalStatus', width: 100 },
        { title: '操作', slot: 'action', width: 100 }
      ]
    }
  },
  created() {
    this.loadList()
    this.loadApprovalList()
  },
  methods: {
    onTabClick(name) {},
    loadList() {
      this.loading = true
      setTimeout(() => {
        this.list = [
          { id: 'ACT-2026-001', title: '3月登录礼包', purpose: '免费活动·营销活动', unitValue: 20, generated: '5,000/0', validPeriod: '2026-03-01 ~ 2026-03-31', status: '进行中', creator: 'Jay.zhu' }
        ]
        this.total = 1
        this.loading = false
      }, 300)
    },
    loadApprovalList() {
      this.approvalLoading = true
      setTimeout(() => {
        this.approvalList = [
          { id: 'APL-001', name: '2026-03-05 批量生成 · 5个活动', applyTime: '2026-03-05 14:30', applicant: 'Jay.zhu', activityCount: 5, approvalStatus: '审批中', feishuUrl: '#' }
        ]
        this.approvalTotal = 1
        this.approvalLoading = false
      }, 300)
    },
    onSearch() {
      this.page = 1
      this.loadList()
    },
    onReset() {
      this.filterKeyword = this.filterCreator = this.filterStatus = this.filterPurpose = ''
      this.onSearch()
    },
    onPageChange(p) {
      this.page = p
      this.loadList()
    },
    onBatchUploadDisable() {
      this.$Message.info('请选择 Excel 文件（批量上传禁用）')
    },
    onBatchUploadEnable() {
      this.$Message.info('请选择 Excel 文件（批量上传解禁）')
    },
    openCreate() {
      this.$Message.info('打开新增活动弹窗（待实现）')
    },
    openBatchGenerate() {
      this.$Message.info('打开批量生成审批弹窗（待实现）')
    },
    onViewCodes(row) {
      this.$Message.info('查看码值：' + row.id)
    },
    onEdit(row) {
      this.$Message.info('修改活动：' + row.id)
    },
    onCopy(row) {
      this.$Message.info('复制活动：' + row.id)
    },
    resetApprovalFilter() {
      this.approvalFilterName = this.approvalFilterStatus = ''
      this.loadApprovalList()
    },
    onApprovalPageChange(p) {
      this.approvalPage = p
      this.loadApprovalList()
    },
    goFeishu(row) {
      this.$Message.info('即将跳转至飞书审批')
      if (row.feishuUrl && row.feishuUrl !== '#') window.open(row.feishuUrl)
    },
    onViewApprovalDetail(row) {
      this.$Message.info('查看审批详情：' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-codes {
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    .filter-extra {
      margin-left: auto;
      display: flex;
      gap: 8px;
    }
  }
  .table-footer {
    margin-top: 16px;
    text-align: right;
  }
  .link-feishu {
    color: #2d8cf0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
