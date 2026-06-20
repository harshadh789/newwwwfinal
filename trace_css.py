import json

styles_path = "/Users/campfly/Downloads/campfly-landing-page-main/styles.css"
with open("styles.css.orig", "r") as f:
    css_content = f.read()

def apply_replacement(content, target, replacement, allow_multiple, step):
    if allow_multiple:
        if target not in content:
            print(f"Step {step}: Target NOT FOUND! len: {len(target)}")
            return content
        return content.replace(target, replacement)
    else:
        if target not in content:
            print(f"Step {step}: Target NOT FOUND! len: {len(target)}")
            return content
        return content.replace(target, replacement, 1)

def apply_chunks(content, chunks, step):
    for i, chunk in enumerate(chunks):
        t = chunk.get('TargetContent', '')
        r = chunk.get('ReplacementContent', '')
        am = chunk.get('AllowMultiple', False)
        content = apply_replacement(content, t, r, am, f"{step}.{i}")
    return content

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index > 4810:
                break
            
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                filepath = args.get('TargetFile', '')
                
                if filepath == styles_path:
                    if name == 'replace_file_content':
                        t = args.get('TargetContent', '')
                        r = args.get('ReplacementContent', '')
                        am = args.get('AllowMultiple', False)
                        css_content = apply_replacement(css_content, t, r, am, step_index)
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        css_content = apply_chunks(css_content, chunks, step_index)
        except Exception as e:
            pass

with open("recovered_styles_4810_traced.css", "w") as f:
    f.write(css_content)

print("Final CSS size:", len(css_content))
