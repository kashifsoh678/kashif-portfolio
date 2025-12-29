import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Jump Recruiter',
    description: 'A U.S.-based recruitment platform enhancing the job application process with dual interfaces for jobseekers and employers.',
    longDescription: 'Contributed to the development of a recruitment platform using Next.js, React, Laravel, and PostgreSQL. Developed dynamic, responsive user interfaces using React and TypeScript. Integrated RESTful APIs for real-time job listings and applications. Created a customizable CV builder and advanced job search filters.',
    image: '/placeholder.svg',
    tech: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PostgreSQL', 'REST APIs'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 2,
    title: 'JumpResume Builder',
    description: 'An AI-assisted resume creation platform with drag-and-drop editing and multiple profile support.',
    longDescription: 'Led UI development using Next.js and Laravel with PostgreSQL. Implemented drag-and-drop resume editing with AI-based suggestions to assist users in resume optimization. Built resume parsing functionality to extract details from uploaded files.',
    image: '/placeholder.svg',
    tech: ['Next.js', 'Laravel', 'PostgreSQL', 'AI Integration', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 3,
    title: 'Tredella',
    description: 'An Ecommerce solution for wholesale and retail markets with dedicated portals for sellers and administrators.',
    longDescription: 'Built a scalable Ecommerce platform with Next.js, Node.js, Express.js, PostgreSQL, Sequelize, and TypeScript. Developed responsive web-applications for both buyer and seller. Implemented dedicated portals with performance optimization and user role management.',
    image: '/placeholder.svg',
    tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 4,
    title: 'Dira-Immobilier',
    description: 'A real estate platform with map-based property search and location-based filtering.',
    longDescription: 'Developed a MERN Stack application for property sales and document sharing. Integrated Elasticsearch for location-based filtering and implemented interactive maps with real-time data rendering. Users can search apartments by area and preferences with real-time results.',
    image: '/placeholder.svg',
    tech: ['React', 'Node.js', 'MongoDB', 'Elasticsearch', 'Maps API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
  {
    id: 5,
    title: 'Detco-Shades',
    description: 'Custom window treatments and shades e-commerce platform with product customization features.',
    longDescription: 'Built a comprehensive e-commerce solution for custom window treatments with product configuration, pricing calculator, and order management. Implemented responsive design and seamless checkout experience.',
    image: '/placeholder.svg',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
  {
    id: 6,
    title: 'Spendify',
    description: 'Personal finance and expense tracking application with analytics and budget management.',
    longDescription: 'Developed a full-stack expense tracking application with real-time analytics, budget planning, and financial insights. Features include category-based expense tracking, visual reports, and monthly budget goals.',
    image: '/placeholder.svg',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 7,
    title: 'AppSaces',
    description: 'Digital workspace platform for team collaboration and project management.',
    longDescription: 'Built a collaborative workspace application featuring project management, team communication, and task tracking. Implemented real-time updates using Socket.IO and integrated file sharing capabilities.',
    image: '/placeholder.svg',
    tech: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Redis'],
    liveUrl: '#',
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of my recent work showcasing full-stack development expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold gradient-text opacity-30">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/30">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary rounded-full text-primary-foreground hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-full hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary/50 rounded text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-secondary/50 rounded text-xs font-medium text-muted-foreground">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card max-w-2xl w-full rounded-2xl p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {selectedProject.longDescription}
            </p>
            <div className="flex gap-4">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-sm"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
