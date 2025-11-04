from __future__ import annotations
import json
from pathlib import Path


def flatten(obj, prefix="") -> dict[str, str]:
    items: dict[str, str] = {}
    if isinstance(obj, dict):
        for key, value in obj.items():
            new_prefix = f"{prefix}.{key}" if prefix else key
            items.update(flatten(value, new_prefix))
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            new_prefix = f"{prefix}[{index}]"
            items.update(flatten(value, new_prefix))
    else:
        items[prefix] = obj
    return items


def main() -> None:
    en_path = Path("src/messages/en.json")
    ar_path = Path("src/messages/ar.json")

    en_data = json.loads(en_path.read_text(encoding="utf-8"))
    ar_data = json.loads(ar_path.read_text(encoding="utf-8"))

    en_flat = flatten(en_data)
    ar_flat = flatten(ar_data)

    missing = sorted(set(en_flat) - set(ar_flat))
    extra = sorted(set(ar_flat) - set(en_flat))

    print(f"English entries: {len(en_flat)}")
    print(f"Arabic entries: {len(ar_flat)}")
    print(f"Missing translations: {len(missing)}")
    print(f"Extra translations: {len(extra)}")

    if missing:
        print("\nMissing keys:")
        for key in missing[:100]:
            print(key)
    if extra:
        print("\nExtra keys:")
        for key in extra[:100]:
            print(key)


if __name__ == "__main__":
    main()
