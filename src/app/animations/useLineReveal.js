import { gsap } from "gsap";

export const animateLine = (elementRef) => {
  if (!elementRef?.current) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            elementRef.current,
            { width: "0%", opacity: 0, right: "25%" },
            {
              width: "24%",
              opacity: 1,
              right: "25%",
              duration: 0.8,
              ease: "power2.in",
            }
          );
          // Once animated, stop observing
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // triggers when 10% of the element is visible
    }
  );

  observer.observe(elementRef.current);
};
