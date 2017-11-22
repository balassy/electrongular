declare module 'npm-conf' {
  interface NpmConf {
    get(key: string): string | undefined;
  }

  function npmConf(): NpmConf;

  export = npmConf;
}
