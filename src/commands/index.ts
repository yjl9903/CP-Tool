import { storeCommand, loadCommand } from './storage';
import { AbstractCommand } from '../utils';

export const commands: Array<typeof AbstractCommand> = [
  storeCommand,
  loadCommand,
];
