'use client';

// interface ErrorProps {
//   error: Error & { digest?: string };
//   reset: () => void;
// }

export default function Error() {
  return (
    <main className="error">
      <h1>An error ocurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
