import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CAppLayout from '../components/layout/CAppLayout.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Recognition from '../views/Recognition.vue'
import Warning from '../views/Warning.vue'
import Emergency from '../views/Emergency.vue'
import HospitalMapView from '../views/HospitalMapView.vue'
import Profile from '../views/Profile.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import KnowledgeGraph from '../views/KnowledgeGraph.vue'
import RescueDashboard from '../views/RescueDashboard.vue'
import UserManagement from '../views/admin/UserManagement.vue'
import AdminUserManagement from '../views/admin/AdminUserManagement.vue'
import SnakeManagement from '../views/admin/SnakeManagement.vue'
import EmergencyInfoManagement from '../views/admin/EmergencyInfoManagement.vue'
import HospitalManagement from '../views/admin/HospitalManagement.vue'
import WarningManagement from '../views/admin/WarningManagement.vue'
import SOSManagement from '../views/admin/SOSManagement.vue'
import SystemConfig from '../views/admin/SystemConfig.vue'
import LogManagement from '../views/admin/LogManagement.vue'
import SerumSupplyChain from '../views/admin/SerumSupplyChain.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },

  // C-end shell
  {
    path: '/',
    component: CAppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'recognition', name: 'Recognition', component: Recognition },
      { path: 'warning', name: 'Warning', component: Warning },
      { path: 'emergency', name: 'Emergency', component: Emergency },
      { path: 'hospital', name: 'Hospital', component: HospitalMapView },
      { path: 'graph', name: 'KnowledgeGraph', component: KnowledgeGraph },
      { path: 'profile', name: 'Profile', component: Profile },
      {
        path: 'rescue',
        name: 'RescueDashboard',
        component: RescueDashboard,
        meta: { requiresAdmin: true }
      }
    ]
  },

  // Admin shell
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'users', name: 'UserManagement', component: UserManagement },
      { path: 'admins', name: 'AdminUserManagement', component: AdminUserManagement },
      { path: 'snakes', name: 'SnakeManagement', component: SnakeManagement },
      { path: 'emergency', name: 'EmergencyInfoManagement', component: EmergencyInfoManagement },
      { path: 'hospitals', name: 'HospitalManagement', component: HospitalManagement },
      { path: 'warnings', name: 'WarningManagement', component: WarningManagement },
      { path: 'sos', name: 'SOSManagement', component: SOSManagement },
      { path: 'config', name: 'SystemConfig', component: SystemConfig },
      { path: 'logs', name: 'LogManagement', component: LogManagement },
      { path: 'serum', name: 'SerumSupplyChain', component: SerumSupplyChain }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !userStore.isAdmin && !userStore.isRescuer) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
