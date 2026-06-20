import os
for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r') as file:
            content = file.read()
        content = content.replace(' reveal', '').replace('reveal ', '').replace('class="reveal"', '')
        with open(f, 'w') as file:
            file.write(content)
print("Removed reveal class safely.")
