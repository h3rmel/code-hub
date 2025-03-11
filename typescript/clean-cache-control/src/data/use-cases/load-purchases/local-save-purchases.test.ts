import { mockPurchases, CacheStoreSpy } from "@/data/tests";
import { LocalLoadPurchases } from "@/data/use-cases/load-purchases/local-load-purchases";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

function makeSut(timestamp: Date = new Date()): SutTypes {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);

  return {
    sut,
    cacheStore,
  };
}

describe("LocalLoadPurchases", () => {
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
