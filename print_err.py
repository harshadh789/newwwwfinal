import json

steps_to_extract = [319, 346]
blocks = []

with open("/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index in steps_to_extract:
                for call in data.get("tool_calls", []):
                    if call.get("name") == "replace_file_content":
                        args = call.get("args")
                        if isinstance(args, str):
                            args = json.loads(args)
                        try:
                            repl = args.get("ReplacementContent", "")
                            if isinstance(repl, str) and repl.startswith('"'):
                                repl = json.loads(repl)
                            print(f"Success for step {step_index}! length: {len(repl)}")
                        except Exception as e:
                            print(f"Error extracting repl for step {step_index}: {e}")
        except Exception as e:
            print(f"Outer error: {e}")
