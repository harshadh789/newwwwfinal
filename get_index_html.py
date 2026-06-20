import json
import re

last_html = ""
step_num = 0
with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index > 5388:
                break
            content = data.get('content', '')
            if 'index.html`' in content and 'File Path:' in content and 'Total Lines:' in content:
                last_html = content
                step_num = step_index
        except Exception as e:
            pass

if last_html:
    print(f"Found index.html view at step {step_num}")
    lines = last_html.split('\n')
    html_lines = []
    for line in lines:
        match = re.match(r'^\d+:\s?(.*)', line)
        if match:
            html_lines.append(match.group(1))
    
    with open("last_seen_index.html", "w") as out:
        out.write("\n".join(html_lines))
    print(f"Recovered {len(html_lines)} lines")
