import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import EmployeeList from './components/unit-components/DI/MEmployeeList.vue'
import MDIControl from './components/unit-components/DI/MDIControl.vue'
import ReceiptPayment from './components/unit-components/cash-control/MCashReceiptPayment.vue'
import CashProgress from './components/unit-components/cash-control/MCashProgress.vue'
import Dashboard from './components/unit-components/MDashboard.vue'
import CashControl from './components/unit-components/cash-control/MCashControl.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

const routers = [
    {path: "/DI", component: MDIControl, children:[
        {
            path: '/DIEmployee',
            component: EmployeeList,
        }
    ]},
    {path: "/money", component: CashControl, children:[
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
            component: CashProgress,
        },
        {
            path: 'MonetaryFlow',
            component: CashProgress,
        },
        
    ]},
    {path: "/", component: Dashboard}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app")