import json

with open("/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('step_index') > 450:
                break
            content = json.dumps(data)
            if "premium-hero" in content:
                print(f"Found premium-hero in step {data.get('step_index')}")
        except:
            pass
