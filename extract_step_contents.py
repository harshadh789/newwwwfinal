import json

def clean_lines(content):
    lines = content.splitlines()
    out_lines = []
    start_collecting = False
    for line in lines:
        if line.startswith('The following code has been modified'):
            start_collecting = True
            continue
        if line.startswith('The above content does NOT show') or line.startswith('The above content shows'):
            break
        if start_collecting:
            # Strip the line number "123: "
            if ': ' in line:
                out_lines.append(line.split(': ', 1)[1])
            else:
                out_lines.append(line)
    return '\n'.join(out_lines)

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index == 8: # demo.html
                content = data.get('content', '')
                with open('demo.html.orig', 'w') as out:
                    out.write(clean_lines(content))
        except:
            pass

print("Done extracting demo.html.orig")
