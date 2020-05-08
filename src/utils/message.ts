import emoji from 'node-emoji';
import clc from 'cli-color';

export function getErrorMessage(message: string, type: string = 'Error', emojiType: string = 'warning') {
  return emoji.get(emojiType) + '  ' + clc.red(`${type}: ${message}`);
}