import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                filepath = args.get('TargetFile', '')
                if 'styles.css' in filepath and name == 'write_to_file':
                    c = args.get('CodeContent', '')
                    print(f"step {data.get('step_index')}: write_to_file styles.css, size={len(c)}")
                if 'styles.css' in filepath and name == 'replace_file_content':
                    r = args.get('ReplacementContent', '')
                    print(f"step {data.get('step_index')}: replace_file_content styles.css, size={len(r)}")
        except Exception as e:
            pass
