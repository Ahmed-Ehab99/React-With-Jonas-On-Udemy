"use client";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="flex h-[60vh] flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
};

export default Error;
