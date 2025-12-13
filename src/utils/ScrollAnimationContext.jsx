"use client";
import { createContext, useMemo } from "react";

export const AnimationContext = createContext(null);

export function ScrollAnimationProvider({ children }) {
  const registerOnce = useMemo(() => {
    return (node) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view-once");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(node);
      return () => observer.disconnect();
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ registerOnce }}>
      {children}
    </AnimationContext.Provider>
  );
}
