import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const Categories = () => import('@/pages/Categories.vue')
const Dashboard = () => import('@/pages/Dashboard.vue')
const Transactions = () => import('@/pages/Transactions.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: Transactions,
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
