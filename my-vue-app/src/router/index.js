import { createRouter, createWebHistory } from 'vue-router'

import QueryCompany from '../features/QueryCompany/QueryCompany.vue'
import QueryEmpInfo from '../features/QueryEmpInfo/QueryEmpInfo.vue'
import QueryCompanyInfo from '../features/QueryCompany/QueryCompanyInfo.vue'
import DialogSample from '../features/JxDialog/DialogSample.vue'
import TableSample from '../features/JxTable/TableSample.vue'
import AlertSample from '../features/JxAlert/AlertSample.vue'
import ButtonSample from '../features/JxButton/ButtonSample.vue'
import PortalHome from '../features/Portal/PortalHome.vue'
import NotFound from '../features/NotFound/NotFound.vue'

const routes = [
    {
        path: '/',
        component: PortalHome
    },
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
        path: '/AlertSample',
        component: AlertSample
    },
    {
        path: '/ButtonSample',
        component: ButtonSample
    },
    {
        path: '/DialogSample',
        component: DialogSample
    },
    {
        path: '/TableSample',
        component: TableSample
    },
    // ⭐ 404
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory('/VueSample/'),
    routes
})

export default router