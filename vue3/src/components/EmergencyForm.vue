<template>
  <el-dialog
    v-model="dialogVisible"
    title="紧急求助"
    width="600px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="求助类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择求助类型">
          <el-option label="蛇咬伤" value="snake_bite"></el-option>
          <el-option label="其他动物伤害" value="animal_harm"></el-option>
          <el-option label="其他紧急情况" value="other"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="当前位置" prop="location">
        <div class="location-info">
          <span v-if="location">{{ location }}</span>
          <span v-else>正在获取位置...</span>
          <el-button 
            type="primary" 
            size="small" 
            @click="getCurrentLocation" 
            :loading="locationLoading"
            :disabled="locationLoading"
            style="margin-left: 10px;"
          >
            {{ locationLoading ? '获取中...' : '重新获取' }}
          </el-button>
        </div>
      </el-form-item>
      
      <el-form-item label="详细描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请详细描述您的紧急情况，包括症状、受伤时间等信息"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="上传图片" prop="images">
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleImageChange"
          :on-remove="handleImageRemove"
          :limit="5"
          accept="image/*"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div class="upload-tips">最多上传5张图片，支持JPG、PNG等格式</div>
      </el-form-item>
      
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入紧急联系人电话"></el-input>
      </el-form-item>
      
      <el-form-item label="是否公开求助">
        <el-switch v-model="form.isPublic"></el-switch>
        <div class="help-text">公开求助可让更多人看到并提供帮助</div>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button 
          type="primary" 
          @click="submitForm" 
          :loading="submitting"
          :disabled="submitting"
        >
          {{ submitting ? '提交中...' : '提交求助' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElUpload, ElIcon, ElSwitch, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import api from '../services/api'

// 定义emit
const emit = defineEmits(['close', 'submit'])

// 响应式数据
const dialogVisible = ref(false)
const location = ref('')
const locationLoading = ref(false)
const submitting = ref(false)
const fileList = ref([])
const formRef = ref()

// 表单数据
const form = reactive({
  type: '',
  location: '',
  description: '',
  phone: '',
  isPublic: false
})

// 表单验证规则
const rules = {
  type: [
    { required: true, message: '请选择求助类型', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入详细描述', trigger: 'blur' },
    { min: 10, message: '描述内容至少10个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 打开弹窗
const open = () => {
  dialogVisible.value = true
  getCurrentLocation()
}

// 关闭弹窗
const close = () => {
  dialogVisible.value = false
}

// 获取当前位置
const getCurrentLocation = async () => {
  locationLoading.value = true
  try {
    // 模拟获取位置，实际项目中可以使用浏览器的Geolocation API或其他地图服务
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          location.value = `纬度: ${latitude.toFixed(6)}, 经度: ${longitude.toFixed(6)}`
          form.location = location.value
          locationLoading.value = false
        },
        (error) => {
          console.error('获取位置失败:', error)
          location.value = '获取位置失败，请手动输入'
          form.location = '获取位置失败，请手动输入'
          locationLoading.value = false
        }
      )
    } else {
      location.value = '您的浏览器不支持地理定位'
      form.location = '您的浏览器不支持地理定位'
      locationLoading.value = false
    }
  } catch (error) {
    console.error('获取位置失败:', error)
    location.value = '获取位置失败，请手动输入'
    form.location = '获取位置失败，请手动输入'
    locationLoading.value = false
  }
}

// 处理图片上传
const handleImageChange = (file, fileList) => {
  // 验证文件大小
  if (file.size > 10 * 1024 * 1024) { // 10MB
    ElMessage.error('图片大小不能超过10MB')
    fileList.pop() // 移除超出大小的文件
    return
  }
}

// 处理图片移除
const handleImageRemove = (file, fileList) => {
  // Image removed — file list updated
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    // 验证表单
    await formRef.value.validate()
    
    submitting.value = true
    
    // 准备提交数据
    const submitData = {
      ...form,
      images: fileList.value.map(file => file.raw || file) // 提取原始文件对象
    }
    
    // 调用API提交紧急求助
    const response = await api.emergency.submitEmergency(submitData)
    
    if (response.data.code === 200) {
      ElMessage.success('求助提交成功！')
      emit('submit', response.data.data)
      dialogVisible.value = false
      resetForm()
    } else {
      ElMessage.error(response.data.message || '提交失败')
    }
  } catch (error) {
    console.error('提交求助失败:', error)
    if (error.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('提交失败，请重试')
    }
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  form.type = ''
  form.description = ''
  form.phone = ''
  form.isPublic = false
  fileList.value = []
  form.location = location.value
}

// 关闭弹窗处理
const handleClose = () => {
  dialogVisible.value = false
  emit('close')
}

// 暴露方法给父组件
defineExpose({
  open,
  close
})
</script>

<style scoped>
.location-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.upload-tips {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
}

.help-text {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>