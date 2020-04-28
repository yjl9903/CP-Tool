import 'reflect-metadata';
import CAC from 'cac/types/CAC';
import Command, { CommandConfig } from 'cac/types/Command';
import { OptionConfig } from 'cac/types/Option';

export class AbstractCommand {
  action(...args: any[]): any {}
}

export interface IOption {
  name: string;
  description?: string;
  config?: OptionConfig;
}

export function command(
  name: string,
  description?: string,
  config?: CommandConfig
): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata('name', name, target);
    Reflect.defineMetadata('description', description, target);
    Reflect.defineMetadata('config', config, target);
  };
}

export function option(
  name: string,
  description?: string,
  config?: OptionConfig
): ClassDecorator {
  return (target: object) => {
    const options: IOption[] = Reflect.getMetadata('options', target) || [];
    options.push({
      name,
      description,
      config,
    });
    Reflect.defineMetadata('options', options, target);
  };
}

export function buildCommands(
  cli: CAC,
  commands: Array<typeof AbstractCommand>
) {
  for (const command of commands) {
    const name = Reflect.getMetadata('name', command);
    const description = Reflect.getMetadata('description', command);
    const config = Reflect.getMetadata('config', command);
    const options: IOption[] = Reflect.getMetadata('options', command) || [];

    options
      .reduce(
        (cli: Command, { name, description, config }: IOption) =>
          cli.option(name, description || '', config),
        cli.command(name, description, config)
      )
      .action((...args: any[]) => new command().action(...args));
  }
}
