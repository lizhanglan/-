import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入Vant的移动端适配工具
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';

// 创建Vue应用实例
const app = createApp(App)

// 挂载应用
app.mount('#app')
