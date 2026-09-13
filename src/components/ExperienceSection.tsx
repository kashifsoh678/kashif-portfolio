import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'Acrosoft.io',
    location: 'Lahore, Pakistan',
    role: 'MERN Stack Developer',
    duration: 'Oct 2023 – Present',
    type: 'Full-time',
    color: 'primary',
    responsibilities: [
      'Developed responsive web applications using React.js and Next.js, significantly reducing page load times and improving user engagement',
      'Resolved cross-browser compatibility issues to ensure consistent performance across multiple platforms',
      'Maintained high code quality by adhering to clean code principles and development best practices',
      'Collaborated closely with teams to integrate APIs and deliver performance enhancements',
    ],
  },
  {
    company: 'Digital Sensei Technologies',
    location: 'Rawalpindi, Pakistan',
    role: 'MERN Stack Developer',
    duration: 'Jul 2022 – Oct 2023',
    type: 'Full-time',
    color: 'accent',
    responsibilities: [
      'Collaborated with UI/UX designers to implement responsive interfaces for MERN Stack applications',
      'Developed RESTful APIs using Node.js and Express with third-party API integrations',
      'Designed efficient MongoDB schemas to manage application data',
      'Utilized Git for effective version control and collaboration across teams',
    ],
  },
  {
    company: 'TechStep',
    location: 'Rawalpindi, Pakistan',
    role: 'Associate Software Developer',
    duration: 'Jul 2021 – May 2022',
    type: 'Full-time',
    color: 'primary',
    responsibilities: [
      'Developed and maintained dynamic web pages using HTML, CSS, and JavaScript',
      'Created interactive UI components using AJAX',
      'Designed and managed MySQL databases for various web applications',
      'Optimized existing code and improved performance',
    ],
  },
];

const TiltCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.7,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="w-full h-full relative z-10">
        {children}
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      // Timeline items entrance
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -60 : 60, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate the timeline line drawing down
      const line = timelineRef.current?.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* ── Header ────────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A timeline of my professional growth, collaborations, and engineering achievements
          </p>
        </div>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          
          {/* Timeline vertical glowing line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] md:-translate-x-1/2 bg-secondary/30">
            <div className="timeline-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
          </div>

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const themeColor = exp.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
            const themeClass = exp.color === 'primary' ? 'text-primary' : 'text-accent';
            const bgClass = exp.color === 'primary' ? 'bg-primary' : 'bg-accent';
            const borderClass = exp.color === 'primary' ? 'border-primary' : 'border-accent';

            return (
              <div
                key={exp.company}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node dot */}
                <div className="absolute left-8 md:left-1/2 w-10 h-10 -translate-x-1/2 mt-1.5 flex items-center justify-center z-10">
                  <div className={`absolute inset-0 rounded-full ${bgClass}/20 animate-ping`} />
                  <div className={`w-5 h-5 rounded-full ${bgClass} shadow-[0_0_15px_${themeColor}] flex items-center justify-center border-4 border-background`} />
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20'} pl-20 md:pl-0`}>
                  <TiltCard className="group relative glass-card rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                       style={{ borderColor: `hsl(var(--${exp.color}) / 0.1)` }}>
                    
                    {/* Hover Shimmer Gradient (Matches Skills section aesthetic) */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 0%, hsl(var(--${exp.color}) / 0.1) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Badge row */}
                    <div className={`flex flex-wrap items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                      <span className={`px-3 py-1 bg-${exp.color}/10 ${themeClass} rounded-full text-xs font-semibold uppercase tracking-wider border border-${exp.color}/20`}>
                        {exp.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/50">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">
                      {exp.role}
                    </h3>
                    
                    {/* Company & Location */}
                    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 text-sm ${isEven ? 'md:justify-end' : ''}`}>
                      <div className={`flex items-center gap-1.5 font-semibold ${themeClass}`}>
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-border/50 mb-6" />

                    {/* Responsibilities */}
                    <ul className={`space-y-3 text-sm text-muted-foreground relative z-10 ${isEven ? 'md:text-right' : ''}`}>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className={`flex items-start gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className={`w-1.5 h-1.5 ${bgClass} rounded-full mt-1.5 shrink-0 shadow-[0_0_5px_${themeColor}]`} />
                          <span className="leading-relaxed group-hover:text-muted-foreground/90 transition-colors">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
