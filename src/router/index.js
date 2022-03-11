import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetail from '../views/event/Detail.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({
      limit: parseInt(route.query.limit) || 2,
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias: '/about'
  },
  {
    path: '/about',
    redirect: { name: 'About'}
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children : [
      {
        path: '',
        name: 'EventDetail',
        component: EventDetail,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return {
        path: '/events/' + to.params.afterEvent
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/networkError',
    name: 'networkError',
    component: NetworkError,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
