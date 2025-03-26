import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Power, Radar, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/" className="text-xl font-bold tracking-tighter flex items-center">
              <div className="relative mr-2">
                <Radar className="h-6 w-6 text-primary" />
                <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-mono">RFP GLOBAL</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              MARKETPLACE
            </Link>
            <Link to="/enterprise-dashboard" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              ENTERPRISE DASHBOARD
            </Link>
            <Link to="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              INTELLIGENCE
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="rounded-none px-6 text-sm font-mono border-primary/30" 
              asChild
            >
              <Link to="/access">
                <Terminal className="h-4 w-4 mr-2" />
                ACCESS
              </Link>
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
            <Link 
              to="/marketplace" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              MARKETPLACE
            </Link>
            <Link 
              to="/enterprise-dashboard" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              ENTERPRISE DASHBOARD
            </Link>
            <Link 
              to="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              INTELLIGENCE
            </Link>
          </nav>
          <div className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="rounded-none w-full font-mono text-sm border-primary/30" 
              asChild
            >
              <Link to="/access">
                <Terminal className="h-4 w-4 mr-2" />
                ACCESS
              </Link>
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
