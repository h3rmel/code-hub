import { SavePurchases } from "@/domain/use-cases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreSpy.Messages> = [];
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.messages.push(CacheStoreSpy.Messages.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: Array<SavePurchases.Params>): void {
    this.messages.push(CacheStoreSpy.Messages.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Messages.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Messages.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Messages {
    delete = "delete",
    insert = "insert",
  }
}
