import './styles/main.scss'
import 'vue-awesome-paginate/dist/style.css'

import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'

import VueAwesomePaginate from 'vue-awesome-paginate'
import App from './App.vue'

const app = createApp(App)

app.provide('imgPath', import.meta.env.VITE_IMAGE_URL)

app.use(router)
app.use(store)
app.use(VueAwesomePaginate)

app.mount('#app')
