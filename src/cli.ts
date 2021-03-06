#!/usr/bin/env node

import path from 'path';
import { readFileSync } from 'fs';
import { cac } from 'cac';

import { buildCommands } from './utils';
import { commands, ensureConfig } from './commands';

const cli = cac('cpc');

cli.help();

cli.version(
  JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
    .version
);

async function bootstrap() {
  await ensureConfig();
  buildCommands(cli, commands);
  cli.parse();
}

bootstrap();
