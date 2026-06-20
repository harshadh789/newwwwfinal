import json

found_demo = False
found_index = False
found_styles = False

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('content'):
                content = data['content']
                # Identifying original demo.html or index.html
                if not found_demo and 'File Path: `file:///Users/campfly/Downloads/campfly-landing-page-main/demo.html`' in content:
                    with open('original_demo.html.txt', 'w') as out:
                        out.write(content)
                    found_demo = True
                
                if not found_index and 'File Path: `file:///Users/campfly/Downloads/campfly-landing-page-main/index.html`' in content:
                    with open('original_index.html.txt', 'w') as out:
                        out.write(content)
                    found_index = True

                # Identifying styles.css
                if not found_styles and 'File Path: `file:///Users/campfly/Downloads/campfly-landing-page-main/styles.css`' in content:
                    with open('original_styles.css.txt', 'w') as out:
                        out.write(content)
                    found_styles = True
                
                if found_demo and found_index and found_styles:
                    break
        except Exception as e:
            pass

print("Recovery done.")
