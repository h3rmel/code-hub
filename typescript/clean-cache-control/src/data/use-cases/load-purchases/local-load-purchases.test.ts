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

  it("Should call correct key on load", async () => {
    const { cacheStore, sut } = makeSut();

    await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toEqual("purchases");
  });
});
