import { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Heart } from 'lucide-react';

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/kashifsoh678/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/kashif-sohail-1737a228a/', label: 'LinkedIn' },
];

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <a href="#" className="text-2xl font-bold gradient-text">
              KS<span className="text-foreground">.</span>
            </a>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              Building exceptional web and mobile experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Kashif Sohail. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> and lots of coffee
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-primary text-primary-foreground shadow-lg glow-primary transition-all duration-300 z-50 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};
