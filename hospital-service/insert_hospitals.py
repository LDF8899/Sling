import json
import requests
import mysql.connector
from mysql.connector import Error
import subprocess
import sys

def get_zunyi_hospitals():
    """获取遵义地区的医院数据"""
    try:
        # 直接执行Python脚本并获取输出
        result = subprocess.run([
            sys.executable, 
            'C:/Users/Asuka/Desktop/1/Sling/py/hospital-service-py/hospital.py',
            '--mode', 'search',
            '--lon', '107.051603',
            '--lat', '27.711226'
        ], capture_output=True, text=True, encoding='utf-8', errors='ignore')
        
        if result.returncode == 0:
            # 尝试修复编码问题
            output = result.stdout.strip()
            if output:
                try:
                    data = json.loads(output)
                    return data.get('hospitals', [])
                except json.JSONDecodeError as e:
                    print(f"JSON解析错误: {e}")
                    print(f"原始输出: {output[:500]}...")  # 只打印前500个字符
                    return []
            else:
                print("脚本返回空输出")
                return []
        else:
            print(f"脚本执行失败，返回码: {result.returncode}")
            print(f"错误输出: {result.stderr}")
            return []
    except Exception as e:
        print(f"获取医院数据时出错: {e}")
        return []

def insert_hospitals_to_db():
    """将医院数据插入数据库"""
    hospitals = get_zunyi_hospitals()
    
    if not hospitals:
        print("未能获取到医院数据，使用预定义数据")
        # 使用预定义的遵义医院数据
        hospitals = [
            {
                "name": "遵义医科大学第二附属医院",
                "longitude": 107.043478,
                "latitude": 27.694486,
                "address": "新龙大道西150米",
                "telephone": "0851-27596113;0851-27596114"
            },
            {
                "name": "遵义新蒲永康中医院",
                "longitude": 107.036984,
                "latitude": 27.705478,
                "address": "长征大道与娄山路交叉口西140米",
                "telephone": "18685202139"
            },
            {
                "name": "遵义新蒲康兴医院",
                "longitude": 107.039192,
                "latitude": 27.724318,
                "address": "播州大道与奥体路交汇处天鹅湖康郡1-2号楼",
                "telephone": "0851-28766120"
            },
            {
                "name": "新蒲瑞德医院",
                "longitude": 107.032616,
                "latitude": 27.706456,
                "address": "林达阳光新城2号楼2-3号",
                "telephone": "0851-28657120"
            },
            {
                "name": "新蒲镇卫生院接种点",
                "longitude": 107.030373,
                "latitude": 27.711373,
                "address": "新蒲镇明星路19号",
                "telephone": ""
            }
        ]
    
    try:
        # 连接数据库
        connection = mysql.connector.connect(
            host='localhost',
            database='sling',
            user='root',
            password='123456',
            charset='utf8mb4',  # 使用utf8mb4字符集
            collation='utf8mb4_unicode_ci'
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            for hospital in hospitals:
                # 清理医院名称和地址中的特殊字符
                name = hospital.get('name', '').replace('\u0000', '').replace('\u0001', '').replace('\u0002', '')
                address = hospital.get('address', '').replace('\u0000', '').replace('\u0001', '').replace('\u0002', '')
                
                # 使用INSERT IGNORE避免重复插入
                insert_query = """
                INSERT IGNORE INTO hospital_info 
                (hospital_name, address, latitude, longitude, contact_info, hospital_type, emergency_department, created_time, updated_time, del_flag) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 0)
                """
                
                # 确定医院类型
                if '中医院' in name:
                    hospital_type = '中医院'
                elif '附属医院' in name or '大学' in name:
                    hospital_type = '综合医院'
                elif '卫生院' in name or '社区' in name:
                    hospital_type = '社区医院'
                else:
                    hospital_type = '综合医院'
                
                values = (
                    name,
                    address,
                    hospital.get('latitude'),
                    hospital.get('longitude'),
                    hospital.get('telephone', ''),
                    hospital_type,
                    1  # emergency_department
                )
                
                cursor.execute(insert_query, values)
                print(f"插入医院: {name}")
            
            connection.commit()
            print(f"成功插入 {len(hospitals)} 条医院记录")
            
    except Error as e:
        print(f"数据库操作错误: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    insert_hospitals_to_db()