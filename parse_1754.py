import json

with open("step_1754_raw.json", "r") as f:
    chunks = json.load(f)

if isinstance(chunks, str):
    chunks = json.loads(chunks)

for i, chunk in enumerate(chunks):
    t = chunk.get('TargetContent', '')
    r = chunk.get('ReplacementContent', '')
    with open(f"chunk_1754_{i}_t.txt", "w") as out:
        out.write(t)
    with open(f"chunk_1754_{i}_r.txt", "w") as out:
        out.write(r)
print(f"Parsed {len(chunks)} chunks.")
