import json
import sys
import os

print("=== SCAM ARENA i18n LOCALE CHECKER ===")

locale_files = {
    'en': 'locales/en.json',
    'ta': 'locales/ta.json',
    'hi': 'locales/hi.json'
}

data = {}
for lang, path in locale_files.items():
    if not os.path.exists(path):
        print(f"ERROR: Locale file {path} not found!")
        sys.exit(1)
    with open(path, 'r', encoding='utf-8') as f:
        data[lang] = json.load(f)

en_keys = set(data['en'].keys())
print(f"Total English keys: {len(en_keys)}")

errors = 0
for lang in ['ta', 'hi']:
    lang_keys = set(data[lang].keys())
    missing_in_lang = en_keys - lang_keys
    extra_in_lang = lang_keys - en_keys

    if missing_in_lang:
        print(f"\n[FAIL] {lang}.json is missing {len(missing_in_lang)} keys present in en.json:")
        for k in sorted(missing_in_lang):
            print(f"  - {k}")
        errors += len(missing_in_lang)

    if extra_in_lang:
        print(f"\n[WARN] {lang}.json has {len(extra_in_lang)} extra keys not in en.json:")
        for k in sorted(extra_in_lang):
            print(f"  + {k}")

    # Check for empty strings
    empty_keys = [k for k, v in data[lang].items() if not str(v).strip()]
    if empty_keys:
        print(f"\n[FAIL] {lang}.json has empty string values for:")
        for k in empty_keys:
            print(f"  - {k}")
        errors += len(empty_keys)

if errors > 0:
    print(f"\nLOCALE CHECK FAILED WITH {errors} ERRORS.")
    sys.exit(1)
else:
    print("\nSUCCESS: All locale files have 100% key parity and no missing keys!")
    sys.exit(0)
