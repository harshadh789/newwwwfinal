import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('step_index') == 70:
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    c = call.get('args', {}).get('CodeContent', '')
                    print(f"Size of CodeContent at step 70: {len(c)}")
        except Exception as e:
            pass
