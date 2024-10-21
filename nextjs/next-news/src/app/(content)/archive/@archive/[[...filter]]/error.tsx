'use client';

export default function FilterError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div id="error">
      <h2>An error ocurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
