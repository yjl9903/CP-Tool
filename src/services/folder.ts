import Path from 'path';

import { Scheme } from './type';
import { mkdir, getErrorMessage, writeFile } from '../utils';
import { getBase } from './index';
import { load } from './storage';

export async function createFile(name: string, template?: string) {
  if (template !== undefined) {
    return load(template, name);
  } else {
    return writeFile(name, '');
  }
}

export async function generateFolder(path: string, scheme: Scheme) {
  try {
    const newPath = Path.join(getBase(), path);
    await mkdir(newPath);
    const tasks: Array<Promise<any>> = [];
    const create = (scheme: Scheme) => {
      for (const item of scheme) {
        if (typeof item === 'string') {
          tasks.push(createFile(Path.join(newPath, item)));
        } else if ('children' in item) {
          create(item.children);
        } else {
          tasks.push(createFile(Path.join(newPath, item.name), item.template));
        }
      }
    };
    create(scheme);
    await Promise.all(tasks);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log(getErrorMessage(`${path} is existed`));
    } else {
      console.log(getErrorMessage(error.message || 'unknown'));
    }
  }
}