
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Power, Radar, Signal, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              <span className="font-typewriter">RFP GLOBAL</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              MARKETPLACE
            </Link>
            <Link to="/enterprise-dashboard" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              ENTERPRISE DASHBOARD
            </Link>
            <Link to="/lender-dashboard" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
              LENDER DASHBOARD
            </Link>
            <Link to="/intelligence" className="text-foreground/80 hover:text-primary transition-colors text-sm font-mono">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-none px-6 text-sm font-mono">
                  <Power className="h-4 w-4 mr-2" />
                  ACTIVATE
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-md border border-primary/30 rounded-none mt-1 min-w-[180px] z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/enterprise-signup" className="flex items-center cursor-pointer py-2 font-mono text-sm">
                    <Radar className="h-4 w-4 mr-2 text-primary" />
                    Enterprise Sign Up
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/lender-signup" className="flex items-center cursor-pointer py-2 font-mono text-sm">
                    <Terminal className="h-4 w-4 mr-2 text-primary" />
                    Lender Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              to="/lender-dashboard" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              LENDER DASHBOARD
            </Link>
            <Link 
              to="/intelligence" 
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
            
            <div className="space-y-2">
              <Link to="/enterprise-signup">
                <Button className="rounded-none w-full font-mono text-sm bg-primary/80 hover:bg-primary">
                  <Radar className="h-4 w-4 mr-2" />
                  Enterprise Sign Up
                </Button>
              </Link>
              
              <Link to="/lender-signup">
                <Button className="rounded-none w-full font-mono text-sm bg-primary/80 hover:bg-primary">
                  <Terminal className="h-4 w-4 mr-2" />
                  Lender Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
