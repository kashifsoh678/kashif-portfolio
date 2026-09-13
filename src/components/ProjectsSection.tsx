import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github, X, Filter } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Jump Recruiter',
    category: 'Full-Stack',
    description: 'A U.S.-based recruitment platform enhancing the job application process with dual interfaces for jobseekers and employers.',
    longDescription: 'Contributed to the development of a recruitment platform using Next.js, React, Laravel, and PostgreSQL. Developed dynamic, responsive user interfaces using React and TypeScript. Integrated RESTful APIs for real-time job listings and applications. Created a customizable CV builder and advanced job search filters.',
    gradient: 'from-cyan-500/30 via-blue-500/20 to-purple-500/30',
    accent: '#00d4ff',
    tech: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PostgreSQL', 'REST APIs'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 2,
    title: 'JumpResume Builder',
    category: 'Full-Stack',
    description: 'An AI-assisted resume creation platform with drag-and-drop editing and multiple profile support.',
    longDescription: 'Led UI development using Next.js and Laravel with PostgreSQL. Implemented drag-and-drop resume editing with AI-based suggestions to assist users in resume optimization. Built resume parsing functionality to extract details from uploaded files.',
    gradient: 'from-violet-500/30 via-purple-500/20 to-pink-500/30',
    accent: '#7c3aed',
    tech: ['Next.js', 'Laravel', 'PostgreSQL', 'AI Integration', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 3,
    title: 'Tredella',
    category: 'E-Commerce',
    description: 'An Ecommerce solution for wholesale and retail markets with dedicated portals for sellers and administrators.',
    longDescription: 'Built a scalable Ecommerce platform with Next.js, Node.js, Express.js, PostgreSQL, Sequelize, and TypeScript. Developed responsive web-applications for both buyer and seller. Implemented dedicated portals with performance optimization and user role management.',
    gradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
    accent: '#10b981',
    tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 4,
    title: 'Dira-Immobilier',
    category: 'Full-Stack',
    description: 'A real estate platform with map-based property search and location-based filtering.',
    longDescription: 'Developed a MERN Stack application for property sales and document sharing. Integrated Elasticsearch for location-based filtering and implemented interactive maps with real-time data rendering. Users can search apartments by area and preferences with real-time results.',
    gradient: 'from-orange-500/30 via-amber-500/20 to-yellow-500/30',
    accent: '#f59e0b',
    tech: ['React', 'Node.js', 'MongoDB', 'Elasticsearch', 'Maps API'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
  {
    id: 5,
    title: 'Detco-Shades',
    category: 'E-Commerce',
    description: 'Custom window treatments and shades e-commerce platform with product customization features.',
    longDescription: 'Built a comprehensive e-commerce solution for custom window treatments with product configuration, pricing calculator, and order management. Implemented responsive design and seamless checkout experience.',
    gradient: 'from-rose-500/30 via-pink-500/20 to-fuchsia-500/30',
    accent: '#f43f5e',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
  {
    id: 6,
    title: 'Spendify',
    category: 'Full-Stack',
    description: 'Personal finance and expense tracking application with analytics and budget management.',
    longDescription: 'Developed a full-stack expense tracking application with real-time analytics, budget planning, and financial insights. Features include category-based expense tracking, visual reports, and monthly budget goals.',
    gradient: 'from-sky-500/30 via-blue-500/20 to-indigo-500/30',
    accent: '#0ea5e9',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: true,
  },
  {
    id: 7,
    title: 'AppSaces',
    category: 'Full-Stack',
    description: 'Digital workspace platform for team collaboration and project management.',
    longDescription: 'Built a collaborative workspace application featuring project management, team communication, and task tracking. Implemented real-time updates using Socket.IO and integrated file sharing capabilities.',
    gradient: 'from-indigo-500/30 via-violet-500/20 to-purple-500/30',
    accent: '#6366f1',
    tech: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Redis'],
    liveUrl: null,
    githubUrl: 'https://github.com/kashifsoh678/',
    featured: false,
  },
];

const filterTabs = ['All', 'Featured', 'Full-Stack', 'E-Commerce'];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return p.featured;
    return p.category === activeFilter;
  });

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

  // Re-animate on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeFilter]);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of my recent work showcasing full-stack development expertise
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
              }`}
            >
              {tab === 'All' && <Filter className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:shadow-primary/30 border border-border/50 hover:border-primary/50"
              onClick={() => setSelectedProject(project)}
            >
              {/* Visual header */}
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Project initial monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-6xl font-black opacity-20 select-none"
                    style={{ color: project.accent }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </div>
                {/* Dot cluster decoration */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {project.tech.slice(0, 4).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full opacity-60"
                      style={{ backgroundColor: project.accent, animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/30">
                    ★ Featured
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-full hover:scale-110 hover:bg-primary/20 hover:text-primary transition-all"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform"
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-secondary/80 rounded-full text-muted-foreground shrink-0 ml-2">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary/50 rounded-md text-xs font-medium text-muted-foreground border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card max-w-2xl w-full rounded-2xl overflow-hidden animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header gradient */}
            <div className={`h-32 bg-gradient-to-br ${selectedProject.gradient} relative flex items-end p-6`}>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />
              <h3 className="text-2xl font-bold text-white relative z-10">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-8">
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="flex gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
