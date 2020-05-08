import { command, AbstractCommand, option } from '../utils';
import { generateFolder } from '../services/folder';
import { getScheme } from '../services';

@command('create <name>', 'open settings file')
@option('-f, --folder <folderName>', 'create in sub folder')
@option('-s, --scheme <schemeName>', 'choose scheme template')
export class createFolderCommand extends AbstractCommand {
  async action(name: string, option: { scheme?: string; folder?: string }) {
    generateFolder(name, getScheme(option.scheme), option.folder);
  }
}
