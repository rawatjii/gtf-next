export const LOADER_EVENTS = {
  HERO_READY: "gtf:hero-ready",
  PLAY_NOW: "gtf:play-now",
};

export const sendLoaderEvent = (name, detail) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

export const onLoaderEvent = (name, handler) => {
  const wrapped = (e) => handler?.(e.detail);
  window.addEventListener(name, wrapped);
  return () => window.removeEventListener(name, wrapped);
};
