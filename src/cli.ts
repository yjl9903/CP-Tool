#!/usr/bin/env node

import path from 'path';
import { readFileSync } from 'fs';
import { cac } from 'cac';

const cli = cac('cp');

cli.help();

cli.version(
  JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
    .version
);

cli.parse();