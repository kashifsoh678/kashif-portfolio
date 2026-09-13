import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiDocker, SiGit, SiAmazon, SiRedis, SiNestjs, SiPrisma,
  SiSequelize, SiExpo,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { Smartphone, Globe, Layers, Cloud, Database, Monitor, Server } from 'lucide-react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type SkillIcon = IconType | LucideIcon;

interface Skill {
  name: string;
  icon: SkillIcon;
  level: number;
  color: string; // hex accent for this skill
}

interface Category {
  id: string;
  label: string;
  gradient: string;        // for tab active state
  iconBg: string;          // icon bg tint
  ringColor: string;       // SVG ring stroke
  skills: Skill[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    gradient: 'from-primary/80 to-primary',
    iconBg: 'bg-primary/10',
    ringColor: 'hsl(var(--primary))',
    skills: [
      { name: 'React',          icon: SiReact,      level: 95, color: 'var(--primary)' },
      { name: 'Next.js',        icon: SiNextdotjs,  level: 90, color: 'var(--primary)' },
      { name: 'TypeScript',     icon: SiTypescript, level: 90, color: 'var(--primary)' },
      { name: 'Tailwind CSS',   icon: SiTailwindcss,level: 95, color: 'var(--primary)' },
      { name: 'Redux',          icon: Layers,       level: 88, color: 'var(--primary)' },
      { name: 'MUI / Ant Design', icon: Monitor,   level: 85, color: 'var(--primary)' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    gradient: 'from-accent/80 to-accent',
    iconBg: 'bg-accent/10',
    ringColor: 'hsl(var(--accent))',
    skills: [
      { name: 'Node.js',    icon: SiNodedotjs, level: 92, color: 'var(--accent)' },
      { name: 'Express.js', icon: SiExpress,   level: 90, color: 'var(--accent)' },
      { name: 'NestJS',     icon: SiNestjs,    level: 85, color: 'var(--accent)' },
      { name: 'REST APIs',  icon: Server,      level: 95, color: 'var(--accent)' },
      { name: 'Socket.IO',  icon: Globe,       level: 85, color: 'var(--accent)' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    gradient: 'from-primary/80 to-primary',
    iconBg: 'bg-primary/10',
    ringColor: 'hsl(var(--primary))',
    skills: [
      { name: 'MongoDB',    icon: SiMongodb,   level: 90, color: 'var(--primary)' },
      { name: 'PostgreSQL', icon: SiPostgresql,level: 88, color: 'var(--primary)' },
      { name: 'Redis',      icon: SiRedis,     level: 80, color: 'var(--primary)' },
      { name: 'Prisma',     icon: SiPrisma,    level: 85, color: 'var(--primary)' },
      { name: 'Sequelize',  icon: SiSequelize, level: 85, color: 'var(--primary)' },
      { name: 'Mongoose',   icon: Database,    level: 90, color: 'var(--primary)' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Cloud',
    gradient: 'from-accent/80 to-accent',
    iconBg: 'bg-accent/10',
    ringColor: 'hsl(var(--accent))',
    skills: [
      { name: 'React Native',        icon: TbBrandReactNative, level: 85, color: 'var(--accent)' },
      { name: 'Expo',                icon: SiExpo,             level: 82, color: 'var(--accent)' },
      { name: 'Play Store',          icon: Smartphone,         level: 80, color: 'var(--accent)' },
      { name: 'AWS (EC2, S3, RDS)',  icon: SiAmazon,           level: 80, color: 'var(--accent)' },
      { name: 'Git',                 icon: SiGit,              level: 95, color: 'var(--accent)' },
      { name: 'Docker',              icon: SiDocker,           level: 78, color: 'var(--accent)' },
    ],
  },
];

// ─── Circular Progress Ring ───────────────────────────────────────────────────
interface RingProps {
  level: number;
  color: string;
  size?: number;
  stroke?: number;
}

const ProgressRing = ({ level, color, size = 56, stroke = 4 }: RingProps) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width={size} height={size} className="skill-ring absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-border/40"
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`hsl(${color})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference} // starts at 0, animated by GSAP
        data-target={offset}
        className="skill-arc"
        style={{ filter: `drop-shadow(0 0 4px hsl(${color} / 0.5))` }}
      />
    </svg>
  );
};

// ─── Skill Card ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const Icon = skill.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

  return (
    <div
      className="skill-card group relative glass-card-hover rounded-2xl p-5 flex items-center gap-4 cursor-default overflow-hidden"
    >
      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 50%, hsl(${skill.color} / 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Icon with ring */}
      <div className="relative shrink-0 w-14 h-14">
        <ProgressRing level={skill.level} color={skill.color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            style={{ color: `hsl(${skill.color})` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-sm text-foreground truncate">{skill.name}</span>
          <span
            className="text-xs font-bold ml-2 shrink-0 font-mono"
            style={{ color: `hsl(${skill.color})` }}
          >
            {skill.level}%
          </span>
        </div>

        {/* Bar */}
        <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
          <div
            className="skill-bar h-full rounded-full"
            data-level={skill.level}
            style={{
              width: 0,
              background: `linear-gradient(90deg, hsl(${skill.color} / 0.8), hsl(${skill.color} / 0.4))`,
              boxShadow: `0 0 8px hsl(${skill.color} / 0.3)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const SkillsSection = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const tabsRef      = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('frontend');
  const animCtxRef   = useRef<gsap.Context | null>(null);

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  // ── Particle canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.3,
        vy:    (Math.random() - 0.5) * 0.3,
        r:     Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(186, 100%, 50%, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(186, 100%, 50%, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── Scroll entrance (header + tabs) ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      // Tabs
      gsap.fromTo(
        tabsRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Grid animation (cards + rings + bars) ────────────────────────────────
  const animateGrid = useCallback(() => {
    // Kill previous context
    if (animCtxRef.current) animCtxRef.current.revert();

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.skill-card') ?? [];

      // Cards stagger in
      gsap.fromTo(
        Array.from(cards),
        { y: 40, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.05 }
      );

      // Animate SVG arcs
      const arcs = gridRef.current?.querySelectorAll<SVGCircleElement>('.skill-arc') ?? [];
      arcs.forEach((arc) => {
        const target = parseFloat(arc.getAttribute('data-target') ?? '0');
        const circumference = parseFloat(arc.getAttribute('stroke-dasharray') ?? '0');
        gsap.fromTo(
          arc,
          { strokeDashoffset: circumference },
          { strokeDashoffset: target, duration: 1.1, ease: 'power3.out', delay: 0.15 }
        );
      });

      // Animate bars
      const bars = gridRef.current?.querySelectorAll<HTMLElement>('.skill-bar') ?? [];
      bars.forEach((bar) => {
        const level = bar.getAttribute('data-level') ?? '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          { width: `${level}%`, duration: 1.0, ease: 'power3.out', delay: 0.2 }
        );
      });
    }, gridRef);

    animCtxRef.current = ctx;
  }, []);

  // Run on tab change
  useEffect(() => {
    animateGrid();
    return () => {
      if (animCtxRef.current) animCtxRef.current.revert();
    };
  }, [activeTab, animateGrid]);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">

      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      {/* Static glow blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Header ────────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Technical Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive toolkit for building modern, scalable web and mobile applications
          </p>
        </div>

        {/* ── Category Tabs ─────────────────────────────────────── */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border ${
                  isActive
                    ? 'text-white border-transparent shadow-lg scale-105'
                    : 'text-muted-foreground border-border/50 bg-secondary/30 hover:border-primary/40 hover:text-foreground hover:scale-102'
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
                  boxShadow: `0 8px 24px hsl(var(--primary) / 0.35)`,
                } : {}}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-pulse-glow"
                    style={{ background: `linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--accent)/0.3))` }} />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Active Category label ─────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: `linear-gradient(90deg, transparent, ${activeCategory.ringColor})` }}
          />
          <span
            className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border"
            style={{ color: activeCategory.ringColor, borderColor: `${activeCategory.ringColor}40`, background: `${activeCategory.ringColor}10` }}
          >
            {activeCategory.label}
          </span>
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: `linear-gradient(90deg, ${activeCategory.ringColor}, transparent)` }}
          />
        </div>

        {/* ── Skills Grid ───────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeCategory.skills.map((skill, i) => (
            <SkillCard key={`${activeTab}-${skill.name}`} skill={skill} index={i} />
          ))}
        </div>

        {/* ── Bottom stat bar ───────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Technologies',    value: '20+' },
            { label: 'Years Experience',value: '5+' },
            { label: 'Projects Shipped', value: '20+' },
            { label: 'Uptime Delivered', value: '99%' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <p className="text-3xl font-extrabold gradient-text mb-1">{value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
