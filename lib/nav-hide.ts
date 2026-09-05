const sources = new Map<string, number>();

function apply() {
  const hide = sources.size === 0 ? 0 : Math.max(0, ...sources.values());
  const root = document.documentElement;
  root.style.setProperty("--nav-hide", hide.toFixed(4));
  root.toggleAttribute("data-nav-hidden", hide > 0.85);
}

export function setNavHideSource(id: string, value: number) {
  sources.set(id, Math.min(1, Math.max(0, value)));
  apply();
}

export function clearNavHideSource(id: string) {
  sources.delete(id);
  apply();
}
