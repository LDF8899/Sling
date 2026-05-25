import requests
import re
import json
import time
import os
from math import radians, cos, sin, asin, sqrt
from typing import List, Dict, Tuple

# ===================== 配置区 =====================
AMAP_API_KEY = os.getenv("AMAP_API_KEY", "6b27e2cf049182541e6f659eacf63d89")
# 移除DEFAULT_CITY限制，支持全国地址检索
API_TIMEOUT = 15
SEARCH_RADIUS = 20000  # 20公里
MAX_RESULTS = 5


# ===================== 样式常量 =====================
class Style:
    HEADER = "\033[1;34m"  # 蓝色加粗
    SUCCESS = "\033[1;32m"  # 绿色加粗
    WARNING = "\033[1;33m"  # 黄色加粗
    ERROR = "\033[1;31m"  # 红色加粗
    INFO = "\033[0;36m"  # 青色常规
    JSON_STYLE = "\033[0;35m"  # 紫色（JSON专用）
    RESET = "\033[0m"  # 重置样式
    SEP_LINE = "=" * 70
    TAB = "  "


# ===================== 核心工具函数 =====================
def print_header(text: str) -> None:
    """打印带样式的标题"""
    print(f"\n{Style.HEADER}{Style.SEP_LINE}")
    print(f"{Style.TAB}{text}")
    print(f"{Style.SEP_LINE}{Style.RESET}")


def print_success(text: str) -> None:
    print(f"{Style.SUCCESS}✅ {text}{Style.RESET}")


def print_warning(text: str) -> None:
    print(f"{Style.WARNING}⚠️  {text}{Style.RESET}")


def print_error(text: str) -> None:
    print(f"{Style.ERROR}❌ {text}{Style.RESET}")


def print_info(text: str) -> None:
    print(f"{Style.INFO}ℹ️  {text}{Style.RESET}")


def print_json(data: dict) -> None:
    """控制台打印格式化JSON"""
    print_header("📋 医院数据JSON格式")
    json_str = json.dumps(data, ensure_ascii=False, indent=4)
    print(f"{Style.JSON_STYLE}{json_str}{Style.RESET}")


def loading_animation(text: str = "正在检索...") -> None:
    """加载动画"""
    chars = ["|", "/", "-", "\\"]
    for _ in range(8):
        print(f"\r{Style.WARNING}{text} {chars[_ % 4]}{Style.RESET}", end="", flush=True)
        time.sleep(0.1)
    print("\r" + " " * 40 + "\r", end="", flush=True)


def calculate_distance(lon1: float, lat1: float, lon2: float, lat2: float) -> int:
    """计算两点间直线距离（米）"""
    # 经纬度转弧度
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # 哈夫曼公式
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) **2 + cos(lat1) * cos(lat2) * sin(dlon / 2)** 2
    c = 2 * asin(sqrt(a))
    r = 6371000  # 地球半径（米）
    return int(c * r)


def extract_hospital_grade(tag: str, name: str, address: str) -> Tuple[str, str]:
    """强化等级识别：返回（带样式等级名，纯文本等级名）"""
    grade_config = [
        ("三级甲等", ["三甲", "三级甲等", "遵义医科大学附属医院"], Style.ERROR),
        ("三级乙等", ["三乙", "三级乙等"], Style.ERROR),
        ("三级医院", ["三级", "三级综合"], Style.ERROR),
        ("二级甲等", ["二甲", "二级甲等"], Style.WARNING),
        ("二级乙等", ["二乙", "二级乙等"], Style.WARNING),
        ("二级医院", ["二级", "二级综合"], Style.WARNING),
        ("社区医院", ["卫生院", "社区卫生服务中心", "接种点"], Style.INFO),
        ("中医院", ["中医院"], Style.INFO),
        ("专科医院", ["妇产医院", "儿童医院", "骨科医院"], Style.INFO),
        ("诊所/门诊部", ["诊所", "门诊部"], Style.INFO),
        ("未知等级", [], Style.WARNING)
    ]

    # 拼接所有文本用于匹配
    all_text = f"{name.lower()}|{tag.lower()}|{address.lower()}"

    # 匹配等级
    for grade_name, keywords, style in grade_config:
        if any(kw.lower() in all_text for kw in keywords):
            return f"{style}{grade_name}{Style.RESET}", grade_name

    # 默认返回未知等级
    return f"{Style.WARNING}未知等级{Style.RESET}", "未知等级"


