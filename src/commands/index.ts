import Path from 'path';

import { AbstractCommand, mkdir, readFile, writeFile } from '../utils';
import { setConfig, ConfigPath } from '../services';
import { storeCommand, loadCommand, listCodeCommand } from './storage';
import { settingsCommand } from './settings';
import { createFolderCommand } from './createFolder';

export const commands: Array<typeof AbstractCommand> = [
  storeCommand,
  loadCommand,
  listCodeCommand,
  settingsCommand,
  createFolderCommand
];

export async function ensureConfig() {
  await mkdir(ConfigPath).catch(() => {});
  await mkdir(Path.join(ConfigPath, 'code')).catch(() => {});
  try {
    const config = JSON.parse(await readFile(Path.join(ConfigPath, 'config.json')));
    setConfig(config);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const { config } = await import('./default');
      setConfig(config);
      await writeFile(Path.join(ConfigPath, 'config.json'), JSON.stringify(config, null, 2));
    } else {
      process.exit(1);
    }
  }
}
