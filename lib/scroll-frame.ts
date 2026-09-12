export type ScrollFrameListener = (dt: number) => boolean | void;

const listeners = new Set<ScrollFrameListener>();
let frame = 0;
let lastTime = 0;
let bound = false;

function loop(now: number) {
  const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
  lastTime = now;

  let again = false;
  listeners.forEach((listener) => {
    if (listener(dt)) again = true;
  });

  if (again) {
    frame = requestAnimationFrame(loop);
    return;
  }

  frame = 0;
  lastTime = 0;
}

function wake() {
  if (frame) return;
  lastTime = 0;
  frame = requestAnimationFrame(loop);
}

export function subscribeScrollFrame(listener: ScrollFrameListener) {
  listeners.add(listener);

  if (!bound) {
    bound = true;
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
  }

  wake();

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;

    bound = false;
    window.removeEventListener("scroll", wake);
    window.removeEventListener("resize", wake);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  };
}
