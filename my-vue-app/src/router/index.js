import { createRouter, createWebHistory } from 'vue-router'

import QueryCompany from '../features/QueryCompany/QueryCompany.vue'
import QueryEmpInfo from '../features/QueryEmpInfo/QueryEmpInfo.vue'
import QueryCompanyInfo from '../features/QueryCompany/QueryCompanyInfo.vue'
import DialogSample from '../features/DialogSample/DialogSample.vue'
import TableSample from '../features/TableSample/TableSample.vue'


const routes = [
    {
        path: '/QueryCompany',
        component: QueryCompany
    },
    {
        path: '/QueryEmpInfo',
        component: QueryEmpInfo
    },
    {
        path: '/QueryCompanyInfo',
        component: QueryCompanyInfo
    },
    {
        path: '/DialogSample',
        component: DialogSample
    },
    {
        path: '/TableSample',
        component: TableSample
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router