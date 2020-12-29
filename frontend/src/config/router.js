import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import AppointmentsByCity from '@/components/appointment/AppointmentsByCategory'
import AppointmentById from '@/components/appointment/AppointmentById'
import Auth from '@/components/auth/Auth'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    name: 'appointmentsByCity',
    path: '/cities/:id/appointments',
    component: AppointmentsByCity
}, {
    name: 'appointmentById',
    path: '/appointments/:id',
    component: AppointmentById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
