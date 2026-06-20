import json

index_path = "/Users/campfly/Downloads/campfly-landing-page-main/index.html"
styles_path = "/Users/campfly/Downloads/campfly-landing-page-main/styles.css"

with open("downloaded_index.html", "r") as f:
    idx_content = f.read()

with open("styles.css.orig", "r") as f:
    css_content = f.read()

def apply_replacement(content, target, replacement, allow_multiple, step, file_name):
    # Strip quotes if they exist in target/replacement from JSON parsing quirks
    if isinstance(target, str) and target.startswith('"') and target.endswith('"'):
        target = target[1:-1]
    if isinstance(replacement, str) and replacement.startswith('"') and replacement.endswith('"'):
        replacement = replacement[1:-1]
        
    # Unescape newlines because the JSON string might literally contain "\n" instead of actual newlines
    target = target.replace('\\n', '\n').replace('\\"', '"')
    replacement = replacement.replace('\\n', '\n').replace('\\"', '"')

    if target not in content:
        print(f"Step {step} [{file_name}]: Target NOT FOUND! len: {len(target)}")
        return content

    if allow_multiple:
        return content.replace(target, replacement)
    else:
        return content.replace(target, replacement, 1)

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
            if step_index > 4810: # Stop at step 4810
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
                        if isinstance(am, str): am = (am.lower() == 'true')
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
                        if isinstance(am, str): am = (am.lower() == 'true')
                        css_content = apply_replacement(css_content, t, r, am, step_index, 'styles.css')
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            chunks = json.loads(chunks.strip('"').replace('\\"', '"'))
                        css_content = apply_chunks(css_content, chunks, step_index, 'styles.css')
        except Exception as e:
            pass

with open("proper_recovered_index.html", "w") as f:
    f.write(idx_content)

with open("proper_recovered_styles.css", "w") as f:
    f.write(css_content)

print(f"Recovered index size: {len(idx_content)}")
print(f"Recovered styles size: {len(css_content)}")