def is_coordinate(input_str):
    """
    判断输入是否为经纬度坐标（支持两种格式：116.481028,39.921983 或 116.481028 39.921983）
    返回：(is_coord, lon, lat) 或 (False, None, None)
    """
    # 正则匹配经纬度格式（经度1-3位数字，纬度1-3位数字，支持小数）
    pattern = r'^(\d{1,3}\.\d+)\s*[,，\s]\s*(\d{1,3}\.\d+)$'
    match = re.match(pattern, input_str.strip())
    if match:
        lon = float(match.group(1))
        lat = float(match.group(2))
        # 简单校验经纬度范围（经度：-180~180，纬度：-90~90）
        if -180 <= lon <= 180 and -90 <= lat <= 90:
            return True, lon, lat
    return False, None, None


def address_to_coordinate(address, city=None):
    """
    地址转经纬度（复用map.py中的完善逻辑）
    :param address: 文字地址
    :param city: 城市名称（可选，用于提升解析精度）
    :return: 字典（包含状态、坐标等信息）
    """
    params = {
        "key": AMAP_API_KEY,
        "address": address,
        "output": "json"  # 返回格式为JSON
    }
    
    # 如果提供了城市参数，则使用城市参数提升解析精度
    if city:
        params["city"] = city
    try:
        response = requests.get(
            "https://restapi.amap.com/v3/geocode/geo",
            params=params,
            timeout=API_TIMEOUT
        )
        response.raise_for_status()  # 抛出HTTP错误
        result = response.json()

        if result.get("status") == "1" and len(result.get("geocodes", [])) > 0:
            geocode = result["geocodes"][0]
            return {
                "success": True,
                "location": geocode["location"],  # 经纬度（lon,lat）
                "province": geocode.get("province", ""),
                "city": geocode.get("city", ""),
                "district": geocode.get("district", ""),
                "formatted_address": geocode.get("formatted_address", "")
            }
        else:
            return {
                "success": False,
                "error": f"地址解析失败：{result.get('info', '未知错误')}"
            }
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"网络请求错误：{str(e)}"}
    except Exception as e:
        return {"success": False, "error": f"解析失败：{str(e)}"}


def coordinate_to_address(lon, lat):
    """
    经纬度转地址（来自map.py的功能）
    :param lon: 经度
    :param lat: 纬度
    :return: 字典（包含状态、地址等信息）
    """
    params = {
        "key": AMAP_API_KEY,
        "location": f"{lon},{lat}",
        "output": "json",
        "radius": 1000,
        "extensions": "all"
    }
    try:
        response = requests.get(
            "https://restapi.amap.com/v3/geocode/regeo",
            params=params,
            timeout=API_TIMEOUT
        )
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "1" and "regeocode" in result:
            regeocode = result["regeocode"]
            return {
                "success": True,
                "formatted_address": regeocode.get("formatted_address", "")
            }
        else:
            return {
                "success": False,
                "error": f"坐标解析失败：{result.get('info', '未知错误')}"
            }
    except Exception as e:
        return {"success": False, "error": f"解析失败：{str(e)}"}


def clean_text(text):
    """清理文本，移除特殊字符和不可见字符"""
    if not isinstance(text, str):
        return text
    import re
    # 移除不可见字符和特殊符号，保留可见的中文、英文、数字和常见符号
    # 先尝试解码可能的编码问题
    try:
        # 尝试修复可能的编码问题
        if isinstance(text, str):
            text = text.encode('utf-8', errors='ignore').decode('utf-8')
    except:
        pass
    
    # 移除控制字符和不可见字符
    cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)
    
    # 进一步清理：只保留可见字符（中文、英文字母、数字、常见标点）
    # 使用更广泛的清理模式
    cleaned = ''.join(ch for ch in cleaned if ord(ch) >= 32 or ord(ch) in [9, 10, 13])  # 保留制表符、换行符
    
    return cleaned.strip()

