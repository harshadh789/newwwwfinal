import json

transcript_path = "/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl"
with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("step_index") == 4974:
                content = data.get("content", "")
                print(f"Step 4974 content length: {len(content)}")
                lines = content.split('\n')
                print(f"Total lines: {len(lines)}")
                # Print first 5 and last 5 lines
                for l in lines[:5]: print(l)
                print("...")
                for l in lines[-5:]: print(l)
        except Exception as e:
            pass
