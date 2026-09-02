import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-start justify-center px-6 md:px-14">
      <p className="kicker">404</p>
      <h1 className="display-title mt-6 max-w-[10ch] text-[clamp(3rem,8vw,6rem)]">
        This page doesn&apos;t exist.
      </h1>
      <Link href="/" className="btn-primary mt-10">
        Back to home
      </Link>
    </main>
  );
}
