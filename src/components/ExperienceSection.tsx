import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Acrosoft.io',
    location: 'Lahore, Pakistan',
    role: 'MERN Stack Developer',
    duration: 'Oct 2023 - Present',
    type: 'Full-time',
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
    duration: 'Jul 2022 - Oct 2023',
    type: 'Full-time',
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
    duration: 'Jul 2021 - May 2022',
    type: 'Full-time',
    responsibilities: [
      'Developed and maintained dynamic web pages using HTML, CSS, and JavaScript',
      'Created interactive UI components using AJAX',
      'Designed and managed MySQL databases for various web applications',
      'Optimized existing code and improved performance',
    ],
  },
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            x: index % 2 === 0 ? -50 : 50, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A timeline of my professional growth and achievements
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-8">
                <div className="w-full h-full bg-primary rounded-full glow-primary" />
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
              </div>

              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-16 md:pl-0`}>
                <div className="glass-card-hover p-6 rounded-xl">
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold">{exp.company}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                  <div className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                    <span className="px-2 py-0.5 bg-secondary rounded text-xs">{exp.type}</span>
                  </div>
                  <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0 ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
