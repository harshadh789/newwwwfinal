import json
with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        try:
            data = json.loads(line)
            if data.get('step_index') == 7 and data.get('type') == 'TOOL_RESPONSE':
                print(data.get('content'))
                with open('original_index.html.txt', 'w') as out:
                    out.write(data.get('content'))
                break
        except:
            pass