def search_hospitals_directly(lon: float, lat: float) -> List[Dict]:
    """检索附近医院"""
    keywords_list = ["医院", "卫生院", "中医院", "人民医院", "附属医院"]
    all_hospitals = []
    seen_names = set()

    for keyword in keywords_list:
        if len(all_hospitals) >= MAX_RESULTS:
            break

        params = {
            "key": AMAP_API_KEY,
            "keywords": keyword,
            "output": "json",
            "offset": 0,
            "limit": 10,
            "sortrule": "distance",
            "location": f"{lon},{lat}",
            "radius": SEARCH_RADIUS
        }

        try:
            response = requests.get(
                "https://restapi.amap.com/v3/place/text",
                params=params,
                timeout=API_TIMEOUT
            )
            result = response.json()
            if result.get("status") != "1" or not result.get("pois"):
                continue

            for poi in result["pois"]:
                name = clean_text(poi.get("name", "")).strip()
                if not name or name in seen_names:
                    continue

                # 提取核心信息
                poi_lon, poi_lat = map(float, poi["location"].split(","))
                distance = calculate_distance(lon, lat, poi_lon, poi_lat)
                distance_str = f"{distance}米" if distance < 1000 else f"{distance / 1000:.1f}公里"
                grade_style, grade_text = extract_hospital_grade(
                    clean_text(poi.get("tag", "")),
                    name,
                    clean_text(poi.get("address", ""))
                )

                hospital = {
                    "name": name,
                    "lon": poi_lon,
                    "lat": poi_lat,
                    "address": clean_text(poi.get("address", "未知地址")),
                    "distance": distance,
                    "distance_str": distance_str,
                    "grade_style": grade_style,
                    "grade_text": grade_text,
                    "tel": clean_text(poi.get("tel", "无联系电话"))
                }

                all_hospitals.append(hospital)
                seen_names.add(name)

                if len(all_hospitals) >= MAX_RESULTS:
                    break
        except Exception as e:
            continue

    # 按距离排序
    all_hospitals.sort(key=lambda x: x["distance"])
    return all_hospitals[:MAX_RESULTS]


def print_hospitals(hospitals: List[Dict], center_addr: str) -> None:
    """修复排版：整齐打印医院列表"""
    print_header(f"✅ 检索到 {len(hospitals)} 家医院（{center_addr} 附近）")

    # 打印表头（固定列宽，避免错乱）
    header = (
        f"{Style.HEADER}{Style.TAB}"
        f"{'序号':<4} | "
        f"{'医院名称':<20} | "
        f"{'等级':<10} | "
        f"{'距离':<8} | "
        f"{'坐标':<20} | "
        f"{'地址'}{Style.RESET}"
    )
    print(header)
    # 打印分隔线
    print(f"{Style.TAB}{'-' * 110}")

    # 打印医院列表（严格对齐）
    for i, h in enumerate(hospitals, 1):
        # 地址截断（避免过长）
        addr = h['address'][:30] + "..." if len(h['address']) > 30 else h['address']
        # 坐标格式化
        coord = f"{h['lon']:.6f},{h['lat']:.6f}"

        # 严格按列宽打印
        print(
            f"{Style.TAB}{i:<4} | "
            f"{h['name']:<20} | "
            f"{h['grade_style']:<10} | "
            f"{h['distance_str']:<8} | "
            f"{coord:<20} | "
            f"{addr}"
        )


# ===================== 主程序 =====================
import sys
import json
from argparse import ArgumentParser

def main():
    parser = ArgumentParser(description="医院搜索服务命令行工具")
    parser.add_argument('--mode', required=True, help='操作模式: search')
    parser.add_argument('--lon', type=float, help='中心点经度')
    parser.add_argument('--lat', type=float, help='中心点纬度')
    
    args = parser.parse_args()
    
    if args.mode == "search":
        if args.lon is None or args.lat is None:
            print(json.dumps({"error": "缺少坐标参数"}))
            return
        try:
            # 检索医院
            hospitals = search_hospitals_directly(args.lon, args.lat)
            
            if hospitals:
                # 生成纯文本JSON数据
                clean_hospitals = []
                for h in hospitals:
                    clean_h = {
                        "name": h["name"],
                        "longitude": h["lon"],
                        "latitude": h["lat"],
                        "address": h["address"],
                        "distance_m": h["distance"],
                        "distance": h["distance_str"],
                        "grade": h["grade_text"],
                        "telephone": h["tel"]
                    }
                    clean_hospitals.append(clean_h)

                result = {
                    "success": True,
                    "center_coordinate": f"{args.lon:.6f},{args.lat:.6f}",
                    "search_radius_km": SEARCH_RADIUS / 1000,
                    "hospitals": clean_hospitals
                }
                print(json.dumps(result, ensure_ascii=False))
            else:
                result = {
                    "success": False,
                    "error": "未检索到任何医院数据！"
                }
                print(json.dumps(result, ensure_ascii=False))
        except ValueError:
            result = {
                "success": False,
                "error": "坐标参数格式错误"
            }
            print(json.dumps(result, ensure_ascii=False))
    else:
        result = {
            "success": False,
            "error": f"不支持的模式: {args.mode}"
        }
        print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        result = {
            "success": False,
            "error": "程序被中断"
        }
        print(json.dumps(result, ensure_ascii=False))
    except Exception as e:
        result = {
            "success": False,
            "error": f"程序出错：{str(e)}"
        }
        print(json.dumps(result, ensure_ascii=False))