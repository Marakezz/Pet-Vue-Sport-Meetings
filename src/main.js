import './assets/main.css'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import {
    createApp
} from 'vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import MeetingPage from './pages/MeetingPage.vue'
import MeetingCreatingPage from './pages/MeetingCreatingPage.vue'

const app = createApp(App)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/meetingpage/:id',
        name: 'MeetingPage',
        component: MeetingPage
    },
    {
        path: '/meeting-creating-page',
        name: 'MeetingCreatingPage',
        component: MeetingCreatingPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


app.use(router)
// app.use(autoAnimatePlugin)
app.mount('#app')