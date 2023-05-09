import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main'
import PostPage from '../pages/PostPage'
import About from '../pages/About'
import PostIdPage from '../pages/PostIdPage'
import PostPageWithSote from '../pages/PostPageWithState'
import PostPageCompositionApi from '../pages/PostPageCompositionAPI'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithSote
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router