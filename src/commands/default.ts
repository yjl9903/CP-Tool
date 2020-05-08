import Path from 'path';
import os from 'os';
import { ConfigFile } from '../services/type';

export const config: ConfigFile = {
  base: Path.join(os.homedir()),
  defaultScheme: 'Codeforces',
  schemes: [
    {
      name: 'Codeforces',
      scheme: [
        'a.cpp',
        'b.cpp',
        'c.cpp',
      ]
    }
  ]
};
