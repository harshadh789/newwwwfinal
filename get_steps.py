import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_idx = data.get('step_index')
            if 4770 <= step_idx <= 4805:
                if data.get('type') == 'PLANNER_RESPONSE':
                    calls = data.get('tool_calls', [])
                    for call in calls:
                        print(f"Step {step_idx} Call: {call.get('name')} Args: {str(call.get('args', {}))[:100]}")
        except Exception as e:
            pass
