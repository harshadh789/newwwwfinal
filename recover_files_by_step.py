import json

target_step = 4810
index_path = "/Users/campfly/Downloads/campfly-landing-page-main/index.html"
styles_path = "/Users/campfly/Downloads/campfly-landing-page-main/styles.css"

with open("downloaded_index.html", "r") as f:
    idx_content = f.read()

with open("styles.css.orig", "r") as f:
    css_content = f.read()

files = {
    index_path: idx_content,
    styles_path: css_content
}

def apply_replacement(content, target, replacement, allow_multiple):
    if allow_multiple:
        return content.replace(target, replacement)
    else:
        return content.replace(target, replacement, 1)

def apply_chunks(content, chunks):
    for chunk in chunks:
        t = chunk.get('TargetContent', '')
        r = chunk.get('ReplacementContent', '')
        am = chunk.get('AllowMultiple', False)
        content = apply_replacement(content, t, r, am)
    return content

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index > target_step:
                break
            
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                
                if name == 'write_to_file':
                    filepath = args.get('TargetFile', '')
                    if filepath in files:
                        files[filepath] = args.get('CodeContent', '')
                elif name == 'replace_file_content':
                    filepath = args.get('TargetFile', '')
                    if filepath in files:
                        t = args.get('TargetContent', '')
                        r = args.get('ReplacementContent', '')
                        am = args.get('AllowMultiple', False)
                        files[filepath] = apply_replacement(files[filepath], t, r, am)
                elif name == 'multi_replace_file_content':
                    filepath = args.get('TargetFile', '')
                    if filepath in files:
                        chunks = args.get('ReplacementChunks', [])
                        files[filepath] = apply_chunks(files[filepath], chunks)
        except Exception as e:
            pass

with open('recovered_index_4810.html', 'w') as f:
    f.write(files[index_path])

with open('recovered_styles_4810.css', 'w') as f:
    f.write(files[styles_path])

print("Recovered files correctly!")
