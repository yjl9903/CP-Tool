import { command, AbstractCommand, option } from '../utils';
import { getScheme, runCode, generateFolder, transformFolder } from '../services';

@command('create <name>', 'create contest folder')
@option('-f, --folder <folderName>', 'create in sub folder')
@option('-s, --scheme <schemeName>', 'choose scheme template')
export class createFolderCommand extends AbstractCommand {
  async action(name: string, option: { scheme?: string; folder?: string }) {
    const path = transformFolder(name, option.folder);
    await generateFolder(path, getScheme(option.scheme));
    await runCode(path);
  }
}
