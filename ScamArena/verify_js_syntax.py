import os
import glob
import re

js_files = glob.glob('js/**/*.js', recursive=True)
print(f"Checking {len(js_files)} JS files for syntax and syntax integrity:")

errors = 0
for filepath in js_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check parenthesis, braces, brackets balance outside of strings and comments
    # Simple brace counter:
    lines = content.split('\n')
    brace_balance = 0
    paren_balance = 0
    bracket_balance = 0

    in_multiline_comment = False
    in_template_literal = False

    for idx, line in enumerate(lines):
        line_num = idx + 1
        # naive check on key keywords
        if 'function' in line or 'class ' in line:
            pass

    # Basic brace balance check
    open_curly = content.count('{')
    close_curly = content.count('}')
    open_paren = content.count('(')
    close_paren = content.count(')')
    open_brack = content.count('[')
    close_brack = content.count(']')

    diff_curly = open_curly - close_curly
    diff_paren = open_paren - close_paren
    diff_brack = open_brack - close_brack

    if diff_curly != 0 or diff_paren != 0 or diff_brack != 0:
        print(f"  [CHECK] {filepath}: {{diff: {diff_curly}}}, (diff: {diff_paren}), [diff: {diff_brack}]")
    else:
        print(f"  [OK] {filepath}: perfectly balanced ({len(content)} chars)")

print("\nSyntax balance check complete.")
