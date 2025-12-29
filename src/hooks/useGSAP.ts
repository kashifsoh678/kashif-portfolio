import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScrollTrigger = () => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    gsap.fromTo(
      element.children,
      {
        y: 60,
        opacity: 0,
      },
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return triggerRef;
};

export const useGSAPFadeIn = () => {
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = fadeRef.current;
    if (!element) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return fadeRef;
};
