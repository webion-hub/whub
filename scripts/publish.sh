python3 ./scripts/mk_pkgjson.py packages/ui/
python3 ./scripts/mk_pkgjson.py packages/api/
turbo run build && changeset version && changeset publish
python3 ./scripts/rm_pkgjson.py packages/ui/
python3 ./scripts/rm_pkgjson.py packages/api/
