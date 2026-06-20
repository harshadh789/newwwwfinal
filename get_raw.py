import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index == 1754:
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    args = call.get('args', {})
                    chunks = args.get('ReplacementChunks', '')
                    with open('step_1754_raw.json', 'w') as out:
                        json.dump(chunks, out)
        except Exception as e:
            pass
