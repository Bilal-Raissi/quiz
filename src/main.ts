import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Import Bootstrap and Bootstrap Icons CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Import Bootstrap JS (optional for components like modals, dropdowns)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './style.css'

createApp(App).use(router).mount('#app')
