import requests
import re
import os

# 高德地图API配置 - 从环境变量获取API Key，兼容旧方式
AMAP_API_KEY = os.getenv("AMAP_API_KEY", "6b27e2cf049182541e6f659eacf63d89")
# 地理编码（地址转坐标）API地址
GEOCODE_URL = "https://restapi.amap.com/v3/geocode/geo"
# 逆地理编码（坐标转地址）API地址
REGEOCODE_URL = "https://restapi.amap.com/v3/geocode/regeo"


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
    地址转经纬度（地理编码）
    :param address: 文字地址（如：北京市朝阳区望京SOHO）
    :param city: 城市名称（可选，用于提升解析精度）
    :return: 字典（包含状态、坐标、精度等信息）
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
        response = requests.get(GEOCODE_URL, params=params, timeout=10)
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
                "formatted_address": geocode.get("formatted_address", ""),
                "precision": geocode.get("precision", "")  # 匹配精度（如：门牌号、街道、城市等）
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
    经纬度转地址（逆地理编码）
    :param lon: 经度
    :param lat: 纬度
    :return: 字典（包含状态、地址、精度等信息）
    """
    params = {
        "key": AMAP_API_KEY,
        "location": f"{lon},{lat}",
        "output": "json",
        "radius": 1000,  # 搜索半径（米），可根据需求调整
        "extensions": "all"  # 返回全部信息（包括POI）
    }
    try:
        response = requests.get(REGEOCODE_URL, params=params, timeout=10)
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "1" and "regeocode" in result:
            regeocode = result["regeocode"]
            return {
                "success": True,
                "formatted_address": regeocode.get("formatted_address", ""),
                "province": regeocode.get("addressComponent", {}).get("province", ""),
                "city": regeocode.get("addressComponent", {}).get("city", ""),
                "district": regeocode.get("addressComponent", {}).get("district", ""),
                "township": regeocode.get("addressComponent", {}).get("township", ""),
                "neighborhood": regeocode.get("addressComponent", {}).get("neighborhood", {}).get("name", ""),
                "building": regeocode.get("addressComponent", {}).get("building", {}).get("name", ""),
                "precision": result.get("info", "精确")  # 匹配精度
            }
        else:
            return {
                "success": False,
                "error": f"坐标解析失败：{result.get('info', '未知错误')}"
            }
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"网络请求错误：{str(e)}"}
    except Exception as e:
        return {"success": False, "error": f"解析失败：{str(e)}"}


import sys
import json
from argparse import ArgumentParser

def main():
    """主交互逻辑"""
    parser = ArgumentParser(description="地图服务命令行工具")
    parser.add_argument('--mode', required=True, help='操作模式: geocode, reverse_geocode')
    parser.add_argument('--address', help='地址字符串（geocode模式）')
    parser.add_argument('--lon', type=float, help='经度（reverse_geocode模式）')
    parser.add_argument('--lat', type=float, help='纬度（reverse_geocode模式）')
    parser.add_argument('--city', help='城市名称（geocode模式，可选）')
    
    args = parser.parse_args()
    
    if args.mode == "geocode":
        if not args.address:
            print(json.dumps({"error": "缺少地址参数"}))
            return
        
        # 检查是否为坐标格式
        is_coord, lon, lat = is_coordinate(args.address)
        if is_coord:
            # 如果是坐标格式，直接返回坐标信息
            result = {
                "success": True,
                "location": f"{lon},{lat}",
                "province": "",
                "city": "",
                "district": "",
                "formatted_address": f"坐标: {lon},{lat}",
                "precision": "坐标输入"
            }
            print(json.dumps(result, ensure_ascii=False))
        else:
            # 否则按地址处理
            result = address_to_coordinate(args.address, args.city)
            print(json.dumps(result, ensure_ascii=False))
        
    elif args.mode == "reverse_geocode":
        if args.lon is None or args.lat is None:
            print(json.dumps({"error": "缺少经纬度参数"}))
            return
        try:
            result = coordinate_to_address(args.lon, args.lat)
            print(json.dumps(result, ensure_ascii=False))
        except ValueError:
            print(json.dumps({"error": "经纬度参数格式错误"}))
            
    else:
        print(json.dumps({"error": f"不支持的模式: {args.mode}"}))


if __name__ == "__main__":
    main()