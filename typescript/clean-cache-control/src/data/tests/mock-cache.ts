import { SavePurchases } from "@/domain/use-cases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpy.Action> = [];
  deleteKey: string;
  insertKey: string;
  fetchKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.actions.push(CacheStoreSpy.Action.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: Array<SavePurchases.Params>): void {
    this.actions.push(CacheStoreSpy.Action.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  replace(key: string, value: Array<SavePurchases.Params>): void {
    this.delete(key);
    this.insert(key, value);
  }

  fetch(key: string): void {
    this.actions.push(CacheStoreSpy.Action.fetch);
    this.fetchKey = key;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete = "delete",
    insert = "insert",
    fetch = "fetch",
  }
}
