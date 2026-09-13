import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGSAPScrollTrigger = () => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert(); // scoped cleanup — only kills THIS context's triggers
  }, []);

  return triggerRef;
};

export const useGSAPFadeIn = () => {
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = fadeRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert(); // scoped cleanup
  }, []);

  return fadeRef;
};

// Generic scroll-triggered stagger for any ref
export const useGSAPStagger = (options?: { start?: string; from?: gsap.TweenVars; to?: gsap.TweenVars }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.children,
        options?.from ?? { y: 50, opacity: 0 },
        {
          ...(options?.to ?? { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out' }),
          scrollTrigger: {
            trigger: element,
            start: options?.start ?? 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
};

// Unused — kept for reference but ScrollTrigger.getAll().kill() removed
export { ScrollTrigger };
