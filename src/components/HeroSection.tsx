import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Download, Briefcase, Code2, Star } from 'lucide-react';

const roles = [
  'MERN Stack Developer',
  'Next.js Specialist',
  'Full-Stack Engineer',
  'React Developer',
  'Node.js Expert',
];

const stats = [
  { icon: Briefcase, value: '5+', label: 'Years Experience' },
  { icon: Code2, value: '20+', label: 'Projects Built' },
  { icon: Star, value: '10+', label: 'Happy Clients' },
];

const TiltContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(containerRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.7,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(40px)' }} className="w-full h-full relative">
        {children}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const [displayedRole, setDisplayedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 70);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(imgRef.current, { x: 50, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.8')
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.6')
        .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
        .fromTo(
          ctaRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.5 },
          '-=0.4'
        )
        .fromTo(
          socialRef.current?.children || [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          statsRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 lg:pt-0"
    >
      {/* Background theme blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse-glow animation-delay-400" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="container-custom relative z-10 px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

          {/* ── Left Column (Text Content) ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 md:mb-8 shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for new projects
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1]"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text text-glow block sm:inline mt-1 sm:mt-0">Kashif Sohail</span>
            </h1>

            {/* Typewriter subtitle */}
            <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light min-h-[2rem] sm:min-h-[2.5rem]">
              <span className="text-primary font-semibold">{displayedRole}</span>
              <span className="animate-pulse text-primary">|</span>
            </p>

            {/* Description */}
            <p ref={descRef} className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Passionate and results-oriented Software Developer specializing in MERN stack development.
              Building responsive, user-centric web applications with clean, scalable architectures.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('#projects')}
                className="btn-primary group inline-flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
              >
                View My Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="/Kashif_Sohail_CV.pdf"
                download
                className="btn-outline inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex items-center gap-4">
              <a
                href="https://github.com/kashifsoh678/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/kashif-sohail-1737a228a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-accent/20 hover:text-accent hover:shadow-[0_0_15px_hsl(var(--accent)/0.3)] transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:kashifsoh678@gmail.com"
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* ── Right Column (3D Profile Image & Stats) ── */}
          <div ref={imgRef} className="order-1 lg:order-2 flex flex-col items-center gap-10">

            {/* 3D Interactive Photo */}
            <TiltContainer className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 cursor-pointer">
              {/* Outer massive glow ring */}
              <div
                className="absolute inset-[-10%] rounded-full opacity-60 blur-2xl scale-110 animate-pulse-glow"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.4), hsl(var(--accent)/0.4))' }}
              />

              {/* Border ring with gradient */}
              <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary via-accent to-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
                {/* Image container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img
                    src="/profile_img.png"
                    alt="Kashif Sohail — MERN Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating tech badges (Popping out in 3D) */}

            </TiltContainer>

            {/* Stats bar (Responsive flex wrap) */}
            <div ref={statsRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 w-full px-4 sm:px-0">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="glass-card rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-center group hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300 flex-1 min-w-[100px] max-w-[140px]">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1.5 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_hsl(var(--primary))] transition-all" />
                  <p className="text-lg sm:text-xl font-bold gradient-text drop-shadow-md">{value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_5px_hsl(var(--primary))]" />
        </div>
      </div>
    </section>
  );
};
