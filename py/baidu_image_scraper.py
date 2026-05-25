import requests
import json
import os
import time
import urllib.parse
from typing import List
import sys

def scrape_baidu_images(keyword: str, save_dir: str = r"C:\Users\Asuka\Desktop\1\Sling\tu", num_images: int = 3):
    """
    从百度图片搜索并下载图片

    Args:
        keyword: 搜索关键词
        save_dir: 图片保存目录
        num_images: 下载图片数量
    """

    # 创建保存目录
    os.makedirs(save_dir, exist_ok=True)

    # 构造搜索URL
    encoded_keyword = urllib.parse.quote(keyword)
    base_url = "https://image.baidu.com/search/acjson"

    # 设置请求头，模拟真实浏览器
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Referer': 'https://image.baidu.com'
    }

    # 构造参数
    params = {
        'tn': 'resultjson_com',
        'ipn': 'rj',
        'ct': '201326592',
        'is': '',
        'fp': 'result',
        'queryWord': keyword,
        'cl': '2',
        'lm': '-1',
        'ie': 'utf-8',
        'oe': 'utf-8',
        'adpicid': '',
        'st': '-1',
        'z': '',
        'ic': '',
        'hd': '',
        'latest': '',
        'copyright': '',
        'word': keyword,
        's': '',
        'se': '',
        'tab': '',
        'width': '',
        'height': '',
        'face': '0',
        'istype': '2',
        'qc': '',
        'nc': '1',
        'fr': '',
        'expermode': '',
        'force': '',
        'pn': 0,  # 起始位置
        'rn': num_images,  # 返回数量
        'gsm': '1e',
        'logid': '0',  # 可以保持为0
        'pcindex': ''
    }

    print(f"正在搜索关键词: {keyword}")

    try:
        # 发送GET请求
        response = requests.get(base_url, params=params, headers=headers)
        response.raise_for_status()
        response.encoding = 'utf-8'

        # 解析JSON数据
        data = response.json()

        # 打印响应结构帮助调试
        print(f"API响应包含字段: {list(data.keys()) if isinstance(data, dict) else '非字典类型'}")

        # 提取图片URL
        image_urls = []
        if 'data' in data and isinstance(data['data'], list):
            print(f"找到 {len(data['data'])} 个数据项")
            for i, item in enumerate(data['data']):
                # 跳过空项
                if not item:
                    continue

                # 打印一些调试信息
                if i < 3:  # 只打印前3项用于调试
                    print(f"项目 {i} 包含字段: {list(item.keys()) if isinstance(item, dict) else '非字典类型'}")

                if isinstance(item, dict):
                    # 尝试多种可能的URL字段
                    url = None
                    for url_field in ['thumbURL', 'objURL', 'middleURL', 'hoverURL']:
                        if url_field in item and item[url_field]:
                            url = item[url_field]
                            break

                    if url:
                        image_urls.append(url)
                        if len(image_urls) >= num_images:
                            break
        else:
            print("'data'字段不存在或不是列表格式")

        print(f"提取到 {len(image_urls)} 张图片URL")

        # 下载图片
        downloaded_count = 0
        local_file_paths = []
        for i, img_url in enumerate(image_urls[:num_images]):
            try:
                print(f"正在下载第 {i+1} 张图片: {img_url}")

                # 添加延时，避免触发反爬虫机制
                time.sleep(1)

                # 获取图片内容
                img_response = requests.get(img_url, headers=headers, timeout=10)
                img_response.raise_for_status()

                # 确定图片扩展名
                content_type = img_response.headers.get('content-type', '')
                ext = '.jpg'
                if 'jpeg' in content_type or 'jpg' in content_type:
                    ext = '.jpg'
                elif 'png' in content_type:
                    ext = 'banner3.png'
                elif 'gif' in content_type:
                    ext = '.gif'

                # 生成文件名
                filename = f"{keyword}_{i+1}{ext}"
                filepath = os.path.join(save_dir, filename)

                # 保存图片
                with open(filepath, 'wb') as f:
                    f.write(img_response.content)

                print(f"已保存: {filename}")
                downloaded_count += 1
                local_file_paths.append(filepath)

            except Exception as e:
                print(f"下载图片失败: {e}")
                continue

        print(f"总共下载了 {downloaded_count} 张图片到 {save_dir}")
        
        # 返回图片URL列表和本地路径，以便Java程序可以获取
        return {
            'online_urls': image_urls,
            'local_paths': local_file_paths,
            'downloaded_count': downloaded_count
        }

    except Exception as e:
        print(f"搜索图片时出错: {e}")
        # 打印更多错误详情
        import traceback
        traceback.print_exc()
        return {
            'online_urls': [],
            'local_paths': [],
            'downloaded_count': 0
        }

if __name__ == "__main__":
    # 从命令行参数获取关键词
    if len(sys.argv) > 1:
        keyword = sys.argv[1]
    else:
        # 如果没有命令行参数，则提示用户输入
        keyword = input("请输入要搜索的图片关键词: ")
    
    # 从命令行参数获取图片数量（可选）
    num_images = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    
    # 从命令行参数获取保存目录（可选）
    save_dir = sys.argv[3] if len(sys.argv) > 3 else r"C:\Users\Asuka\Desktop\1\Sling\tu"
    
    result = scrape_baidu_images(keyword, save_dir, num_images)
    
    # 输出结果以便Java程序读取
    print(f"ONLINE_URLS: {result['online_urls']}")
    print(f"LOCAL_PATHS: {result['local_paths']}")
    print(f"DOWNLOADED_COUNT: {result['downloaded_count']}")