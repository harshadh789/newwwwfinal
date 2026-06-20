import json
import re

index_path = "/Users/campfly/Downloads/campfly-landing-page-main/index.html"
styles_path = "/Users/campfly/Downloads/campfly-landing-page-main/styles.css"

with open("downloaded_index.html", "r") as f:
    idx_content = f.read()

with open("styles.css.orig", "r") as f:
    css_content = f.read()

def normalize_ws(s):
    return re.sub(r'\s+', '', s)

def fuzzy_replace(content, target, replacement):
    target_norm = normalize_ws(target)
    if not target_norm:
        return content
    
    # Try direct match first
    if target in content:
        return content.replace(target, replacement, 1)
        
    # Build a regex that matches the non-whitespace characters with any whitespace in between
    # This can be slow for large targets, so we only do it if necessary.
    # To avoid regex limits, we can search manually:
    content_norm = normalize_ws(content)
    idx = content_norm.find(target_norm)
    
    if idx == -1:
        return content # Not found even with fuzzy

    # If found in normalized string, find the actual start and end in the original string
    c_idx = 0
    start_pos = -1
    for i, char in enumerate(content):
        if not char.isspace():
            if c_idx == idx:
                start_pos = i
            if c_idx == idx + len(target_norm) - 1:
                end_pos = i + 1
                return content[:start_pos] + replacement + content[end_pos:]
            c_idx += 1
            
    return content

def apply_replacement(content, target, replacement, allow_multiple, step, file_name):
    if isinstance(target, str) and target.startswith('"') and target.endswith('"'):
        target = target[1:-1]
    if isinstance(replacement, str) and replacement.startswith('"') and replacement.endswith('"'):
        replacement = replacement[1:-1]
        
    target = target.replace('\\n', '\n').replace('\\"', '"')
    replacement = replacement.replace('\\n', '\n').replace('\\"', '"')

    new_content = fuzzy_replace(content, target, replacement)
    
    if new_content == content:
        print(f"Step {step} [{file_name}]: Target NOT FOUND! len: {len(target)}")
    
    return new_content

def apply_chunks(content, chunks, step, file_name):
    for i, chunk in enumerate(chunks):
        t = chunk.get('TargetContent', '')
        r = chunk.get('ReplacementContent', '')
        am = chunk.get('AllowMultiple', False)
        content = apply_replacement(content, t, r, am, f"{step}.{i}", file_name)
    return content

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            # The target step is just before 5389 when the loading fix occurred.
            if step_index >= 5389:
                break
            
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                filepath = args.get('TargetFile', '').strip('"')
                
                if filepath == index_path:
                    if name == 'write_to_file':
                        c = args.get('CodeContent', '').strip('"').replace('\\n', '\n').replace('\\"', '"')
                        idx_content = c
                    elif name == 'replace_file_content':
                        t = args.get('TargetContent', '')
                        r = args.get('ReplacementContent', '')
                        am = args.get('AllowMultiple', False)
                        idx_content = apply_replacement(idx_content, t, r, am, step_index, 'index.html')
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            chunks = json.loads(chunks.strip('"').replace('\\"', '"'))
                        idx_content = apply_chunks(idx_content, chunks, step_index, 'index.html')
                        
                elif filepath == styles_path:
                    if name == 'write_to_file':
                        c = args.get('CodeContent', '').strip('"').replace('\\n', '\n').replace('\\"', '"')
                        css_content = c
                    elif name == 'replace_file_content':
                        t = args.get('TargetContent', '')
                        r = args.get('ReplacementContent', '')
                        am = args.get('AllowMultiple', False)
                        css_content = apply_replacement(css_content, t, r, am, step_index, 'styles.css')
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            chunks = json.loads(chunks.strip('"').replace('\\"', '"'))
                        css_content = apply_chunks(css_content, chunks, step_index, 'styles.css')
        except Exception as e:
            pass

with open("fuzzy_recovered_index.html", "w") as f:
    f.write(idx_content)

with open("fuzzy_recovered_styles.css", "w") as f:
    f.write(css_content)

print(f"Recovered index size: {len(idx_content)}")
print(f"Recovered styles size: {len(css_content)}")
