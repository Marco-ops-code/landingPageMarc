const sources = new Map<string, number>();
let lastHide = "";
let lastHidden = false;

function apply() {
  const hide = sources.size === 0 ? 0 : Math.max(0, ...sources.values());
  const next = hide.toFixed(4);
  const hidden = hide > 0.85;
  if (next === lastHide && hidden === lastHidden) return;

  lastHide = next;
  lastHidden = hidden;
  const root = document.documentElement;
  root.style.setProperty("--nav-hide", next);
  root.toggleAttribute("data-nav-hidden", hidden);
}

export function setNavHideSource(id: string, value: number) {
  sources.set(id, Math.min(1, Math.max(0, value)));
  apply();
}

export function clearNavHideSource(id: string) {
  sources.delete(id);
  apply();
}
