"use client";

export default function LoaderOverlay({ visible }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 text-white">
      <div className="animate-pulse tracking-wider text-sm md:text-base">
        Loading…
      </div>
    </div>
  );
}
