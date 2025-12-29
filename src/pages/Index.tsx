import { Navbar } from '@/components/Navbar';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Kashif Sohail | MERN Stack Developer & Next.js Expert</title>
        <meta name="description" content="Kashif Sohail is a MERN Stack Developer specializing in Next.js, React, Node.js, and scalable web applications. Building high-performance, SEO-optimized, animated websites using modern JavaScript technologies." />
        <meta name="keywords" content="MERN Stack Developer, Next.js Developer, React Developer, Node.js Developer, Full Stack JavaScript Developer, Remote MERN Developer, GSAP Animations, Web Application Development" />
        <meta name="author" content="Kashif Sohail" />
        <meta name="publisher" content="Kashif Sohail" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://kashifsohail.com" />
        <meta property="og:title" content="Kashif Sohail | MERN Stack Developer" />
        <meta property="og:description" content="Professional MERN Stack Developer specializing in Next.js, React, Node.js, and performance-driven web applications." />
        <meta property="og:site_name" content="Kashif Sohail Portfolio" />
        <meta property="og:image" content="/placeholder.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kashif Sohail - MERN Stack Developer" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kashif Sohail | MERN Stack Developer" />
        <meta name="twitter:description" content="Building scalable, SEO-friendly, and high-performance web applications using MERN stack and Next.js." />
        <meta name="twitter:image" content="/placeholder.svg" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Kashif Sohail",
            jobTitle: "MERN Stack Developer",
            url: "https://kashifsohail.com",
            sameAs: [
              "https://www.linkedin.com/in/kashif-sohail-1737a228a/",
              "https://github.com/kashifsoh678",
            ],
            knowsAbout: [
              "MERN Stack",
              "Next.js",
              "React",
              "Node.js",
              "MongoDB",
              "Web Development",
            ],
          })}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
