import os
import sys
import logging

logging.basicConfig(
  level=logging.ERROR
)


ROOT = sys.argv[1]
DEFAULT_PACKAGE_JSON = {
  "sideEffects": False,
  "module": "./index.tsx",
  "main": "../dist/{MODULE_NAME}/index.js",
  "types": "../dist/{MODULE_NAME}/index.d.ts"
}


def main():
  logging.debug(ROOT)
  logging.debug([_ for _ in os.walk(ROOT)])

  package_dirs = (x[0] for x in os.walk(ROOT))
  for package in package_dirs:
    handle_package(package)



def handle_package(package):
  directories = (check_directory(x[0], x[1], x[2], package)
    for x in os.walk(package)
    if x[0] != package
  )
  directories = (dir
    for dir in directories
    if dir is not None
  )

  for dir in directories:
    os.remove(f'{dir}/package.json')


def check_directory(dir, dirpath, files, package):
  if dir == package:
    return 
  
  if 'node_modules' in dir:
    return
  
  if 'dist' in dir:
    return

  print(dir)
  has_package_json = any(f for f in files if 'package.json' in f)
  if has_package_json:
    return dir


if __name__ == '__main__':
  main()


#os.listdir(directories[1])
