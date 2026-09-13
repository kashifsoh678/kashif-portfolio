import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices for better performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Use GSAP quickTo for highly optimized, lag-free cursor tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });

    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    // Add scale effect when hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      
      if (isInteractive) {
        gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      } else {
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_10px_hsl(var(--primary))]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_15px_hsl(var(--primary)/0.3)] bg-primary/5"
      />
    </>
  );
};
