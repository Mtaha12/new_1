import json
from pathlib import Path

def load(path):
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)

def walk(prefix, en_val, ar_val, missing, extra):
    if isinstance(en_val, dict):
        if not isinstance(ar_val, dict):
            missing.append(prefix)
            return
        for key, en_child in en_val.items():
            new_prefix = f"{prefix}.{key}" if prefix else key
            if key not in ar_val:
                missing.append(new_prefix)
            else:
                walk(new_prefix, en_child, ar_val[key], missing, extra)
        for key in ar_val:
            if key not in en_val:
                new_prefix = f"{prefix}.{key}" if prefix else key
                extra.append(new_prefix)
    elif isinstance(en_val, list):
        if not isinstance(ar_val, list):
            missing.append(prefix)
            return
        for idx, en_child in enumerate(en_val):
            new_prefix = f"{prefix}[{idx}]"
            if idx >= len(ar_val):
                missing.append(new_prefix)
            else:
                walk(new_prefix, en_child, ar_val[idx], missing, extra)
        if len(ar_val) > len(en_val):
            for idx in range(len(en_val), len(ar_val)):
                extra.append(f"{prefix}[{idx}]")
    else:
        # Primitive - no action
        return

def main():
    base = Path(r"c:\\Users\\HP\\Desktop\\internship\\new_1\\src\\messages")
    en = load(base / "en.json")
    ar = load(base / "ar.json")
    missing, extra = [], []
    walk("", en, ar, missing, extra)
    print("MISSING", len(missing))
    for item in missing[:100]:
        print("M", item)
    if len(missing) > 100:
        print("...")
    print("EXTRA", len(extra))
    for item in extra[:100]:
        print("E", item)
    if len(extra) > 100:
        print("...")

if __name__ == "__main__":
    main()
