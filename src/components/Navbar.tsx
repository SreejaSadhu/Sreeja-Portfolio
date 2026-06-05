import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Github, Code2, Linkedin, Menu, X, User, Cpu, Briefcase, MessageSquare } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
      if (window.scrollY > 50) setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", icon: <User className="h-5 w-5" /> },
    { label: "Tech", href: "#tech", icon: <Cpu className="h-5 w-5" /> },
    { label: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Connect", href: "#connect", icon: <MessageSquare className="h-5 w-5" /> },
  ];

  // We removed externalLinks as requested so the nav is perfectly clean.

  const floatingNavItems = navLinks.map(link => ({
    name: link.label,
    link: link.href,
    icon: link.icon
  }));

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Original Embedded Navbar - Visible only at Top */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isTop ? 0 : -20,
          opacity: isTop ? 1 : 0,
          pointerEvents: isTop ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 py-10 bg-transparent"
      >
        <div className="w-full px-8 md:px-12 relative flex items-center justify-between">
          {/* Logo - Left */}
          <a href="#" className="text-2xl font-medium tracking-tight text-os-tealdark font-sans z-10 w-[200px]">
            Sreeja
          </a>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-os-tealdark hover:opacity-70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* External Links & Mobile Menu Button - Right */}
          <div className="flex items-center justify-end gap-6 z-10 w-[200px]">
            {/* Desktop Right: Empty or just to balance */}
            <div className="hidden md:flex items-center gap-4 text-os-walnut/60">
              {/* Removed redundant connect icons from navbar */}
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-os-tealdark transition-opacity hover:opacity-70"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Floating Navbar - Visible on Scroll */}
      <FloatingNav
        navItems={floatingNavItems}
        className="font-sans border-border"
      />

      {/* Mobile Menu Overlay (Only for Top State) */}
      <AnimatePresence>
        {mobileMenuOpen && isTop && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-lg pt-24 md:hidden"
          >
            <div className="container-wide py-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-2xl font-medium text-foreground hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
