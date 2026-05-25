import requests
import re
import os

# 高德地图API配置 - 从环境变量获取API Key，兼容旧方式
AMAP_API_KEY = os.getenv("AMAP_API_KEY", "6b27e2cf049182541e6f659eacf63d89")
# 地理编码/逆地理编码API
GEOCODE_URL = "https://restapi.amap.com/v3/geocode/geo"
REGEOCODE_URL = "https://restapi.amap.com/v3/geocode/regeo"
# 路径规划API
DRIVING_URL = "https://restapi.amap.com/v3/direction/driving"
WALKING_URL = "https://restapi.amap.com/v3/direction/walking"


def is_coordinate(input_str):
    """判断输入是否为经纬度坐标（支持 116.481,39.921 或 116.481 39.921 格式）"""
    pattern = r'^(\d{1,3}\.\d+)\s*[,，\s]\s*(\d{1,3}\.\d+)$'
    match = re.match(pattern, input_str.strip())
    if match:
        try:
            lon = float(match.group(1))
            lat = float(match.group(2))
            if -180 <= lon <= 180 and -90 <= lat <= 90:
                return True, lon, lat
        except ValueError:
            pass
    return False, None, None


def address_to_coordinate(address, city=None):
    """地址转经纬度（增强异常处理和校验）"""
    params = {
        "key": AMAP_API_KEY,
        "address": address,
        "output": "json"
    }
    
    # 如果提供了城市参数，则使用城市参数提升解析精度
    if city:
        params["city"] = city
    try:
        response = requests.get(GEOCODE_URL, params=params, timeout=10)
        response.raise_for_status()
        result = response.json()

        # 校验API返回状态
        if result.get("status") != "1":
            return False, None, None, f"API返回错误：{result.get('info', '未知错误')}", None

        geocodes = result.get("geocodes", [])
        if not geocodes:
            return False, None, None, "未查询到该地址的坐标信息", None

        # 提取并校验经纬度
        loc = geocodes[0].get("location", "")
        if not loc or "," not in loc:
            return False, None, None, "地址解析返回无效坐标格式", None

        lon_str, lat_str = loc.split(",", 1)
        try:
            lon = float(lon_str.strip())
            lat = float(lat_str.strip())
        except ValueError:
            return False, None, None, "坐标转换为数字失败", None

        # 最终校验经纬度范围
        if not (-180 <= lon <= 180 and -90 <= lat <= 90):
            return False, None, None, "经纬度超出合法范围", None

        # 返回结构化地址信息
        geocode_info = geocodes[0]
        return True, lon, lat, "解析成功", geocode_info
    except requests.exceptions.RequestException as e:
        return False, None, None, f"网络请求错误：{str(e)}", None
    except Exception as e:
        return False, None, None, f"解析异常：{str(e)}", None


def coordinate_to_address(lon, lat):
    """经纬度转地址（仅用于展示）"""
    if lon is None or lat is None:
        return "无效坐标"
    params = {
        "key": AMAP_API_KEY,
        "location": f"{lon},{lat}",
        "output": "json",
        "radius": 1000,
        "extensions": "base"
    }
    try:
        response = requests.get(REGEOCODE_URL, params=params, timeout=10)
        response.raise_for_status()
        result = response.json()
        if result.get("status") == "1":
            return result["regeocode"].get("formatted_address", "未知地址")
        return "地址解析失败"
    except Exception:
        return "未知地址"


def decode_polyline(polyline_str):
    """
    解析高德API返回的polyline格式（直接坐标对格式）
    高德API返回的polyline是"经度,纬度;经度,纬度"格式的字符串，无需解码
    例如: "106.945275,27.70669;106.94522,27.706698"
    """
    try:
        if not polyline_str or not isinstance(polyline_str, str):
            return []
        
        # 按分号分割坐标对
        coord_pairs = polyline_str.split(';')
        coordinates = []
        
        for pair in coord_pairs:
            if ',' in pair:
                lon_str, lat_str = pair.split(',', 1)  # 只按第一个逗号分割
                try:
                    lon = float(lon_str.strip())
                    lat = float(lat_str.strip())
                    # 保留6位小数提升精度
                    coordinates.append([round(lon, 6), round(lat, 6)])
                except ValueError:
                    # 如果转换失败，跳过该坐标对
                    continue
        
        return coordinates
    except Exception as e:
        print(f"Polyline解析失败：{e}")
        return []


