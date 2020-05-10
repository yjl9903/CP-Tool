export type SubScheme = { name: string; children: Scheme };

export type SchemeItem = { name: string; template?: string };

export type Scheme = Array<string | SchemeItem | SubScheme>;

export interface ConfigFile {
  base: string;
  defaultScheme: string;
  folderAlias?: { [key: string]: string };
  schemes: Array<{
    name: string;
    scheme: Scheme;
  }>;
}
