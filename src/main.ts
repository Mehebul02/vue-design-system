import { createApp } from 'vue'
import './styles/globals.css'
import App from './App.vue'
import {Router} from "./routes/Index.ts";

createApp(App).use(Router).mount('#app')
