import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Quote, Star, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Team Lead',
    company: 'Acrosoft.io',
    role: 'Team Lead, Acrosoft.io',
    content: 'Kashif consistently delivered high-quality React and Next.js features on time. His attention to performance optimization and clean code made him a standout developer on our team.',
    avatar: 'AL',
    rating: 5,
    via: 'LinkedIn',
  },
  {
    id: 2,
    name: 'Project Manager',
    company: 'Digital Sensei Technologies',
    role: 'Project Manager, Digital Sensei Technologies',
    content: 'Working with Kashif was a great experience. He built out complex RESTful APIs and MongoDB schemas with minimal bugs, and always communicated proactively about blockers.',
    avatar: 'PM',
    rating: 5,
    via: 'Direct',
  },
  {
    id: 3,
    name: 'Client — Tredella',
    company: 'Tredella E-Commerce',
    role: 'Product Owner, Tredella',
    content: 'Kashif delivered our full-stack e-commerce portal with both buyer and seller portals on schedule. The quality of the work and his ability to adapt to changing requirements was impressive.',
    avatar: 'TC',
    rating: 5,
    via: 'Direct',
  },
  {
    id: 4,
    name: 'Hiring Manager',
    company: 'Jump Platform',
    role: 'Hiring Manager, Jump Platform',
    content: 'Kashif\'s TypeScript and Next.js skills are top-notch. He built a highly performant recruitment interface and integrated complex filtering features that our users love.',
    avatar: 'HM',
    rating: 5,
    via: 'LinkedIn',
  },
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    const card = cardRef.current;
    if (!card) return;

    const xOut = direction === 'next' ? -40 : 40;

    gsap.to(card, {
      x: xOut,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex((prev) =>
          direction === 'next'
            ? (prev + 1) % testimonials.length
            : (prev - 1 + testimonials.length) % testimonials.length
        );
        gsap.fromTo(card, { x: -xOut, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out', onComplete: () => setIsAnimating(false) });
      },
    });
  };

  const t = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            What <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Feedback from colleagues and clients I've had the pleasure of working with
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote icon background */}
            <Quote className="w-20 h-20 text-primary/5 absolute top-6 left-6" />

            <div ref={cardRef}>
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 text-center italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ExternalLink className="w-3 h-3 text-primary/60" />
                    <span className="text-xs text-primary/60">via {t.via}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => navigate('prev')}
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary hover:text-primary transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-primary'
                        : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate('next')}
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary hover:text-primary transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
