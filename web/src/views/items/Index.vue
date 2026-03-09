<template>
  <div class="page-items">
    <Card>
      <div slot="title">
        <Icon type="ios-cube-outline" />
        道具管理
      </div>
      <div slot="extra">
        <Button type="primary" @click="openAdd">新增道具</Button>
        <Button @click="onBatchUpload">批量上传</Button>
      </div>
      <div class="filter-bar">
        <Input v-model="filterKeyword" placeholder="搜索道具名称…" style="width:180px" clearable />
        <Button type="primary" @click="loadList">查询</Button>
        <Button @click="onReset">重置</Button>
      </div>
      <Table :columns="columns" :data="list" :loading="loading" border>
        <template slot-scope="{ row }" slot="action">
          <Button type="text" size="small" @click="onEdit(row)">修改</Button>
          <Button type="text" size="small" @click="onDelete(row)">删除</Button>
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
  name: 'ItemsIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      filterKeyword: '',
      columns: [
        { title: '道具名称', key: 'name', minWidth: 160 },
        { title: '单价（元）', key: 'price', width: 100 },
        { title: '操作', slot: 'action', width: 140, fixed: 'right' }
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
          { id: 1, name: '金币', price: '0.01' },
          { id: 2, name: '钻石', price: '0.10' },
          { id: 3, name: '经验药水·大', price: '2.00' },
          { id: 4, name: '传说装备箱', price: '88.00' }
        ]
        this.total = 4
        this.loading = false
      }, 300)
    },
    onReset() {
      this.filterKeyword = ''
      this.loadList()
    },
    onPageChange(p) {
      this.page = p
      this.loadList()
    },
    openAdd() {
      this.$Message.info('新增道具（待实现）')
    },
    onBatchUpload() {
      this.$Message.info('请选择 Excel 文件批量上传')
    },
    onEdit(row) {
      this.$Message.info('修改道具：' + row.name)
    },
    onDelete(row) {
      this.$Modal.confirm({
        title: '确认删除',
        content: `确认删除道具「${row.name}」？`,
        onOk: () => {
          this.$Message.success('已删除')
          this.loadList()
        }
      })
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
