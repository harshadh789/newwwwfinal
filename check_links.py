import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                args = call.get('args', {})
                r = args.get('ReplacementContent', '')
                if isinstance(r, str) and '<link rel="stylesheet"' in r:
                    print(f"stylesheet link at step {data.get('step_index')}: {r[:100]}")
        except Exception as e:
            pass
