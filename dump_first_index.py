import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE':
                content = data.get('content', '')
                if 'Campfly Holiday Packages' in content:
                    with open('very_first_index.html', 'w') as out:
                        out.write(content)
                    break
        except Exception as e:
            pass
