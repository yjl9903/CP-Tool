import Path from 'path';
import execa from 'execa';

import { command, AbstractCommand, getErrorMessage } from '../utils';
import { ConfigPath } from '../services';

@command('settings', 'open settings file')
export class settingsCommand extends AbstractCommand {
  async action() {
    try {
      await execa('code', [Path.join(ConfigPath, 'config.json')]);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(getErrorMessage('can not find command "code"'));
      } else {
        console.log(getErrorMessage(error.message || 'unknown'));
      }
    }
  }
}
