#!/bin/bash

# Находит файлы, у которых регистр имени изменился
CHANGED=$(git diff --cached --name-only -z | xargs -0 -I {} git ls-files --stage -- {} | sort | uniq -d -f3)

if [ -n "$CHANGED" ]; then
  echo "⚠️  Found case-only renames, fixing..."

  while read -r file; do
    lowercase=$(echo "$file" | tr '[:upper:]' '[:lower:]')
    if [[ "$file" != "$lowercase" ]]; then
      temp_file="${file}_tmp_casefix"
      git mv "$file" "$temp_file"
      git mv "$temp_file" "$lowercase"
    fi
  done <<< "$CHANGED"

  git commit -m "Fix case-only filename changes"
  echo "✅ Case-sensitive changes fixed and committed."
else
  echo "✅ No case-only filename issues found."
fi
