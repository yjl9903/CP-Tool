import Path from 'path';
import clc from 'cli-color';
import emoji from 'node-emoji';

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
    console.log(
      emoji.get('airplane') +
        '  ' +
        clc.green(`Create new folder => ${newPath}`)
    );
    const tasks: Array<Promise<any>> = [];
    const create = async (basePath: string, scheme: Scheme) => {
      for (const item of scheme) {
        if (typeof item === 'string') {
          tasks.push(createFile(Path.join(basePath, item)));
        } else if ('children' in item) {
          await mkdir(Path.join(basePath, item.name));
          create(Path.join(basePath, item.name), item.children);
        } else {
          tasks.push(createFile(Path.join(basePath, item.name), item.template));
        }
      }
    };
    create(newPath, scheme);
    await Promise.all(tasks);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log(getErrorMessage(`${path} is existed`));
    } else {
      console.log(getErrorMessage(error.message || 'unknown'));
    }
  }
}
