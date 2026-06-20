import json

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            # Check if trust-section is anywhere in the string representation of data
            if 'trust-section' in str(data):
                print(f"Found 'trust-section' in step {step_index}")
        except Exception as e:
            pass
