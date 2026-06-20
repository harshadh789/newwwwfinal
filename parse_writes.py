import json

transcript_path = "/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl"

writes = {}
with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if "tool_calls" in data:
                for call in data["tool_calls"]:
                    if call.get("function", {}).get("name") == "default_api:write_to_file":
                        args_str = call.get("function", {}).get("arguments", "{}")
                        try:
                            args = json.loads(args_str)
                            target = args.get("TargetFile", "")
                            if target.endswith('.html'):
                                writes[target] = len(args.get("CodeContent", ""))
                        except:
                            pass
        except:
            pass
            
print("Files written by AI:", writes)
