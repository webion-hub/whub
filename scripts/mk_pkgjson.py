import json
import os
import sys
import logging

logging.basicConfig(
  level=logging.ERROR
)

ROOT = sys.argv[1]
DEFAULT_PACKAGE_JSON = {
  "sideEffects": False,
  "main": "../dist/{MODULE_NAME}/index.js",
  "module": "../dist/{MODULE_NAME}/index.js",
  "types": "../dist/{MODULE_NAME}/index.d.ts"
}


def main():
  logging.debug(ROOT)
  logging.debug([_ for _ in os.walk(ROOT)])

  package_dirs = (x[0] for x in os.walk(ROOT))
  for package in package_dirs:
    handle_package(package)


def handle_package(package):
  directories = (check_directory(x[0], x[1], x[2])
    for x in os.walk(package)
    if x[0] != package
  )
  directories = (dir
    for dir in directories
    if dir is not None
  )

  for dir in directories:
    module_name = dir.split('/')[-1]
    package_json = DEFAULT_PACKAGE_JSON.copy()
    package_json['main'] = package_json['main'].replace('{MODULE_NAME}', module_name)
    package_json['module'] = package_json['module'].replace('{MODULE_NAME}', module_name)
    package_json['types'] = package_json['types'].replace('{MODULE_NAME}', module_name)

    logging.info(package_json)

    with open(f'{dir}/package.json', 'w') as f:
      f.write(json.dumps(package_json,
        indent=True,
      ))



def check_directory(dir, dirpath, files):
  logging.debug(f'Checking directory {dir}')

  if 'node_modules' in dir:
    return
  
  if 'dist' in dir:
    return

  has_index = any(f for f in files if 'index.tsx' in f)
  has_package_json = any(f for f in files if 'package.json' in f)

  if has_package_json:
    return

  if has_index:
    return dir




if __name__ == '__main__':
  main()

#os.listdir(directories[1])
