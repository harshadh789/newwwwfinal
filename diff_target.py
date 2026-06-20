import json

with open("styles.css.orig", "r") as f:
    orig = f.read()
    
with open("/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("step_index") == 132:
                for call in data.get("tool_calls", []):
                    if call.get("name") == "replace_file_content":
                        target = call.get("args", {}).get("TargetContent", "")
                        if isinstance(target, str) and target.startswith('"'):
                            target = json.loads(target)
                        
                        norm = target.replace('\r\n', '\n')
                        lines = norm.split('\n')
                        
                        # Find the first line that isn't in orig
                        for i, l in enumerate(lines):
                            if l not in orig:
                                print(f"Line {i} not in orig: {repr(l)}")
                                # Let's see what is around it in orig
                                prev = lines[i-1]
                                print(f"Previous line: {repr(prev)}")
                                break
        except:
            pass
