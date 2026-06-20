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
                        print("Exact target match?", target in orig)
                        print("Target length:", len(target))
                        print("First 50 chars of target:", repr(target[:50]))
                        
                        # Let's try replacing \r\n with \n
                        norm = target.replace('\r\n', '\n')
                        print("Norm match?", norm in orig)
                        
                        # Let's see if we can find partial matches
                        if not norm in orig:
                            lines = norm.split('\n')
                            print("First line match?", lines[0] in orig)
                            print("Last line match?", lines[-1] in orig)
        except:
            pass
