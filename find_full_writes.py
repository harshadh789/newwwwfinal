import json

index_path = "/Users/campfly/Downloads/campfly-landing-page-main/index.html"
styles_path = "/Users/campfly/Downloads/campfly-landing-page-main/styles.css"

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                filepath = args.get('TargetFile', '').strip('"')
                
                if filepath in [index_path, styles_path] and name == 'write_to_file':
                    print(f"Step {step_index}: Full write to {filepath.split('/')[-1]}")
        except Exception as e:
            pass