def get_driving_route(start_lon, start_lat, end_lon, end_lat, strategy=0):
    """获取驾车路线规划（新增：解析polyline轨迹坐标）"""
    # 先校验坐标有效性
    if None in [start_lon, start_lat, end_lon, end_lat]:
        return {"success": False, "error": "起点/终点坐标无效"}

    strategy_map = {
        0: "默认路线",
        1: "高速优先",
        2: "国道优先",
        3: "不走高速",
        4: "避免收费",
        5: "不走高速+避免收费"
    }
    params = {
        "key": AMAP_API_KEY,
        "origin": f"{start_lon:.6f},{start_lat:.6f}",  # 保留6位小数，避免精度问题
        "destination": f"{end_lon:.6f},{end_lat:.6f}",
        "output": "json",
        "strategy": strategy,
        "extensions": "all",  # 必须为all，才能返回polyline字段
        "city": "遵义"  # 指定城市，提升路线精度
    }
    try:
        response = requests.get(DRIVING_URL, params=params, timeout=15)
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "1" and "route" in result and result["route"].get("paths"):
            route = result["route"]["paths"][0]
            steps = []
            total_path = []  # 存储完整的路线轨迹坐标（所有步骤的坐标拼接）

            for step in route["steps"]:
                # 解码当前步骤的polyline坐标
                step_polyline = step.get("polyline", "")
                step_coords = decode_polyline(step_polyline) if step_polyline else []
                # 拼接总轨迹
                total_path.extend(step_coords)

                steps.append({
                    "instruction": step["instruction"],
                    "road": step.get("road", ""),
                    "distance": step["distance"],
                    "duration": step["duration"],
                    "polyline": step_coords  # 可选：返回单步轨迹
                })

            return {
                "success": True,
                "strategy": strategy_map[strategy],
                "total_distance": f"{round(float(route['distance']) / 1000, 2)}公里",
                "total_duration": f"{round(float(route['duration']) / 60, 1)}分钟",
                "total_toll": f"{route.get('toll', 0)}元",
                "steps": steps,
                "start": [start_lon, start_lat],  # 起点坐标
                "end": [end_lon, end_lat],        # 终点坐标
                "path_coords": total_path         # 核心：完整路线轨迹坐标（非直线）
            }
        return {"success": False, "error": f"驾车路线规划失败：{result.get('info', '未知错误')}"}
    except Exception as e:
        return {"success": False, "error": f"驾车路线请求错误：{str(e)}"}


def get_walking_route(start_lon, start_lat, end_lon, end_lat):
    """获取步行路线规划（新增：解析polyline轨迹坐标）"""
    # 先校验坐标有效性
    if None in [start_lon, start_lat, end_lon, end_lat]:
        return {"success": False, "error": "起点/终点坐标无效"}

    params = {
        "key": AMAP_API_KEY,
        "origin": f"{start_lon:.6f},{start_lat:.6f}",
        "destination": f"{end_lon:.6f},{end_lat:.6f}",
        "output": "json",
        "extensions": "all",  # 必须为all，才能返回polyline字段
        "city": "遵义"
    }
    try:
        response = requests.get(WALKING_URL, params=params, timeout=15)
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "1" and "route" in result and result["route"].get("paths"):
            route = result["route"]["paths"][0]
            steps = []
            total_path = []  # 存储完整的路线轨迹坐标

            for step in route["steps"]:
                # 解码当前步骤的polyline坐标
                step_polyline = step.get("polyline", "")
                step_coords = decode_polyline(step_polyline) if step_polyline else []
                total_path.extend(step_coords)

                steps.append({
                    "instruction": step["instruction"],
                    "road": step.get("road", ""),
                    "distance": step["distance"],
                    "duration": step["duration"],
                    "polyline": step_coords  # 可选：返回单步轨迹
                })

            return {
                "success": True,
                "total_distance": f"{round(float(route['distance']) / 1000, 2)}公里",
                "total_duration": f"{round(float(route['duration']) / 60, 1)}分钟",
                "steps": steps,
                "start": [start_lon, start_lat],  # 起点坐标
                "end": [end_lon, end_lat],        # 终点坐标
                "path_coords": total_path         # 核心：完整路线轨迹坐标
            }
        return {"success": False, "error": f"步行路线规划失败：{result.get('info', '未知错误')}"}
    except Exception as e:
        return {"success": False, "error": f"步行路线请求错误：{str(e)}"}


