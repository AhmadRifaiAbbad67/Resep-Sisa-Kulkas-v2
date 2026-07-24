import { useState, useEffect, useRef } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}
