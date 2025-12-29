import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiDocker, SiGit, SiAmazon, SiRedis, SiNestjs, SiPrisma,
  SiSequelize, SiExpo
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    color: 'primary',
    skills: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'Next.js', icon: SiNextdotjs, level: 90 },
      { name: 'TypeScript', icon: SiTypescript, level: 90 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95 },
      { name: 'Redux', icon: null, level: 88 },
      { name: 'MUI / Ant Design', icon: null, level: 85 },
    ],
  },
  {
    title: 'Backend',
    color: 'accent',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 92 },
      { name: 'Express.js', icon: SiExpress, level: 90 },
      { name: 'NestJS', icon: SiNestjs, level: 85 },
      { name: 'REST APIs', icon: null, level: 95 },
      { name: 'Socket.IO', icon: null, level: 85 },
    ],
  },
  {
    title: 'Databases & ORMs',
    color: 'primary',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 90 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 88 },
      { name: 'Redis', icon: SiRedis, level: 80 },
      { name: 'Prisma', icon: SiPrisma, level: 85 },
      { name: 'Sequelize', icon: SiSequelize, level: 85 },
      { name: 'Mongoose', icon: null, level: 90 },
    ],
  },
  {
    title: 'Mobile & Cloud',
    color: 'accent',
    skills: [
      { name: 'React Native', icon: TbBrandReactNative, level: 85 },
      { name: 'Expo', icon: SiExpo, level: 82 },
      { name: 'PlayStore Deployments', icon: Smartphone, level: 80 },
      { name: 'AWS (EC2, S3, RDS)', icon: SiAmazon, level: 80 },
      { name: 'Git', icon: SiGit, level: 95 },
      { name: 'Docker', icon: SiDocker, level: 78 },
    ],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate progress bars
      gsap.utils.toArray<HTMLDivElement>('.skill-progress').forEach((bar) => {
        const level = bar.getAttribute('data-level') || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative ">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Technical Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive toolkit for building modern, scalable web and mobile applications
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="glass-card-hover rounded-2xl p-8"
            >
              <h3 className={`text-2xl font-bold mb-6 ${category.color === 'primary' ? 'text-primary' : 'text-accent'
                }`}>
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {skill.icon && (
                          <skill.icon className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`skill-progress h-full rounded-full ${category.color === 'primary'
                          ? 'bg-gradient-to-r from-primary to-primary/70'
                          : 'bg-gradient-to-r from-accent to-accent/70'
                          }`}
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
