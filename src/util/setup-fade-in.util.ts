export function setupFadeInOnScroll() {
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          el.classList.add("animate-in");
        } else {
          el.classList.remove("animate-in");
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: isMobile ? "0px 0px 50px 0px" : "0px 0px 100px 0px",
    },
  );

  const observeNewElements = () => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    elements.forEach((el) => intersectionObserver.observe(el));
  };

  observeNewElements();

  const mutationObserver = new MutationObserver(() => {
    observeNewElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
