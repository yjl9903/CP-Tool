import { command, AbstractCommand, option } from '../utils';
import { runCode, transformFolder } from '../services';

@command('open <name>', 'open contest folder')
@option('-f, --folder <folderName>', 'create in sub folder')
export class openFolderCommand extends AbstractCommand {
  async action(name: string, option: { folder?: string }) {
    const path = transformFolder(name, option.folder);
    await runCode(path);
  }
}