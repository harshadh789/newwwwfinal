import json
import re

missing_css_steps = [
    319, 340, 346, 423, 707, 751, 754, 760, 769, 817, 820, 823, 829, 851, 871, 886, 901, 964, 979, 1032, 1065, 1083, 1096, 1143, 1256, 1270, 1366, 1369, 1414, 1463, 1532, 1550, 1553, 1607, 1616, 1679, 1685, 1700, 1760, 1796, 1817, 1838, 1907, 1961, 1967, 1985, 1997, 2138, 2279, 2487, 2505, 2508, 2526, 2620, 2623, 2626, 2635, 2939, 3065, 3444, 3767, 3949, 3958, 3976, 4006, 4186, 4288, 4646, 4703
]

missing_multi_steps = [
    "1120.0", "1120.1", "1120.2", "1158.0", "1158.1", "1158.2", "1170.0", "1170.1", "1229.0", "1229.1", "1229.2", "1229.3", "1229.4", "1241.0", "1241.1", "1250.0", "1250.1", "1250.2", "1250.3", "1250.4", "1250.5", "1312.0", "1312.1", "1312.2", "1327.0", "1327.1", "1327.2", "1354.0", "1354.1", "1411.0", "1411.1", "1432.0", "1432.1", "1469.0", "1469.1", "1583.0", "1583.1", "1646.0", "1646.1", "1646.2", "2081.0", "2081.1", "2081.2", "2183.1", "2183.2", "2231.0", "2231.1", "3297.0", "3297.1", "3321.0", "3321.1", "3352.0", "3352.1", "4165.0", "4216.0", "4216.1", "4216.2", "4354.0", "4415.0", "4471.0"
]

missing_css_content = []

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
                    if name == 'replace_file_content' and step_index in missing_css_steps:
                        r = args.get('ReplacementContent', '').strip('"').replace('\\n', '\n').replace('\\"', '"')
                        missing_css_content.append(f"/* Added from step {step_index} */\n" + r)
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            chunks = json.loads(chunks.strip('"').replace('\\"', '"'))
                        for i, chunk in enumerate(chunks):
                            step_id = f"{step_index}.{i}"
                            if step_id in missing_multi_steps:
                                r = chunk.get('ReplacementContent', '').strip('"').replace('\\n', '\n').replace('\\"', '"')
                                missing_css_content.append(f"/* Added from step {step_id} */\n" + r)
        except Exception as e:
            pass

# Add intent and trust
missing_css_content.append("""
/* Intent Section (Who's coming with you) */
.intent-section {
  padding: 5rem 0;
  background: var(--bg);
}
.intent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}
.intent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  color: var(--ink);
}
.intent-card svg {
  color: var(--brand);
  margin-bottom: 1rem;
}
.intent-card h3 {
  margin: 0 0 0.2rem;
  font-size: 1.25rem;
  font-weight: 700;
}
.intent-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
}
.intent-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand);
  box-shadow: 0 12px 24px rgba(0, 96, 96, 0.08);
}

/* Trust Section */
.trust-section {
  padding: 4rem 0;
  background: var(--surface);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.trust-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
}
.trust-card svg {
  color: var(--brand);
  margin-bottom: 1rem;
}
.trust-card h4 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
}
.trust-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
}

/* Tourism Partners */
.tourism-partners {
  padding: 3rem 0;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
.partners-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}
.partners-label {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.partners-logos {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.partner-logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: #a0aab2;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
""")

with open("recovered_styles_4810.css", "r") as f:
    base_css = f.read()

with open("styles.css", "w") as f:
    f.write(base_css + "\n\n" + "\n\n".join(missing_css_content))

print(f"Appended {len(missing_css_content)} chunks to styles.css!")
