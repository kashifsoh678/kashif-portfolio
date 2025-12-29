import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStartup Inc.',
    content: 'Alex delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient.',
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, DataFlow Systems',
    content: 'Working with Alex was a game-changer for our product. He brought innovative solutions to complex problems and delivered a scalable architecture that handles millions of requests.',
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager, Creative Agency',
    content: 'Alex has an incredible ability to translate design concepts into pixel-perfect implementations. His code is clean, well-documented, and a pleasure to work with.',
    avatar: 'ER',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder, SaaS Platform',
    content: 'From MVP to production, Alex guided us through every step. His full-stack expertise and proactive communication made him an invaluable partner for our launch.',
    avatar: 'DK',
  },
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Feedback from people I've had the pleasure of working with
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-primary/20 absolute top-8 left-8" />

            {/* Content */}
            <div className="text-center pt-8">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
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
