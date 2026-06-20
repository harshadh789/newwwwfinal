import json
with open("/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("step_index") == 70:
                for call in data.get("tool_calls", []):
                    if call.get("name") == "write_to_file":
                        c = call.get("args", {}).get("CodeContent", "")
                        print(len(c))
        except:
            pass
