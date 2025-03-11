import { mockPurchases, CacheStoreSpy } from "@/data/tests";
import { LocalSavePurchases } from "@/data/use-cases/save-purchases/local-save-purchases";

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

function makeSut(timestamp: Date = new Date()): SutTypes {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore, timestamp);

  return {
    sut,
    cacheStore,
  };
}

describe("LocalSavePurchases", () => {
  it("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.actions).toEqual([]);
  });

  it("Should not insert new Cache if delete fails", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateDeleteError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete]);
    await expect(promise).rejects.toThrow();
  });

  it("Should insert new Cache if delete succeeds", async () => {
    const timestampMock = new Date();
    const { sut, cacheStore } = makeSut(timestampMock);

    const purchases = mockPurchases();

    const promise = sut.save(purchases);

    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.delete,
      CacheStoreSpy.Action.insert,
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual({
      timestamp: timestampMock,
      value: purchases,
    });
    await expect(promise).resolves.toBeFalsy();
  });

  it("Should throw if insert throws", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateInsertError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.delete,
      CacheStoreSpy.Action.insert,
    ]);
    await expect(promise).rejects.toThrow();
  });
});
