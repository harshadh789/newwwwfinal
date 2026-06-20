import json

found = False
with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                content = data.get('content', '')
                if 'more advanced for Traveler Reviews' in content or 'reviews' in content.lower():
                    pass
            if data.get('type') == 'TOOL_RESPONSE':
                content = data.get('content', '')
                if 'review-card' in content and 'class=' in content:
                    print(f"Found review-card at step {data.get('step_index')}")
                    with open(f"reviews_step_{data.get('step_index')}.txt", 'w') as out:
                        out.write(content)
        except Exception as e:
            pass
