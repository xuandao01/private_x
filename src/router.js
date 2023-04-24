import {createRouter, createWebHistory} from 'vue-router'
import EmployeeList from '@/views/DI/MEmployeeList.vue'
import AccountList from '@/views/DI/MAccountList.vue'
import DILandingPage from '@/views/DI/MDILandingPage.vue'
import MDIControl from '@/views/DI/MDIControl.vue'
import ReceiptPayment from '@/views/CA/MReceiptPaymentList.vue'
import CashProgress from '@/views/CA/MCashProgress.vue'
import Dashboard from '@/components/unit-components/MDashboard.vue'
import CashControl from '@/views/CA/MCashControl.vue'
import AuditList from '@/views/CA/MAuditList.vue'
import MonetaryFlow from '@/views/CA/MMonetaryFlow.vue'
const routers = [
    {path: "/DI", component: MDIControl, children:[
        {
            path: '',
            component: DILandingPage,
        },
        {
            path: 'DIEmployee',
            component: EmployeeList,
        },
        {
            path: 'DIAccountSystem',
            component: AccountList,
        }
    ]},
    {path: "/CA", component: CashControl, children:[
        {
            path: '',
            component: CashProgress,
        },
        {
            path: 'ReceiptPayment',
            component: ReceiptPayment,
        },
        {
            path: 'AuditList',
            component: AuditList,
        },
        {
            path: 'MonetaryFlow',
            component: MonetaryFlow,
        },
        
    ]},
    {path: "/", component: Dashboard}
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routers
})