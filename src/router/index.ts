import { createRouter , createWebHashHistory} from 'vue-router'

const routes = [
    {
        name:'Index',
        path:'/',
        component:()=> import('@/views/index/index.vue')
    },
    {
        name:'Flow',
        path:'/flow',
        component:()=> import('@/views/flow/flow.vue')
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
