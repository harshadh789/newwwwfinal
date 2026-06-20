import json
import os

found_step = None
with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                for call in data.get('tool_calls', []):
                    if call.get('name') == 'view_file' and 'index.html' in str(call.get('args', {})):
                        found_step = data.get('step_index')
            elif data.get('type') == 'TOOL_RESPONSE' and found_step is not None:
                content = data.get('content', '')
                if 'DOCTYPE html' in content or '<!doctype html>' in content.lower():
                    with open(f"index_restored_{found_step}.html", 'w') as out:
                        out.write(content)
                found_step = None
        except:
            pass
