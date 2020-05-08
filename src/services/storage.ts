import Path from 'path';

import { readFile, writeFile, readDir } from '../utils';
import { ConfigPath } from './index';

export async function load(name: string, target?: string) {
  const text = await readFile(Path.join(ConfigPath, 'code', name));
  if (target !== undefined) {
    await writeFile(target, text);
  }
  return text;
}

export async function store(name: string) {
  const text = await readFile(name);
  await writeFile(Path.join(ConfigPath, 'code', name), text);
  return text;
}

export async function list() {
  return readDir(Path.join(ConfigPath, 'code'));
}
