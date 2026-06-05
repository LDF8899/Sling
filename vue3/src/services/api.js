import axios from 'axios'
import { ElMessage } from 'element-plus'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(response => {
  const data = response.data
  if (data && data.code !== undefined && data.code !== 200) {
    ElMessage.warning(data.message || '操作未成功')
  }
  return response
}, error => {
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    ElMessage.error('请求超时，请检查后端服务或网络')
    return Promise.reject(new Error('请求超时'))
  }
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    ElMessage.error('登录已过期，请重新登录')
    window.location.href = '/login'
    return Promise.reject(error)
  }
  const msg = error.response?.data?.message || error.message || '网络错误'
  ElMessage.error(msg)
  return Promise.reject(error)
})

// ==================== Admin API ====================
export const adminApi = {
  login(data) {
    return api.post('/admin/login', data)
  },

  getDashboard() {
    return api.get('/admin/dashboard')
  },

  // Admin Users
  getAdminUsers(params) {
    return api.get('/admin/users', { params })
  },
  getAdminUser(id) {
    return api.get(`/admin/users/${id}`)
  },
  createAdminUser(data) {
    return api.post('/admin/users', data)
  },
  updateAdminUser(id, data) {
    return api.put(`/admin/users/${id}`, data)
  },
  deleteAdminUser(id) {
    return api.delete(`/admin/users/${id}`)
  },
  changeAdminPassword(id, data) {
    return api.put(`/admin/users/${id}/password`, data)
  },
  toggleAdminStatus(id, data) {
    return api.put(`/admin/users/${id}/status`, data)
  },
  getAdminRoles() {
    return api.get('/admin/roles')
  },

  // System Config
  getConfigs() {
    return api.get('/admin/config')
  },
  getConfigsByGroup(group) {
    return api.get(`/admin/config/${group}`)
  },
  saveConfigs(group, data) {
    return api.put(`/admin/config/${group}`, data)
  },

  // Operation Logs
  getLogs(params) {
    return api.get('/admin/logs', { params })
  },
  getLogDetail(id) {
    return api.get(`/admin/logs/${id}`)
  }
}

