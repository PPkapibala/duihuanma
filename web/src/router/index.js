import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/codes',
    children: [
      {
        path: 'codes',
        name: '单人兑换码',
        meta: { title: '单人兑换码' },
        component: () => import(/* webpackChunkName: "codes" */ '@/views/codes/Index.vue')
      },
      {
        path: 'reusable',
        name: '复用兑换码',
        meta: { title: '复用兑换码' },
        component: () => import(/* webpackChunkName: "reusable" */ '@/views/reusable/Index.vue')
      },
      {
        path: 'query',
        name: '单码查询',
        meta: { title: '单码查询' },
        component: () => import(/* webpackChunkName: "query" */ '@/views/query/Index.vue')
      },
      {
        path: 'items',
        name: '道具管理',
        meta: { title: '道具管理' },
        component: () => import(/* webpackChunkName: "items" */ '@/views/items/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
