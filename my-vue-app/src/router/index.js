import { createRouter, createWebHistory } from 'vue-router'

import QueryCompany from '../features/QueryCompany/QueryCompany.vue'
import QueryEmpInfo from '../features/QueryEmpInfo/QueryEmpInfo.vue'
import QueryCompanyInfo from '../features/QueryCompany/QueryCompanyInfo.vue'

const routes = [
    {
        path: '/QueryCompany',
        component: QueryCompany
    },
    {
        path: '/QueryEmployee',
        component: QueryEmpInfo
    },
    {
        path: '/QueryCompanyInfo',
        component: QueryCompanyInfo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router