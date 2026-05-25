"""
生成简单的占位 TabBar 图标
使用前需要先安装 PIL/Pillow 库：pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

# 图标配置
ICONS = {
    'home': '🏠',
    'scan': '📷',
    'first-aid': '🚑',
    'hospital': '🏥',
    'user': '👤'
}

COLORS = {
    'normal': (153, 153, 153, 255),      # #999999
    'active': (16, 185, 129, 255)        # #10b981
}

def create_icon(emoji, color, size=(81, 81), output_path=''):
    """创建单个图标"""
    # 创建透明背景图片
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 绘制 emoji（由于 PIL 对 emoji 支持有限，这里用圆形代替）
    # 实际使用时应该用真实的图标文件
    margin = 16
    draw.ellipse(
        [margin, margin, size[0]-margin, size[1]-margin],
        fill=color
    )
    
    # 保存
    img.save(output_path, 'PNG')
    print(f'✓ 已生成：{output_path}')

def main():
    # 确保目录存在
    os.makedirs('static/tabbar', exist_ok=True)
    
    # 为每个图标生成正常和选中两个状态
    for name, emoji in ICONS.items():
        # 正常状态
        create_icon(
            emoji, 
            COLORS['normal'],
            output_path=f'static/tabbar/{name}.png'
        )
        
        # 选中状态
        create_icon(
            emoji,
            COLORS['active'],
            output_path=f'static/tabbar/{name}-active.png'
        )
    
    print('\n✅ 所有图标已生成完成！')
    print('\n注意：这些是临时占位图标，建议替换为专业的 UI 图标。')

if __name__ == '__main__':
    main()
