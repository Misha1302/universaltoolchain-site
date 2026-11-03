type ToggleButton = HTMLButtonElement;

const menuToggle = document.querySelector<ToggleButton>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-mobile-nav]");
function closeMenu() {
  if (!menuToggle || !menu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menu.hidden = true;
}
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const shouldOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
    menuToggle.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
    menu.hidden = !shouldOpen;
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 830) closeMenu();
  });
}

const lifecycle = document.querySelector<HTMLElement>("[data-lifecycle]");
if (lifecycle) {
  const steps = Array.from(lifecycle.querySelectorAll<ToggleButton>("[data-step-button]"));
  const panels = Array.from(lifecycle.querySelectorAll<HTMLElement>("[data-step-panel]"));
  for (const step of steps) {
    step.addEventListener("click", () => {
      const next = step.dataset.stepButton;
      for (const button of steps) {
        const selected = button === step;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      }
      for (const panel of panels) panel.hidden = panel.dataset.stepPanel !== next;
    });
  }
}

const routeExplorer = document.querySelector<HTMLElement>("[data-route-explorer]");
if (routeExplorer) {
  const tabs = Array.from(routeExplorer.querySelectorAll<ToggleButton>("[data-route-switch]"));
  const panels = Array.from(routeExplorer.querySelectorAll<HTMLElement>("[data-route-panel]"));
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      const selectedRoute = tab.dataset.routeSwitch;
      for (const button of tabs) {
        const active = button === tab;
        button.classList.toggle("is-selected", active);
        button.setAttribute("aria-pressed", String(active));
      }
      for (const panel of panels) panel.hidden = panel.dataset.routePanel !== selectedRoute;
    });
  }
}

const workbench = document.querySelector<HTMLElement>("[data-code-workbench]");
if (workbench) {
  const tabs = Array.from(workbench.querySelectorAll<ToggleButton>("[data-code-tab]"));
  const panels = Array.from(workbench.querySelectorAll<HTMLElement>("[data-code-panel]"));
  const copyButton = workbench.querySelector<ToggleButton>("[data-copy-code]");
  const copyLabel = workbench.querySelector<HTMLElement>("[data-copy-label]");
  const copyStatus = workbench.querySelector<HTMLElement>("[data-copy-status]");
  function selectTab(target: ToggleButton) {
    for (const button of tabs) {
      const active = button === target;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    }
    for (const panel of panels) panel.hidden = panel.dataset.codePanel !== target.dataset.codeTab;
    if (copyStatus) copyStatus.textContent = "";
    if (copyLabel) copyLabel.textContent = "Copy";
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const targetIndex = event.key === "Home" ? 0 :
        event.key === "End" ? tabs.length - 1 :
        event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      selectTab(tabs[targetIndex]);
      tabs[targetIndex].focus();
    });
  });
  copyButton?.addEventListener("click", async () => {
    const visible = panels.find((panel) => !panel.hidden);
    const code = visible?.querySelector("code")?.textContent ?? "";
    if (!code) {
      if (copyStatus) copyStatus.textContent = "No code available";
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      if (copyLabel) copyLabel.textContent = "Copied!";
      if (copyStatus) copyStatus.textContent = "Code copied to clipboard";
    } catch {
      if (copyLabel) copyLabel.textContent = "Unavailable";
      if (copyStatus) copyStatus.textContent = "Clipboard blocked; select the code to copy";
    }
  });
}
