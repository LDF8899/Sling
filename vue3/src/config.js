// API base URL — already proxied through Vite dev server
// Set VITE_API_BASE in .env for production builds
export const API_BASE_URL = import.meta.env.VITE_API_BASE || '/api'

// Default image placeholder used when an actual image is not available
export const DEFAULT_SNAKE_IMAGE = '/images/default-snake.jpg'
export const DEFAULT_AVATAR = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

// Image paths referenced by views
export const IMAGE_PATHS = {
  banner1: '/images/banner/banner1.png',
  banner2: '/images/banner/banner2.png',
  banner3: '/images/banner/banner3.png',
  banner4: '/images/banner/banner4.png',
  defaultSnake: '/images/default-snake.jpg'
}

export default {
  API_BASE_URL,
  DEFAULT_SNAKE_IMAGE,
  DEFAULT_AVATAR,
  IMAGE_PATHS
}
