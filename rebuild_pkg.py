import os
import sys

# Extract template from rebuild_site.py
with open("rebuild_site.py", "r") as f:
    site_py = f.read()

head_start = site_py.find('head_content = """') + 18
head_end = site_py.find('"""', head_start)
head_content = site_py[head_start:head_end]

foot_start = site_py.find('foot_content = """') + 18
foot_end = site_py.find('"""', foot_start)
foot_content = site_py[foot_start:foot_end]

# Extract content from rewrite_pkg_detail.py
with open("rewrite_pkg_detail.py", "r") as f:
    rew_py = f.read()

main_start = rew_py.find('new_main = """') + 14
main_end = rew_py.find('"""', main_start)
main_content = rew_py[main_start:main_end]

js_start = rew_py.find('new_js = """') + 12
js_end = rew_py.find('"""', js_start)
js_content = rew_py[js_start:js_end]

# Wait, js_content already has </body></html> at the end!
# We need to strip </body></html> from js_content or from footer!
# foot_content has </body></html> at the end.
# js_content has <script>...</script></body></html>.
# So we can just use the head_content, main_content, foot_content (stripped of body html), and js_content.

html = head_content.format(title="Package Detail", desc="View the details of this amazing package.")
html += "\n" + main_content + "\n"
# foot content ends with {extra_scripts}\n  </body>\n</html>
html += foot_content.format(extra_scripts="")
# Actually, js_content is just script tags and body/html close. 
# Let's clean up foot_content
foot_clean = foot_content.replace("{extra_scripts}", "").replace("</body>", "").replace("</html>", "").strip()

html = head_content.format(title="Package Detail", desc="View the details of this amazing package.")
html += "\n" + main_content + "\n"
html += foot_clean + "\n" + js_content

with open("package-detail.html", "w") as f:
    f.write(html)
print("Rebuilt package-detail.html")
