import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index == 5071:
                with open('step_5071_full.json', 'w') as out:
                    json.dump(data, out, indent=2)
        except Exception as e:
            pass
