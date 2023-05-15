import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import {router} from './router.js'
import vueColumnsResizable from './plugins/vue-columns-resizable/plugins/vue-columns-resizable/index.js'

const pinia = createPinia();

const app = createApp(App);

app.use(vueColumnsResizable);
app.use(pinia);
app.use(router);
router.isReady().then(()=> {
    app.mount("#app")
})