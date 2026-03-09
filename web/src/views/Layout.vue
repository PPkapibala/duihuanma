<template>
  <Layout class="app-layout">
    <Sider :width="200" collapsible hide-trigger class="app-sider">
      <div class="logo">
        <span class="logo-text">迅风管理后台</span>
        <Tag color="blue" size="small">v2</Tag>
      </div>
      <Menu
        :active-name="activeMenu"
        theme="dark"
        width="auto"
        @on-select="onMenuSelect"
      >
        <MenuGroup title="兑换码管理">
          <MenuItem name="codes">
            <Icon type="ios-pricetag-outline" />
            <span>单人兑换码</span>
          </MenuItem>
          <MenuItem name="reusable">
            <Icon type="ios-pricetags-outline" />
            <span>复用兑换码</span>
          </MenuItem>
          <MenuItem name="query">
            <Icon type="ios-search" />
            <span>单码查询</span>
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="基础配置">
          <MenuItem name="items">
            <Icon type="ios-cube-outline" />
            <span>道具管理</span>
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="数据">
          <MenuItem name="report" @click.native="onReportClick">
            <Icon type="ios-stats" />
            <span>兑换码报表</span>
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Layout>
      <Header class="app-header">
        <div class="header-left">
          <span class="header-label">所属游戏</span>
          <Select v-model="currentGame" size="small" style="width:120px" @on-change="onGameChange">
            <Option value="game1">幻境大陆</Option>
            <Option value="game2">星际征途</Option>
            <Option value="game3">荣耀联盟</Option>
          </Select>
          <Divider type="vertical" />
          <Breadcrumb>
            <BreadcrumbItem>迅风管理后台</BreadcrumbItem>
            <BreadcrumbItem>{{ pageTitle }}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="header-right">
          <span class="role-label">当前角色：</span>
          <Select v-model="currentRole" size="small" style="width:100px" @on-change="onRoleChange">
            <Option value="ops">运营人员</Option>
            <Option value="cs">客服人员</Option>
          </Select>
          <Icon type="ios-notifications-outline" size="22" class="icon-btn" />
          <Avatar size="small" class="avatar">JZ</Avatar>
        </div>
      </Header>
      <Content class="app-content">
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      currentGame: 'game1',
      currentRole: 'ops'
    }
  },
  computed: {
    activeMenu() {
      const name = this.$route.name
      const map = { '单人兑换码': 'codes', '复用兑换码': 'reusable', '单码查询': 'query', '道具管理': 'items' }
      return map[name] || this.$route.path.slice(1) || 'codes'
    },
    pageTitle() {
      return this.$route.meta?.title || this.$route.name || '单人兑换码'
    }
  },
  methods: {
    onMenuSelect(name) {
      if (name === 'report') return
      this.$router.push({ path: `/${name}` })
    },
    onReportClick() {
      this.$Message.info('报表模块由大数据平台提供，即将跳转…')
    },
    onGameChange(val) {
      this.$Message.info('已切换游戏')
    },
    onRoleChange(val) {
      this.$Message.info(val === 'ops' ? '已切换为运营人员' : '已切换为客服人员')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
}
.app-sider {
  background: #001529;
  .logo {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.2);
    .logo-text {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }
  }
  /deep/ .ivu-menu-dark {
    background: #001529;
  }
}
.app-header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    .header-label {
      font-size: 13px;
      color: #8c8c8c;
    }
    .ivu-breadcrumb {
      font-size: 13px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    .role-label {
      font-size: 12px;
      color: #8c8c8c;
    }
    .icon-btn {
      color: #8c8c8c;
      cursor: pointer;
    }
    .avatar {
      background: #2d8cf0;
      color: #fff;
    }
  }
}
.app-content {
  padding: 20px;
  background: #f0f2f5;
  overflow: auto;
  height: calc(100vh - 64px);
}
</style>
