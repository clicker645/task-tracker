export interface ITokenStorage {
  set(key: string, value: any, duration: number): Promise<boolean>;
  exist(key: string): Promise<boolean>;
  get(key: string): Promise<any>;
  delete(key: string): Promise<boolean>;
}
