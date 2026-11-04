type NavButton = HTMLButtonElement;

const menuToggle = document.querySelector<NavButton>("[data-menu-toggle]");
const mobileNav = document.querySelector<HTMLElement>("[data-mobile-nav]");

function closeMenu(returnFocus = false) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  mobileNav.hidden = true;
  if (returnFocus) menuToggle.focus();
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const nextOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(nextOpen));
    menuToggle.setAttribute("aria-label", nextOpen ? "Close navigation" : "Open navigation");
    mobileNav.hidden = !nextOpen;
  });
  for (const anchor of mobileNav.querySelectorAll("a")) {
    anchor.addEventListener("click", () => closeMenu());
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) closeMenu();
  });
}

const inspector = document.querySelector<HTMLElement>("[data-inspector]");
if (inspector) {
  const summary = inspector.querySelector<HTMLElement>("[data-route-summary]");
  const choices = Array.from(inspector.querySelectorAll<HTMLInputElement>("[data-backend-choice]"));
  const descriptions = {
    interpreter: "Interpreter: SourceText → PricingExpression → interpreter executor. This is a pre-authored walkthrough; no browser compilation.",
    compiled: "Compiled: SourceText → PricingExpression → Func<decimal> → compiled executor. Acme returns a delegate, not Wist CIL."
  };
  for (const choice of choices) {
    choice.addEventListener("change", () => {
      if (choice.checked && summary) {
        summary.textContent = descriptions[choice.value as keyof typeof descriptions] ?? descriptions.interpreter;
      }
    });
  }
}