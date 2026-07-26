import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="label-eyebrow mb-4">404</p>
      <h1 className="font-display max-w-md text-2xl font-medium text-text md:text-3xl">
        This signal doesn&apos;t resolve to anything.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-primary">
        The page you&apos;re looking for isn&apos;t part of the workspace.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-cool/40 bg-cool/10 px-6 py-3 text-sm text-cool transition-colors hover:bg-cool/20"
      >
        Back to workspace
      </Link>
    </div>
  );
}