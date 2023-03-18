import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import EmployeeList from './components/unit-components/MEmployeeList.vue'
import Dashboard from './components/unit-components/MDashboard.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

const routers = [
    {path: "/employee", component: EmployeeList},
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