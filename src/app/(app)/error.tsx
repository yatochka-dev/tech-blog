"use client";

import ErrorPage from "~/components/error-page";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      reset={reset}
      errorCode={500}
      errorMessage="Something went wrong"
    />
  );
}
