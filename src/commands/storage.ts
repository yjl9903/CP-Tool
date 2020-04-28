import { command, AbstractCommand } from '../utils';
import { Storage } from '../services';

@command('store <name>', 'store/update code')
export class storeCommand extends AbstractCommand {
  async action(name: string) {
    await Storage.store(name);
  }
}

@command('load <name>', 'load code locally')
export class loadCommand extends AbstractCommand {
  async action(name: string) {
    await Storage.load(name);
  }
}
