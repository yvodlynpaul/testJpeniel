import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createPinia } from 'pinia'
import {useAuthStore} from './stores/auth'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ToastPlugin)

// Initialize the auth store
const authStore = useAuthStore();
authStore.initializeAuth();

// If a token exists, fetch user details
if (authStore.token) {
    authStore.getUser();
}

app.mount('#app')