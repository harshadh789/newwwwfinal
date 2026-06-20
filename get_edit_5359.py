import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index == 5359:
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    args = call.get('args', {})
                    r = args.get('ReplacementContent', '')
                    print("REPLACEMENT CONTENT AT 5359:")
                    print(r[:500])
                    with open('advanced_reviews.html', 'w') as out:
                        out.write(r.replace('\\n', '\n').replace('\\"', '"'))
        except Exception as e:
            pass
