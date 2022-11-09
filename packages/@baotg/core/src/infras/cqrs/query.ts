export interface Meta {
  id?: string; // CQ command Id, it will be generate if missing, it should prefer to tracking id (service mesh) for tracing
  user?: any; // Current User, will define data type later.
}

export type QueryMeta = Meta;

export type CommandMeta = Meta;

export class CQCommand<D, M extends Meta> {
  public createdAt: Date;

  constructor(
    public readonly command: boolean, // true is command, false is query
    public readonly type: string, // domain models name
    public readonly name: string,
    public readonly data: D,
    public readonly meta: M,
    public readonly track: boolean = true,
  ) {
    this.createdAt = new Date();
  }
}

export class CQuery<D> extends CQCommand<D, QueryMeta> {
  constructor(
    public readonly type: string,
    public readonly name: string,
    public readonly data: D,
    public readonly meta: QueryMeta,
    public readonly track: boolean = true,
  ) {
    super(false, type, name, data, meta, track);
  }
}

export class CCommand<D> extends CQCommand<D, CommandMeta> {
  constructor(
    public readonly type: string,
    public readonly name: string,
    public readonly data: D,
    public readonly meta: CommandMeta,
    public readonly track: boolean = true,
  ) {
    super(true, type, name, data, meta, track);
  }
}
