import Path from 'path';
import os from 'os';

import { mkdir } from './fs';

export * from './fs';
export * from './cac';

export const ConfigPath = Path.join(os.homedir(), '.cp-tool');

export async function ensureConfig() {
  await mkdir(ConfigPath).catch(() => {});
  await mkdir(Path.join(ConfigPath, 'code')).catch(() => {});
}
