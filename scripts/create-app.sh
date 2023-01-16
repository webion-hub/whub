cp -r ./scripts/templates/app ./apps/$1

cd apps
cd $1

tmp=$(mktemp)
jq '.scripts.dev = "next dev --port '$2'"' package.json > "$tmp" && mv "$tmp" package.json
jq '.name = "'$1'"' package.json > "$tmp" && mv "$tmp" package.json

pnpm i