import json
with open("/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("step_index") == 346:
                for call in data.get("tool_calls", []):
                    if call.get("name") == "replace_file_content":
                        repl = call.get("args", {}).get("ReplacementContent", "")
                        if isinstance(repl, str) and repl.startswith('"'):
                            repl = json.loads(repl)
                        print(repl[:100])
                        print("...")
                        print(repl[-100:])
        except:
            pass
