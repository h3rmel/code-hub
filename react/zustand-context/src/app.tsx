import { CountProvider, useCountStore } from "./store/count-provider";

type AppProps = {
  initialCount: number;
};

export function App({ initialCount = 4 }: AppProps) {
  return (
    <CountProvider initialCount={initialCount}>
      <main className="bg-gray-900 text-gray-100 min-h-screen w-full flex items-center justify-center">
        <h1 className="text-2xl">Hello World</h1>
        <CounterView />
      </main>
    </CountProvider>
  );
}

function CounterView() {
  const count = useCountStore((state) => state.count);

  console.log(count);

  return null;
}
