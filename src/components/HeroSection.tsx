import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          socialRef.current?.children || [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text text-glow">Kashif Sohail</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light"
          >
            <span className="text-primary font-medium">MERN Stack Developer</span>
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Passionate and results-oriented Software Developer specializing in MERN stack development. 
            Building responsive, user-centric web applications with clean, scalable architectures.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={scrollToProjects}
              className="btn-primary group inline-flex items-center gap-2"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <a 
              href="/Kashif_Sohail_CV.pdf" 
              download
              className="btn-outline inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <button onClick={scrollToContact} className="btn-outline">
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex justify-center gap-6">
            <a
              href="https://github.com/kashifsoh678/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://linkedin.com/in/kashif-sohail-1737a228a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:kashifsoh678@gmail.com"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
