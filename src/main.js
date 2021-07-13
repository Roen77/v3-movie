import { createApp } from 'vue'
import App from './App.vue'
// import router from './routes/index.js';
// 인덱스명은 사실 .js 생략해도 가능하다
import router from './routes/index';
import store from './store/index.js'
import loadImage from './plugins/loadImage'

createApp(App).use(router).use(store).use(loadImage).mount('#app')