cd apps/$1

tmp=$(mktemp)
jq '.dependencies += { "'$2'": "workspace:*" }' package.json > "$tmp" && mv "$tmp" package.json
pnpm i