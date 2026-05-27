"""
Extract snake_info INSERTs from sl2026518.sql and convert to explicit-column format.
"""
import sys

with open('sl2026518.sql', 'r', encoding='utf-8') as f:
    content = f.read()

INSERT_MARKER = 'INSERT INTO `snake_info` VALUES'

# The INSERTs have 12 columns (rest get defaults):
# 0:snake_id  1:snake_name  2:family  3:genus  4:latin_name
# 5:characteristics  6:toxicity_level  7:toxin_type  8:danger_level
# 9:habitat_info  10:distribution  11:conservation_status

TARGET_COLS = [
    'snake_id', 'snake_name', 'family', 'genus', 'latin_name',
    'characteristics', 'toxicity_level', 'toxin_type', 'danger_level',
    'habitat_info', 'distribution', 'conservation_status'
]

def find_insert_blocks(text):
    """Find all INSERT INTO snake_info VALUES (...) blocks using paren-depth tracking."""
    blocks = []
    pos = 0
    while True:
        idx = text.find(INSERT_MARKER, pos)
        if idx == -1:
            break
        paren_start = text.find('(', idx)
        if paren_start == -1:
            break

        depth = 0
        i = paren_start
        in_string = False
        string_char = None
        while i < len(text):
            ch = text[i]
            if in_string:
                if ch == '\\':
                    i += 2
                    continue
                if ch == string_char:
                    in_string = False
            else:
                if ch in ("'", '"'):
                    in_string = True
                    string_char = ch
                elif ch == '(':
                    depth += 1
                elif ch == ')':
                    depth -= 1
                    if depth == 0:
                        block = text[paren_start+1:i]
                        blocks.append(block)
                        pos = i + 1
                        break
            i += 1
        else:
            break
    return blocks

def split_values(block):
    """Split block into column values, handling strings with commas and parens."""
    values = []
    current = []
    in_string = False
    string_char = None

    for ch in block:
        if in_string:
            current.append(ch)
            if ch == '\\':
                continue
            if ch == string_char:
                in_string = False
        else:
            if ch in ("'", '"'):
                in_string = True
                string_char = ch
                current.append(ch)
            elif ch == ',':
                values.append(''.join(current).strip())
                current = []
            else:
                current.append(ch)

    if current:
        values.append(''.join(current).strip())
    return values

blocks = find_insert_blocks(content)
print(f"Found {len(blocks)} INSERT blocks (expected 204)")

col_list = ", ".join(f"`{c}`" for c in TARGET_COLS)

output_lines = [
    "-- Restored snake_info data from sl2026518.sql",
    f"-- {len(blocks)} records with explicit column names",
    "",
    "SET NAMES utf8mb4;",
    ""
]

successful = 0
for block in blocks:
    values = split_values(block)

    if len(values) < 12:
        print(f"  SKIP: got {len(values)} cols. Sample: {block[:100]}", file=sys.stderr)
        continue

    # Only take first 12 values (skip trailing DEFAULT-placeholder columns if any)
    vals_12 = values[:12]

    # Remove snake_id values that are 0 or empty (skip invalid rows)
    # Keep all valid rows

    sql = f"INSERT INTO `snake_info` ({col_list}) VALUES ({', '.join(vals_12)});"
    output_lines.append(sql)
    successful += 1

output_lines.append(f"\n-- Done: {successful} records")

with open('snake_info_restore.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print(f"Written {successful} records → snake_info_restore.sql")
