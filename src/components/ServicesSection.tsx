import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAPScrollTrigger } from '@/hooks/useGSAP';
import {
  Code2,
  Server,
  Layout,
  Zap,
  Palette,
  Wrench,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using modern technologies. From database design to frontend implementation.',
    color: 'primary',
    bullets: ['MERN / Next.js Apps', 'RESTful & GraphQL APIs', 'Database Architecture'],
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'Robust RESTful and GraphQL API design with proper authentication, rate limiting, and documentation.',
    color: 'accent',
    bullets: ['JWT & OAuth Auth', 'Third-party Integrations', 'API Documentation'],
  },
  {
    icon: Layout,
    title: 'Frontend Architecture',
    description: 'Scalable React/Next.js architectures with state management, testing, and component libraries.',
    color: 'primary',
    bullets: ['React / Next.js', 'Redux & Zustand', 'Component Libraries'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up existing applications through code optimization, caching strategies, and infrastructure improvements.',
    color: 'accent',
    bullets: ['Core Web Vitals', 'Code Splitting', 'Caching Strategies'],
  },
  {
    icon: Palette,
    title: 'UI Implementation',
    description: 'Pixel-perfect implementation of Figma/Sketch designs with responsive layouts and smooth animations.',
    color: 'primary',
    bullets: ['Figma to Code', 'Responsive Layouts', 'GSAP Animations'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Scaling',
    description: 'Ongoing support, bug fixes, feature additions, and scaling solutions for growing applications.',
    color: 'accent',
    bullets: ['Bug Fixes & Updates', 'AWS / Docker', 'CI/CD Pipelines'],
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;

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
      duration: 0.6,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        style={{ transform: 'translateZ(40px)' }}
        className="w-full h-full flex flex-col gap-4"
      >
        {children}
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const triggerRef = useGSAPScrollTrigger();

  return (
    <section id="services" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive web development services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div ref={triggerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <TiltCard
              key={service.title}
              className="group glass-card-hover p-8 rounded-2xl transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  service.color === 'primary'
                    ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.2)] group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                    : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground shadow-[0_0_15px_hsl(var(--accent)/0.2)] group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.5)]'
                }`}
              >
                <service.icon className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-foreground transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-muted-foreground/90 transition-colors">
                  {service.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'primary' ? 'bg-primary shadow-[0_0_5px_hsl(var(--primary))]' : 'bg-accent shadow-[0_0_5px_hsl(var(--accent))]'}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-muted-foreground mb-6">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
