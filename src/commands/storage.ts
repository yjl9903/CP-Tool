import { command, AbstractCommand } from '../utils';
import { Storage } from '../services';

@command('load <name>', 'load code locally')
export class loadCommand extends AbstractCommand {
  async action(name: string) {
    await Storage.load(name, name);
  }
}

@command('store <name>', 'store/update code')
export class storeCommand extends AbstractCommand {
  async action(name: string) {
    await Storage.store(name);
  }
}

@command('list', 'list all code locally')
export class listCodeCommand extends AbstractCommand {
  async action() {
    const files = await Storage.list();
    for (const file of files) {
      console.log(file);
    }
  }
}
