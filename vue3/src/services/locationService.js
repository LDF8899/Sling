import { ElMessage, ElLoading } from 'element-plus'

// 定位服务
class LocationService {
  /**
   * 获取当前位置
   * @param {Object} options - 定位选项
   * @returns {Promise<Object>} 包含经纬度信息的对象
   */
  static getCurrentLocation(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('当前设备不支持定位功能'))
        return
      }

      const defaultOptions = {
        enableHighAccuracy: true, // 启用高精度
        timeout: 10000,          // 10秒超时
        maximumAge: 60000        // 缓存时间
      }

      const mergedOptions = { ...defaultOptions, ...options }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude, accuracy, timestamp } = position.coords
          const locationData = {
            longitude,
            latitude,
            accuracy, // 精度（米）
            timestamp
          }
          resolve(locationData)
        },
        (error) => {
          reject(this.handleError(error))
        },
        mergedOptions
      )
    })
  }

  /**
   * 获取当前位置并显示加载提示
   * @param {Object} options - 定位选项
   * @returns {Promise<Object>} 包含经纬度信息的对象
   */
  static async getCurrentLocationWithLoading(options = {}) {
    const loading = ElLoading.service({ text: '正在获取位置...' })

    try {
      const locationData = await this.getCurrentLocation(options)
      ElMessage.success(`已获取当前位置：${locationData.longitude}, ${locationData.latitude}`)
      return locationData
    } catch (error) {
      ElMessage.error(error.message)
      throw error
    } finally {
      loading.close()
    }
  }

  /**
   * 将位置信息转换为坐标字符串
   * @param {Object} location - 包含longitude和latitude的对象
   * @returns {string} 坐标字符串，格式为 "longitude,latitude"
   */
  static formatLocationToString(location) {
    if (!location || typeof location.longitude === 'undefined' || typeof location.latitude === 'undefined') {
      throw new Error('无效的位置信息')
    }
    return `${location.longitude},${location.latitude}`
  }

  /**
   * 解析坐标字符串
   * @param {string} locationString - 坐标字符串，格式为 "longitude,latitude"
   * @returns {Object} 包含longitude和latitude的对象
   */
  static parseLocationString(locationString) {
    if (!locationString) {
      throw new Error('无效的坐标字符串')
    }

    const coords = locationString.split(/[,，\s]+/).filter(Boolean)
    if (coords.length < 2) {
      throw new Error('坐标格式错误，请使用"经度,纬度"格式')
    }

    const longitude = parseFloat(coords[0])
    const latitude = parseFloat(coords[1])

    if (isNaN(longitude) || isNaN(latitude)) {
      throw new Error('坐标格式错误，请使用有效的数字')
    }

    if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      throw new Error('坐标范围错误，经度范围：-180~180，纬度范围：-90~90')
    }

    return { longitude, latitude }
  }

  /**
   * 计算两点之间的距离（单位：米）
   * @param {number} lon1 - 第一个点的经度
   * @param {number} lat1 - 第一个点的纬度
   * @param {number} lon2 - 第二个点的经度
   * @param {number} lat2 - 第二个点的纬度
   * @returns {number} 距离（米）
   */
  static calculateDistance(lon1, lat1, lon2, lat2) {
    const R = 6371000; // 地球半径（米）
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * 角度转弧度
   * @param {number} degree - 角度
   * @returns {number} 弧度
   */
  static toRadians(degree) {
    return degree * (Math.PI / 180);
  }

  /**
   * 处理定位错误
   * @param {Object} error - 错误对象
   * @returns {Error} 格式化后的错误
   */
  static handleError(error) {
    let message = '定位失败'
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = '用户拒绝了定位请求，请允许位置权限'
        break
      case error.POSITION_UNAVAILABLE:
        message = '位置信息不可用'
        break
      case error.TIMEOUT:
        message = '定位超时'
        break
      default:
        message = error.message || '定位失败'
        break
    }
    return new Error(message)
  }
}

export default LocationService