type Listener = () => void;

const listeners = new Set<Listener>();
let frame = 0;
let bound = false;

function tick() {
  frame = 0;
  listeners.forEach((listener) => listener());
}

function requestTick() {
  if (frame) return;
  frame = requestAnimationFrame(tick);
}

export function subscribeScrollFrame(listener: Listener) {
  listeners.add(listener);

  if (!bound) {
    bound = true;
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
  }

  listener();

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;

    bound = false;
    window.removeEventListener("scroll", requestTick);
    window.removeEventListener("resize", requestTick);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}
