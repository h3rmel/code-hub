import { mockPurchases, CacheStoreSpy } from "@/data/tests";
import { LocalSavePurchases } from "@/data/use-cases/save-purchases/local-save-purchases";

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

function makeSut(): SutTypes {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);

  return {
    sut,
    cacheStore,
  };
}

describe("LocalSavePurchases", () => {
  it("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.messages).toEqual([]);
  });

  it("Should delete old cache on sut.save", async () => {
    const { sut, cacheStore } = makeSut();

    await sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Messages.delete,
      CacheStoreSpy.Messages.insert,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  it("Should not insert new Cache if delete fails", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateDeleteError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([CacheStoreSpy.Messages.delete]);
    await expect(promise).rejects.toThrow();
  });

  it("Should insert new Cache if delete succeeds", async () => {
    const { sut, cacheStore } = makeSut();

    const purchases = mockPurchases();

    await sut.save(purchases);

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Messages.delete,
      CacheStoreSpy.Messages.insert,
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });

  it("Should throw if insert throws", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateInsertError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Messages.delete,
      CacheStoreSpy.Messages.insert,
    ]);
    await expect(promise).rejects.toThrow();
  });
});
