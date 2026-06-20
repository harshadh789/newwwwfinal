import json

transcript_path = "/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl"
with open(transcript_path, 'r') as f:
    for line in f:
        if "About Us | Campfly" in line:
            try:
                data = json.loads(line)
                content = data.get("content", "")
                if "About Us" in content:
                    print(f"Found match of length {len(content)}")
                    print(content[:500])
                    print("---")
            except Exception as e:
                pass
