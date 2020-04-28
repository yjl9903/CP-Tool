import Path from 'path';

import { ConfigPath, readFile, writeFile } from '../utils';

export async function load(name: string) {
  const text = await readFile(Path.join(ConfigPath, 'code', name));
  await writeFile(name, text);
  return text;
}

export async function store(name: string) {
  const text = await readFile(name);
  await writeFile(Path.join(ConfigPath, 'code', name), text);
  return text;
}

export async function listCode() {}
