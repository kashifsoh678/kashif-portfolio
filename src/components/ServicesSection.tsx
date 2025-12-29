import { useGSAPScrollTrigger } from '@/hooks/useGSAP';
import { 
  Code2, 
  Server, 
  Layout, 
  Zap, 
  Palette, 
  Wrench 
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using modern technologies. From database design to frontend implementation.',
    color: 'primary',
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'Robust RESTful and GraphQL API design with proper authentication, rate limiting, and documentation.',
    color: 'accent',
  },
  {
    icon: Layout,
    title: 'Frontend Architecture',
    description: 'Scalable React/Next.js architectures with state management, testing, and component libraries.',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up existing applications through code optimization, caching strategies, and infrastructure improvements.',
    color: 'accent',
  },
  {
    icon: Palette,
    title: 'UI Implementation',
    description: 'Pixel-perfect implementation of Figma/Sketch designs with responsive layouts and animations.',
    color: 'primary',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Scaling',
    description: 'Ongoing support, bug fixes, feature additions, and scaling solutions for growing applications.',
    color: 'accent',
  },
];

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
        <div ref={triggerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group glass-card-hover p-8 rounded-2xl text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  service.color === 'primary'
                    ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground'
                }`}
              >
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};
