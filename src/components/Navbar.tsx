
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

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
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold tracking-tighter">
              CreditBridge
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
              Opportunities
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="rounded-full px-6">
              Sign In
            </Button>
            <Button className="rounded-full px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'max-h-screen opacity-100 visible bg-background backdrop-blur-lg shadow-md' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="container mx-auto px-6 py-4 space-y-6">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Opportunities
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          <div className="flex flex-col space-y-4">
            <Button variant="outline" className="rounded-full w-full">
              Sign In
            </Button>
            <Button className="rounded-full w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
