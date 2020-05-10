import Path from 'path';

import { command, AbstractCommand } from '../utils';
import { ConfigPath, runCode } from '../services';

@command('settings', 'open settings file')
export class settingsCommand extends AbstractCommand {
  async action() {
    runCode(Path.join(ConfigPath, 'config.json'));
  }
}
