import Path from 'path';
import os from 'os';

import * as Storage from './storage';
import { ConfigFile, Scheme } from './type';
import { getErrorMessage } from '../utils';

export { Storage };

let Config: ConfigFile;

export const ConfigPath = Path.join(os.homedir(), '.cp-tool');

export function setConfig(config: ConfigFile) {
  Config = config;
}

export function getConfig(): ConfigFile {
  return Config;
}

export function getBase(): string {
  if (Config === undefined) {
    console.log(getErrorMessage('can not find config file'));
    process.exit(1);
  } else {
    return Config.base;
  }
}

export function getScheme(schemeName?: string): Scheme {
  if (Config === undefined) {
    console.log(getErrorMessage('can not find config file'));
    process.exit(1);
  }
  if (schemeName === undefined) {
    schemeName = Config.defaultScheme;
  }
  for (const { name, scheme } of Config.schemes) {
    if (name === schemeName) {
      return scheme;
    }
  }
  console.log(getErrorMessage(`can not find scheme "${schemeName}"`));
  process.exit(1);
}
