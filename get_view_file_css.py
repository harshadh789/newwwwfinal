import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            source = data.get('source')
            if source == 'SYSTEM':
                content = data.get('content', '')
                if 'styles.css' in content and 'File Path:' in content:
                    step = data.get('step_index')
                    print(f"Found styles.css view at step {step}, size: {len(content)}")
                    with open(f"view_css_{step}.txt", "w") as out:
                        out.write(content)
        except Exception as e:
            pass
