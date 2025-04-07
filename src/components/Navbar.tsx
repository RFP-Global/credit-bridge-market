
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Radar, Signal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { mainMenuItems, getAccessButton } from '@/config/navConfig';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine if user is coming from lender dashboard based on the URL path
  const isLenderRole = location.pathname.includes('lender-dashboard');

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

  // Determine the dashboard route based on user role
  const dashboardRoute = isLenderRole ? '/lender-dashboard' : '/enterprise-dashboard';
  const accessButton = getAccessButton();

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-md border-b border-primary/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between pt-[25px]">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center">
              <div className="relative mr-2">
                <Radar className="h-6 w-6 text-primary" />
                <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-typewriter">RFP GLOBAL</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="rounded-none px-6 text-sm font-mono border-primary/30" 
              asChild
            >
              <Link to={accessButton.path}>
                {accessButton.icon}
                {accessButton.title}
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 hover:bg-primary/10 rounded-sm focus:outline-none">
                <div className="flex flex-col gap-1">
                  <div className="h-0.5 w-5 bg-foreground/80"></div>
                  <div className="h-0.5 w-5 bg-foreground/80"></div>
                  <div className="h-0.5 w-5 bg-foreground/80"></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border border-primary/20 rounded-none w-48">
                {mainMenuItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.title} 
                    asChild 
                    className="font-mono text-sm focus:bg-primary/10 focus:text-primary"
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
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
            {mainMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.path} 
                className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-primary/10 font-mono text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="rounded-none w-full font-mono text-sm border-primary/30" 
              asChild
            >
              <Link to={accessButton.path}>
                {accessButton.icon}
                {accessButton.title}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
