"""
压缩小程序静态资源图片
将 banner 和 tabbar 图片压缩到合适大小
"""
import os
from PIL import Image

# 配置路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BANNER_DIR = os.path.join(BASE_DIR, 'static', 'banner')
TABBAR_DIR = os.path.join(BASE_DIR, 'static', 'tabbar')

def compress_image(image_path, max_size_kb=200, quality=85):
    """
    压缩单张图片
    :param image_path: 图片路径
    :param max_size_kb: 目标最大大小 (KB)
    :param quality: JPEG 质量 (1-100)
    """
    if not os.path.exists(image_path):
        print(f"❌ 文件不存在：{image_path}")
        return
    
    # 打开图片
    img = Image.open(image_path)
    
    # 如果是 RGBA 格式，转换为 RGB
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    
    # 获取文件名
    filename = os.path.basename(image_path)
    dirname = os.path.dirname(image_path)
    name, ext = os.path.splitext(filename)
    
    # 压缩后的文件名（添加 compressed 后缀）
    compressed_filename = f"{name}_compressed{ext}"
    compressed_path = os.path.join(dirname, compressed_filename)
    
    # 保存压缩图片
    img.save(compressed_path, 'JPEG', quality=quality, optimize=True)
    
    # 检查大小
    size_kb = os.path.getsize(compressed_path) / 1024
    print(f"✅ {filename} -> {compressed_filename}")
    print(f"   原始大小：{os.path.getsize(image_path) / 1024:.2f} KB")
    print(f"   压缩后：{size_kb:.2f} KB")
    print(f"   压缩率：{(1 - size_kb / (os.path.getsize(image_path) / 1024)) * 100:.1f}%")
    
    return compressed_path

def compress_all():
    """压缩所有图片"""
    print("="*60)
    print("🚀 开始压缩 Banner 图片...")
    print("="*60)
    
    for filename in ['banner1.jpg', 'banner2.jpg', 'banner3.jpg']:
        filepath = os.path.join(BANNER_DIR, filename)
        compress_image(filepath, max_size_kb=200, quality=75)
    
    print("\n" + "="*60)
    print("🚀 开始压缩 Tabbar 图标...")
    print("="*60)
    
    tabbar_icons = [
        'home.png', 'home-active.png',
        'scan.png', 'scan-active.png',
        'first-aid.png', 'first-aid-active.png',
        'hospital.png', 'hospital-active.png',
        'user.png', 'user-active.png'
    ]
    
    for filename in tabbar_icons:
        filepath = os.path.join(TABBAR_DIR, filename)
        if os.path.exists(filepath):
            compress_image(filepath, max_size_kb=50, quality=80)
    
    print("\n" + "="*60)
    print("✨ 压缩完成！")
    print("="*60)
    print("\n📝 使用说明：")
    print("1. 检查压缩后的图片效果")
    print("2. 如果满意，将原图片替换为压缩后的图片（去掉 _compressed 后缀）")
    print("3. 或者在代码中引用压缩后的文件名")

if __name__ == '__main__':
    try:
        compress_all()
    except Exception as e:
        print(f"❌ 错误：{e}")
        print("\n💡 提示：请确保已安装 Pillow 库")
        print("   运行：pip install Pillow")
