import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('step_index') == 4787:
                calls = data.get('tool_calls', [])
                for call in calls:
                    with open('advanced_review_template.js', 'w') as out:
                        out.write(call.get('args', {}).get('ReplacementContent', ''))
        except Exception as e:
            pass
