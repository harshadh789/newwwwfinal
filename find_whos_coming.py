import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                args = call.get('args', {})
                filepath = args.get('TargetFile', '')
                r = args.get('ReplacementContent', '')
                if 'index.html' in filepath and isinstance(r, str) and "coming with you" in r:
                    print("Found in step:", data.get('step_index'))
                    with open(f"whos_coming_{data.get('step_index')}.html", 'w') as out:
                        out.write(r.replace('\\n', '\n').replace('\\"', '"'))
        except Exception as e:
            pass
