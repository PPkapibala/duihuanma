<template>
  <div class="page-reusable">
    <Card>
      <div slot="title">
        <Icon type="ios-pricetags-outline" />
        复用兑换码活动列表
      </div>
      <div slot="extra">
        <Button type="primary" @click="openCreate">新增活动</Button>
      </div>
      <div class="filter-bar">
        <Input v-model="filterKeyword" placeholder="搜索活动名称…" style="width:180px" clearable />
        <Select v-model="filterStatus" placeholder="全部审批状态" style="width:120px" clearable>
          <Option value="pending">待审核</Option>
          <Option value="approved">已同意</Option>
          <Option value="rejected">已拒绝</Option>
        </Select>
        <Button type="primary" @click="loadList">查询</Button>
        <Button @click="onReset">重置</Button>
      </div>
      <Table :columns="columns" :data="list" :loading="loading" border>
        <template slot-scope="{ row }" slot="action">
          <Button type="text" size="small" @click="onViewLog(row)">查看日志</Button>
          <Button type="text" size="small" @click="onEdit(row)">修改</Button>
          <Button type="text" size="small" @click="onCopy(row)">复制</Button>
        </template>
      </Table>
      <div class="table-footer">
        <Page :total="total" :current="page" :page-size="10" show-total @on-change="onPageChange" />
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'ReusableIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      filterKeyword: '',
      filterStatus: '',
      columns: [
        { title: '活动 ID', key: 'id', width: 120 },
        { title: '活动标题', key: 'title', minWidth: 160 },
        { title: '所属游戏', key: 'game', width: 100 },
        { title: '用途', key: 'purpose', width: 120 },
        { title: '单码价值', key: 'unitValue', width: 100 },
        { title: '已兑换/可兑换次数', key: 'usage', width: 140 },
        { title: '有效期', key: 'validPeriod', width: 180 },
        { title: '活动状态', key: 'status', width: 90 },
        { title: '审批状态', key: 'approvalStatus', width: 90 },
        { title: '创建人', key: 'creator', width: 100 },
        { title: '操作', slot: 'action', width: 200, fixed: 'right' }
      ]
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    loadList() {
      this.loading = true
      setTimeout(() => {
        this.list = [
          { id: 'R-001', title: '春节直播专属', game: '幻境大陆', purpose: '售卖', unitValue: '约 ¥50', usage: '6,823/10,000', validPeriod: '2026-02-01 ~ 2026-02-28', status: '进行中', approvalStatus: '已同意', creator: 'Jay.zhu' }
        ]
        this.total = 1
        this.loading = false
      }, 300)
    },
    onReset() {
      this.filterKeyword = this.filterStatus = ''
      this.loadList()
    },
    onPageChange(p) {
      this.page = p
      this.loadList()
    },
    openCreate() {
      this.$Message.info('新增复用兑换码（待实现）')
    },
    onViewLog(row) {
      this.$Message.info('查看日志：' + row.id)
    },
    onEdit(row) {
      this.$Message.info('修改：' + row.id)
    },
    onCopy(row) {
      this.$Message.info('复制：' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.table-footer {
  margin-top: 16px;
  text-align: right;
}
</style>
