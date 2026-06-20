import json

# Start from the base CSS
with open("styles.css.orig", "r") as f:
    content = f.read()

applied_count = 0
failed_count = 0

with open('/Users/campfly/.gemini/antigravity-ide/brain/7f3c0de9-1734-4e27-b47a-c45c4bfab658/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step_index = data.get('step_index')
            if step_index > 5389:
                break
                
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                filepath = args.get('TargetFile', '')
                if 'styles.css' in filepath:
                    if name == 'replace_file_content':
                        target = args.get('TargetContent', '')
                        if isinstance(target, str) and target.startswith('"') and target.endswith('"'):
                            target = json.loads(target)
                        repl = args.get('ReplacementContent', '')
                        if isinstance(repl, str) and repl.startswith('"') and repl.endswith('"'):
                            repl = json.loads(repl)
                            
                        if target in content:
                            content = content.replace(target, repl, 1)
                            applied_count += 1
                        else:
                            # Try replacing without strict newlines just in case
                            target_norm = target.replace('\r\n', '\n')
                            if target_norm in content:
                                content = content.replace(target_norm, repl, 1)
                                applied_count += 1
                            else:
                                failed_count += 1
                                print(f"Target NOT FOUND at step {step_index}!")
                                
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            chunks = json.loads(chunks)
                        for i, chunk in enumerate(chunks):
                            target = chunk.get('TargetContent', '')
                            repl = chunk.get('ReplacementContent', '')
                            if target in content:
                                content = content.replace(target, repl, 1)
                                applied_count += 1
                            else:
                                failed_count += 1
                                print(f"Multi Target NOT FOUND at step {step_index}.{i}!")
                                
                    elif name == 'write_to_file': # include step 70!
                        code = args.get('CodeContent', '')
                        if isinstance(code, str) and code.startswith('"') and code.endswith('"'):
                            code = json.loads(code)
                        content = code
                        print(f"Overwritten by write_to_file at step {step_index}")
        except Exception as e:
            pass

with open("perfect_styles.css", "w") as f:
    f.write(content)

print(f"Rebuild complete! Applied {applied_count}, Failed {failed_count}. Output size: {len(content)}")
