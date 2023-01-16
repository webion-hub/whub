cd apps/$1

tmp=$(mktemp)
jq 'del(.dependencies.'$2')' package.json > "$tmp" && mv "$tmp" package.json
pnpm i