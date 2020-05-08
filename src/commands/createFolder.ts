import { command, AbstractCommand, option } from '../utils';
import { generateFolder } from '../services/folder';
import { getScheme } from '../services';

@command('create <name>', 'open settings file')
@option('--scheme <schemeName>', 'choose scheme template')
export class createFolderCommand extends AbstractCommand {
  async action(name: string, option: { scheme?: string }) {
    generateFolder(name, getScheme(option.scheme));
  }
}
