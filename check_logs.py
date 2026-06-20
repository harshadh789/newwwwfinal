import json

transcript_path = "/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl"
dest_dir = "/Users/campfly/Downloads/campfly-landing-page-main"

files = ["index.html", "about.html", "packages.html", "contact.html", "destinations.html", "package-detail.html", "demo.html", "privacy.html", "cancellation.html", "terms.html"]

for file in files:
    lengths = []
    with open(transcript_path, 'r') as f:
        for line in f:
            if file in line:
                try:
                    data = json.loads(line)
                    content = data.get("content", "")
                    if f"File Path: `file://{dest_dir}/{file}`" in content:
                        lengths.append(len(content.split('\n')))
                except:
                    pass
    print(f"{file}: {lengths}")
