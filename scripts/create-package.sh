cp -r ./scripts/templates/package ./packages/$1

declare package_json_path=./packages/$1/package.json
tmp=$(mktemp)
jq '.name = "'$1'"' $package_json_path > "$tmp" && mv "$tmp" $package_json_path
pnpm i
