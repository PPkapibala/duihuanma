<template>
  <div class="page-query">
    <Tabs v-model="activeTab">
      <TabPane label="单人兑换码查询" name="single">
        <Card>
          <div slot="title">
            <Icon type="ios-search" />
            单人兑换码查询
          </div>
          <Form :model="singleForm" label-position="top">
            <Row :gutter="16">
              <Col span="6">
                <FormItem label="兑换码">
                  <Input v-model="singleForm.code" placeholder="请输入码值" clearable />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="角色 ID">
                  <Input v-model="singleForm.roleId" placeholder="请输入角色 ID" clearable />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="角色名称">
                  <Input v-model="singleForm.roleName" placeholder="请输入角色名称" clearable />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label=" ">
                  <Button type="primary" @click="onSingleQuery">查询</Button>
                  <Button @click="resetSingleForm">重置</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div v-if="singleResult" class="result-box">
            <Divider orientation="left">查询结果</Divider>
            <Descriptions bordered :column="2" size="small">
              <DescriptionsItem label="兑换码">{{ singleResult.code }}</DescriptionsItem>
              <DescriptionsItem label="使用状态">
                <Tag color="success">已激活</Tag>
              </DescriptionsItem>
              <DescriptionsItem label="激活角色">{{ singleResult.roleName }}（ID: {{ singleResult.roleId }}）</DescriptionsItem>
              <DescriptionsItem label="激活时间">{{ singleResult.activateTime }}</DescriptionsItem>
            </Descriptions>
            <div class="op-row">
              <Button type="text" size="small" @click="onDisable(singleResult)" v-if="isOps">禁用</Button>
              <Button type="text" size="small" @click="onViewDetail(singleResult)">查看详情</Button>
            </div>
          </div>
          <div v-else-if="singleQueried && !singleResult" class="empty-tip">
            未找到匹配的兑换码记录
          </div>
        </Card>
      </TabPane>
      <TabPane label="复用兑换码查询" name="reusable">
        <Card>
          <div slot="title">
            <Icon type="ios-pricetags-outline" />
            复用兑换码查询
          </div>
          <Form :model="reusableForm" label-position="top">
            <FormItem label="兑换码口令">
              <Input v-model="reusableForm.password" placeholder="请输入口令精确查询" style="width:300px" clearable />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="onReusableQuery">查询</Button>
              <Button @click="resetReusableForm">重置</Button>
            </FormItem>
          </Form>
          <div v-if="reusableResult" class="result-box">
            <Divider orientation="left">活动信息</Divider>
            <Descriptions bordered :column="2" size="small">
              <DescriptionsItem label="活动标题">{{ reusableResult.title }}</DescriptionsItem>
              <DescriptionsItem label="兑换码口令">{{ reusableResult.password }}</DescriptionsItem>
              <DescriptionsItem label="已兑换/可兑换次数">{{ reusableResult.usage }}</DescriptionsItem>
              <DescriptionsItem label="审批状态">{{ reusableResult.approvalStatus }}</DescriptionsItem>
            </Descriptions>
            <Button type="text" size="small" @click="onViewReusableLog(reusableResult)">查看日志</Button>
          </div>
          <div v-else-if="reusableQueried && !reusableResult" class="empty-tip">
            未找到匹配的口令
          </div>
        </Card>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'QueryIndex',
  data() {
    return {
      activeTab: 'single',
      singleForm: { code: '', roleId: '', roleName: '' },
      singleResult: null,
      singleQueried: false,
      reusableForm: { password: '' },
      reusableResult: null,
      reusableQueried: false,
      isOps: true
    }
  },
  methods: {
    onSingleQuery() {
      this.singleQueried = true
      if (this.singleForm.code || this.singleForm.roleId || this.singleForm.roleName) {
        this.singleResult = {
          code: 'XFJM2A8K',
          roleId: '10234567',
          roleName: '剑客无情',
          activateTime: '2026-02-15 14:23:06'
        }
      } else {
        this.singleResult = null
      }
    },
    resetSingleForm() {
      this.singleForm = { code: '', roleId: '', roleName: '' }
      this.singleResult = null
      this.singleQueried = false
    },
    onReusableQuery() {
      this.reusableQueried = true
      if (this.reusableForm.password) {
        this.reusableResult = {
          title: '春节直播专属',
          password: 'SPRING2026',
          usage: '6,823/10,000',
          approvalStatus: '已同意'
        }
      } else {
        this.reusableResult = null
      }
    },
    resetReusableForm() {
      this.reusableForm = { password: '' }
      this.reusableResult = null
      this.reusableQueried = false
    },
    onDisable(row) {
      this.$Message.warning('已禁用码值 ' + row.code)
    },
    onViewDetail(row) {
      this.$Message.info('查看详情：' + row.code)
    },
    onViewReusableLog(row) {
      this.$Message.info('查看日志：' + row.password)
    }
  }
}
</script>

<style lang="scss" scoped>
.result-box {
  margin-top: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  .op-row {
    margin-top: 12px;
  }
}
.empty-tip {
  margin-top: 20px;
  color: #8c8c8c;
  font-size: 13px;
}
</style>
