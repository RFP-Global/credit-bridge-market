import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Terminal, Power } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-md border-b border-primary/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold tracking-tighter flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              <span className="font-mono">RFP GLOBAL</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              ASSETS
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              PROTOCOLS
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              INTELLIGENCE
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              CONTACT
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="rounded-none px-6 text-sm font-mono border-primary/30">
              <Terminal className="h-4 w-4 mr-2" />
              ACCESS
            </Button>
            <Button className="rounded-none px-6 text-sm font-mono">
              <Power className="h-4 w-4 mr-2" />
              ACTIVATE
            </Button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'max-h-screen opacity-100 visible bg-background/95 backdrop-blur-lg border-b border-primary/20' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="container mx-auto px-6 py-4 space-y-6">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              ASSETS
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              PROTOCOLS
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              INTELLIGENCE
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </a>
          </nav>
          <div className="flex flex-col space-y-4">
            <Button variant="outline" className="rounded-none w-full font-mono text-sm border-primary/30">
              <Terminal className="h-4 w-4 mr-2" />
              ACCESS
            </Button>
            <Button className="rounded-none w-full font-mono text-sm">
              <Power className="h-4 w-4 mr-2" />
              ACTIVATE
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
