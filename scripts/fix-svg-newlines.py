#!/usr/bin/env python3
import os
import re
import glob

# Find all SVG files
svg_files = glob.glob("public/diagrams/*.svg")

for svg_file in svg_files:
    with open(svg_file, 'r') as f:
        content = f.read()
    
    # Fix the opening svg tag - remove newlines within it
    # Match from <svg to the first > (including newlines)
    def fix_svg_tag(match):
        svg_tag = match.group(0)
        # Replace newlines with spaces and normalize whitespace
        fixed_tag = re.sub(r'\n\s*', ' ', svg_tag)
        fixed_tag = re.sub(r'\s+', ' ', fixed_tag)
        return fixed_tag
    
    # Use re.DOTALL to make . match newlines - match <svg then anything (including newlines) until >
    content = re.sub(r'<svg.*?>', fix_svg_tag, content, flags=re.DOTALL, count=1)
    
    with open(svg_file, 'w') as f:
        f.write(content)
    
    print(f"Fixed: {svg_file}")

print("All SVG files have been fixed!")
