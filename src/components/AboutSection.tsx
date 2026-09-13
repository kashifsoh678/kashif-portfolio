import { useGSAPFadeIn } from '@/hooks/useGSAP';
import { Code2, Zap, Layers, Users } from 'lucide-react';

const strengths = [
  {
    icon: Code2,
    title: 'MERN Stack Expertise',
    description: 'Deep knowledge in MongoDB, Express.js, React, and Node.js for end-to-end development.',
  },
  {
    icon: Layers,
    title: 'Clean Architecture',
    description: 'Building maintainable, scalable codebases with solid design patterns and best practices.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Delivering blazing-fast applications through code splitting, caching, and efficient algorithms.',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Creating intuitive interfaces that provide exceptional user experiences.',
  },
];

export const AboutSection = () => {
  const fadeRef = useGSAPFadeIn();

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <div ref={fadeRef} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image / Video */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60" />
            <div className="relative glass-card rounded-2xl p-2 overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden relative">
                <video
                  src="/video/portfolio-clip.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-contain object-center rounded-xl"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 glass-card rounded-lg border border-primary/20 animate-float shadow-lg">
              <span className="text-primary font-semibold text-sm">5+ Years Experience</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Crafting Digital
              <span className="gradient-text"> Experiences</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Passionate and results-oriented Software Developer specializing in MERN stack development.
              Skilled in building responsive, user-centric web applications with clean, scalable architectures.
              Proficient in both front-end and back-end technologies, with a strong aptitude for quickly adapting to new tools and frameworks.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I thrive in collaborative, fast-paced environments and excel at solving complex technical challenges
              to deliver high-impact solutions. Based in Rawalpindi, Pakistan, I'm passionate about continuous learning
              and improving development capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/Kashif_Sohail_CV.pdf"
                download
                className="btn-primary inline-flex items-center justify-center gap-2 text-sm"
              >
                Download CV
              </a>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline inline-flex items-center justify-center gap-2 text-sm"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Strengths Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {strengths.map((strength, index) => (
            <div
              key={strength.title}
              className="glass-card-hover p-6 rounded-xl group transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <strength.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">{strength.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
