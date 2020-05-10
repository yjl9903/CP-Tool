import execa from 'execa';
import { getErrorMessage } from '../utils';

export async function runCode(path: string) {
  try {
    await execa('code', [path]);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(getErrorMessage('can not find command "code"'));
    } else {
      console.log(getErrorMessage(err.message || 'unknown'));
    }
  }
}