def parse_input_location(input_str, prompt, default_city="遵义"):
    """解析用户输入的起点/终点（增强容错）"""
    while True:
        user_input = input(prompt).strip()
        if not user_input:
            print("输入不能为空，请重新输入！")
            continue

        # 第一步：判断是否为坐标
        is_coord, lon, lat = is_coordinate(user_input)
        if is_coord:
            addr = coordinate_to_address(lon, lat)
            print(f"✅ 解析到坐标：{lon:.6f},{lat:.6f} → 对应地址：{addr}")
            return lon, lat

        # 第二步：按地址解析（指定城市提升精度）
        success, lon, lat, msg, geocode_info = address_to_coordinate(user_input)
        if success:
            print(f"✅ 解析到地址：{user_input} → 对应坐标：{lon:.6f},{lat:.6f}")
            return lon, lat
        else:
            print(f"❌ 地址解析失败：{msg}，请重新输入！")


import sys
import json
from argparse import ArgumentParser

def main():
    """主交互逻辑"""
    parser = ArgumentParser(description="路线规划服务命令行工具")
    parser.add_argument('--mode', required=True, help='操作模式: geocode, driving_route, walking_route')
    parser.add_argument('--address', help='地址（geocode模式）')
    parser.add_argument('--city', help='城市（geocode模式）')
    parser.add_argument('--start_lon', type=float, help='起点经度')
    parser.add_argument('--start_lat', type=float, help='起点纬度')
    parser.add_argument('--end_lon', type=float, help='终点经度')
    parser.add_argument('--end_lat', type=float, help='终点纬度')
    parser.add_argument('--strategy', type=int, default=0, help='路线策略（驾车）')
    
    args = parser.parse_args()
    
    # 新增：地址解析模式（geocode）
    if args.mode == "geocode":
        if not args.address:
            print(json.dumps({"success": False, "error": "缺少地址参数"}))
            return
        success, lon, lat, msg, geocode_info = address_to_coordinate(args.address, args.city)
        if success:
            addr_detail = coordinate_to_address(lon, lat)
            # 使用高德返回的结构化地址信息
            province = geocode_info.get("province", "") if geocode_info else ""
            city = geocode_info.get("city", "") if geocode_info else ""
            district = geocode_info.get("district", "") if geocode_info else ""
            print(json.dumps({
                "success": True,
                "location": f"{lon:.6f},{lat:.6f}",
                "province": province,
                "city": city,
                "district": district,
                "formatted_address": addr_detail,
                "precision": ""
            }, ensure_ascii=False))
        else:
            print(json.dumps({"success": False, "error": msg}, ensure_ascii=False))
        return
    
    elif args.mode == "driving_route":
        if args.start_lon is None or args.start_lat is None or args.end_lon is None or args.end_lat is None:
            print(json.dumps({"success": False, "error": "缺少驾车路线参数"}))
            return
        try:
            route_result = get_driving_route(args.start_lon, args.start_lat, args.end_lon, args.end_lat, args.strategy)
            print(json.dumps(route_result, ensure_ascii=False))
        except ValueError:
            result = {"success": False, "error": "参数格式错误"}
            print(json.dumps(result, ensure_ascii=False))
    
    elif args.mode == "walking_route":
        if args.start_lon is None or args.start_lat is None or args.end_lon is None or args.end_lat is None:
            print(json.dumps({"success": False, "error": "缺少步行路线参数"}))
            return
        try:
            route_result = get_walking_route(args.start_lon, args.start_lat, args.end_lon, args.end_lat)
            print(json.dumps(route_result, ensure_ascii=False))
        except ValueError:
            result = {"success": False, "error": "参数格式错误"}
            print(json.dumps(result, ensure_ascii=False))
    
    else:
        result = {"success": False, "error": f"不支持的模式: {args.mode}"}
        print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()