// ==================== User API (C-end users managed by admin) ====================
export const userApi = {
  login(data) { return api.post('/user/login', data) },
  adminLogin(data) { return api.post('/user/admin/login', data) },
  register(data) { return api.post('/user/register', data) },
  getUserInfo(id) { return api.get(`/user/info/${id}`) },
  updateUserInfo(data) { return api.put('/user/update', data) },
  changePassword(data) { return api.put('/user/change-password', data) },
  uploadAvatar(data) {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('userId', data.userId)
    return api.post('/user/avatar/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  getUserList(params) { return api.get('/user/list', { params }) },
  getUserRoles(userId) { return api.get(`/user/roles/${userId}`) },
  createUser(data) { return api.post('/user/create', data) },
  updateUser(data) { return api.put('/user/update', data) },
  deleteUser(id) { return api.delete(`/user/delete/${id}`) },
  batchDeleteUsers(userIds) { return api.post('/user/batch-delete', { userIds }) },
  getAllRoles() { return api.get('/user/roles') },
  assignUserRoles(userId, roles) { return api.post('/user/assign-roles', { userId, roles }) }
}

// ==================== Snake Admin API ====================
export const snakeAdminApi = {
  getList(params) { return api.get('/snake/admin/list', { params }) },
  getSnake(id) { return api.get(`/snake/admin/${id}`) },
  createSnake(data) { return api.post('/snake/admin', data) },
  updateSnake(id, data) { return api.put(`/snake/admin/${id}`, data) },
  deleteSnake(id) { return api.delete(`/snake/admin/${id}`) },
  getFamilies() { return api.get('/snake/admin/families') },

  // Emergency Info
  getEmergencyList(params) { return api.get('/snake/admin/emergency/list', { params }) },
  getEmergency(id) { return api.get(`/snake/admin/emergency/${id}`) },
  createEmergency(data) { return api.post('/snake/admin/emergency', data) },
  updateEmergency(id, data) { return api.put(`/snake/admin/emergency/${id}`, data) },
  deleteEmergency(id) { return api.delete(`/snake/admin/emergency/${id}`) }
}

// ==================== Hospital Admin API ====================
export const hospitalAdminApi = {
  getList(params) { return api.get('/hospital/admin/list', { params }) },
  getHospital(id) { return api.get(`/hospital/admin/${id}`) },
  createHospital(data) { return api.post('/hospital/admin', data) },
  updateHospital(id, data) { return api.put(`/hospital/admin/${id}`, data) },
  deleteHospital(id) { return api.delete(`/hospital/admin/${id}`) },

  getSerumList(params) { return api.get('/hospital/admin/serum/list', { params }) },
  updateSerum(id, data) { return api.put(`/hospital/admin/serum/${id}`, data) }
}

// ==================== Warning Admin API ====================
export const warningAdminApi = {
  getAreas(params) { return api.get('/warning/admin/areas', { params }) },
  getArea(id) { return api.get(`/warning/admin/areas/${id}`) },
  createArea(data) { return api.post('/warning/admin/areas', data) },
  updateArea(id, data) { return api.put(`/warning/admin/areas/${id}`, data) },
  deleteArea(id) { return api.delete(`/warning/admin/areas/${id}`) },

  getRecords(params) { return api.get('/warning/admin/records', { params }) },

  getRules(params) { return api.get('/warning/admin/rules', { params }) },
  updateRule(id, data) { return api.put(`/warning/admin/rules/${id}`, data) }
}

// ==================== SOS (Emergency Help) Admin API ====================
export const sosAdminApi = {
  getList(params) { return api.get('/emergency/help/list', { params }) },
  getDetail(id) { return api.get(`/emergency/help/detail/${id}`) },
  updateStatus(id, status) { return api.put(`/emergency/help/${id}/status`, null, { params: { status } }) },
  getStats() { return api.get('/emergency/help/stats') },
  triggerAlert(id) { return api.post(`/emergency/help/alert/${id}`) }
}

// ==================== C-end APIs (unchanged) ====================
export const recognitionApi = {
  identifySnake(formData) { return api.post('/recognition/identify', formData, { timeout: 60000 }) },
  getRecordsByUser(userId) { return api.get(`/recognition/records/user/${userId}`) },
  getRecordCount(userId) { return api.get(`/recognition/records/user/${userId}/count`) },
  getRecentRecords(userId, limit = 5) { return api.get(`/recognition/records/user/${userId}/recent`, { params: { limit } }) }
}

export const emergencyApi = {
  analyzeWoundImage(formData) { return api.post('/emergency/image/analyze', formData, { timeout: 60000 }) },
  askEmergencyQuestion(question) { return api.post('/emergency/guide/ask', question, { headers: { 'Content-Type': 'application/json' } }) },
  getEmergencyGuideByName(name) { return api.get(`/emergency/guide/${name}`) },
  refreshEmergencyGuide(name) { return api.get(`/emergency/guide/${name}`, { params: { refresh: true } }) },
  getDetailedSnakeInfo(name) { return api.get(`/emergency/guide/details/${name}`) },
  getEmergencyGuidesBySymptoms(s) { return api.post('/emergency/guide/by-symptoms', s) },
  clearQaCache() { return api.delete('/emergency/guide/cache/clear') },
  submitEmergency(data) { return api.post('/emergency/help/submit', data) },
  getEmergencyHistory() { return api.get('/emergency/help/history') },
  // Rescue dispatch (SOS management)
  getRescueStats() { return api.get('/emergency/help/stats') },
  getRescueList(params) { return api.get('/emergency/help/list', { params }) },
  getRescueDetail(id) { return api.get(`/emergency/help/detail/${id}`) },
  getRescueLatest(since) { return api.get('/emergency/help/latest', { params: { since } }) },
  updateRescueStatus(id, status) { return api.put(`/emergency/help/${id}/status`, null, { params: { status } }) }
}

export const warningApi = {
  getActiveAreaMap(params) { return api.get('/warning/active-area/map', { params }) },
  getRecentWarnings(params) { return api.get('/warning/recent', { params }) },
  getActiveAreaDetail(id) { return api.get(`/warning/active-area/detail/${id}`) },
  getRealTimeWarning(data) { return api.post('/warning/real-time', data) },
  convertLocation(params) { return api.get('/warning/convert-location', { params }) },
  checkProximity(params) { return api.get('/warning/check-proximity', { params }) },
  getRegionTree() { return api.get('/warning/region-tree') },
  getWarningByRegion(regionId) { return api.get('/warning/by-region', { params: { regionId } }) }
}

// ==================== Rescue Region API ====================
export const rescueRegionApi = {
  getTree() { return api.get('/rescue/regions/tree') },
  getList(params) { return api.get('/rescue/regions', { params }) },
  create(data) { return api.post('/rescue/regions', data) },
  update(id, data) { return api.put(`/rescue/regions/${id}`, data) },
  delete(id) { return api.delete(`/rescue/regions/${id}`) }
}

// ==================== Rescue Warning API ====================
export const rescueWarningApi = {
  getAreas(params) { return api.get('/rescue/warning/areas', { params }) },
  createArea(data) { return api.post('/rescue/warning/areas', data) },
  updateArea(id, data) { return api.put(`/rescue/warning/areas/${id}`, data) },
  deleteArea(id, params) { return api.delete(`/rescue/warning/areas/${id}`, { params }) },
  verifyPassword(data) { return api.post('/rescue/warning/verify-password', data) }
}

// ==================== Rescue Serum API ====================
export const rescueSerumApi = {
  getList(regionId) { return api.get('/rescue/serum', { params: { regionId } }) },
  create(data) { return api.post('/rescue/serum', data) },
  update(id, data) { return api.put(`/rescue/serum/${id}`, data) },
  delete(id, params) { return api.delete(`/rescue/serum/${id}`, { params }) },
  getHospitalsWithSerum(snakeId) { return api.get(`/hospital/with-serum/${snakeId}`) }
}

export const hospitalApi = {
  searchSnakeVenomHospitals(data) { return api.post('/hospital/snake-venom/nearby', data) },
  exportSnakeVenomHospitals(data) { return api.post('/hospital/snake-venom/export', data, { responseType: 'blob' }) },
  generateNavigationUrl(params) { return api.get('/hospital/navigation', { params }) },
  geocode(params) { return api.get('/hospital/geocode', { params }) },
  reverseGeocode(params) { return api.get('/hospital/reverse-geocode', { params }) },
  searchHospitals(data) { return api.post('/hospital/search', data) },
  getRoute(data) {
    return api.post(data.routeType === 'driving' ? '/hospital/route/driving' : '/hospital/route/walking', data)
  }
}

export default { admin: adminApi, user: userApi, snakeAdmin: snakeAdminApi, hospitalAdmin: hospitalAdminApi, warningAdmin: warningAdminApi, sosAdmin: sosAdminApi, recognition: recognitionApi, emergency: emergencyApi, warning: warningApi, hospital: hospitalApi, rescueRegion: rescueRegionApi, rescueWarning: rescueWarningApi, rescueSerum: rescueSerumApi }
