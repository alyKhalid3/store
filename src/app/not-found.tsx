import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-amber-deep underline">Back to store</Link>
    </div>
  );
}
