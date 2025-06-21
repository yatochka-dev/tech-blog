// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
        <p className="mt-4 text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  );
}
