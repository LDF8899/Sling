/**
 * Shared utility functions for the SLING Uni-app mini program.
 * Centralizes duplicated code across pages.
 */

import { getBaseUrl } from './api.js'

/**
 * Resolve a relative image path to a full backend-accessible URL.
 * Uses getBaseUrl() from api.js for the correct base URL.
 * @param {string} imageUrl - Relative path or full URL
 * @returns {string} Full URL pointing to the backend image proxy
 */
export function getBackendImageUrl(imageUrl) {
  if (!imageUrl) return ''

  // Already a full HTTP/HTTPS URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Local path, proxy through backend
  const baseUrl = getBaseUrl()
  return `${baseUrl}/emergency/images/local?path=${encodeURIComponent(imageUrl)}`
}

/**
 * Format bytes into human-readable file size string.
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size (e.g. "1.5 MB")
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Navigate back, falling back to the index page if this is the first page.
 * Used by pages that are accessible both via tabBar and direct navigation.
 */
export function goBack() {
  const pages = getCurrentPages()
  if (pages.length <= 1) {
    uni.switchTab({ url: '/pages/index/index' })
  } else {
    uni.navigateBack({ delta: 1 })
  }
}
