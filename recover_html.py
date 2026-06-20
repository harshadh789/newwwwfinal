import json
import re
from pathlib import Path

transcript_path = "/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl"
dest_dir = "/Users/campfly/Downloads/campfly-landing-page-main"

files_to_recover = [
    "index.html", "packages.html", "destinations.html", "about.html", 
    "contact.html", "cancellation.html", "privacy.html", "terms.html", 
    "demo.html", "package-detail.html"
]

recovered_files = {}

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        content = data.get("content", "")
        
        for file_name in files_to_recover:
            marker = f"File Path: `file://{dest_dir}/{file_name}`"
            if marker in content:
                # Extract all lines that look like "number: text"
                lines = content.split('\n')
                file_lines = []
                for l in lines:
                    if re.match(r'^\d+: ', l):
                        file_lines.append(re.sub(r'^\d+: ', '', l))
                
                if file_lines:
                    # we prefer the one with the most lines
                    current_len = len(recovered_files.get(file_name, []))
                    if len(file_lines) > current_len:
                        recovered_files[file_name] = file_lines

for file_name, lines in recovered_files.items():
    if lines:
        out_path = Path(dest_dir) / file_name
        with open(out_path, 'w') as out_f:
            out_f.write('\n'.join(lines))
        print(f"Recovered {file_name} ({len(lines)} lines)")
