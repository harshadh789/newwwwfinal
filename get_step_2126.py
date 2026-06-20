import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index == 2126:
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    args = call.get('args', {})
                    filepath = args.get('TargetFile', '')
                    c = args.get('CodeContent', '')
                    print("TargetFile:", filepath)
                    with open('step_2126_file.txt', 'w') as out:
                        out.write(c.replace('\\n', '\n').replace('\\"', '"'))
        except Exception as e:
            pass
