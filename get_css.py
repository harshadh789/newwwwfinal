import json

css_lines = []
with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if 'styles.css`' in content and 'File Path:' in content:
                step = data.get('step_index')
                if step == 5354:
                    with open("step_5354_css.txt", "w") as out:
                        out.write(content)
        except Exception as e:
            pass

import re

with open("step_5354_css.txt", "r") as f:
    lines = f.readlines()

for line in lines:
    match = re.match(r'^\d+:\s?(.*)', line)
    if match:
        css_lines.append(match.group(1))

with open("styles_recovered.css", "w") as f:
    f.write("\n".join(css_lines))

print(f"Recovered CSS lines: {len(css_lines)}")
