import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SendHorizontal, Mail, Phone, MapPin, Radar, Terminal } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll be in touch shortly.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden grid-bg" id="contact">
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 stagger-animate">
            <div className="inline-block mb-4">
              <span className="rfp-badge">
                <Radar className="h-3 w-3 mr-2" />
                Contact Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Start Your Investment Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our investment opportunities? Reach out to our team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="terminal-card overflow-hidden border-blue-900/50 bg-black/70 p-8 h-full flex flex-col justify-center">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                  <div className="flex-1 text-center text-xs text-muted-foreground font-mono">CONTACT INFORMATION</div>
                </div>
                
                <div className="space-y-8 pt-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-primary">Email Us</h3>
                      <p className="text-muted-foreground">
                        Our team is here to help
                      </p>
                      <a 
                        href="mailto:info@creditbridge.com" 
                        className="text-sky-300 hover:text-sky-200 font-medium transition-colors mt-1 block"
                      >
                        info@creditbridge.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-primary">Call Us</h3>
                      <p className="text-muted-foreground">
                        Mon-Fri from 9am to 5pm
                      </p>
                      <a 
                        href="tel:+18005551234" 
                        className="text-sky-300 hover:text-sky-200 font-medium transition-colors mt-1 block"
                      >
                        +1 (800) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-primary">Visit Us</h3>
                      <p className="text-muted-foreground">
                        Our headquarters location
                      </p>
                      <address className="not-italic text-sky-300 mt-1">
                        100 Financial Street<br />
                        New York, NY 10001
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="terminal-card overflow-hidden border-blue-900/50 bg-black/70">
                <div className="p-8">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                    <div className="flex-1 text-center text-xs text-muted-foreground font-mono">MESSAGE FORM // SECURE TRANSMISSION</div>
                  </div>
                  
                  <div className="pt-6">
                    <div className="mb-4 font-mono text-primary text-sm">
                      <span className="text-muted-foreground">&gt;</span> Initialize contact form...
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sky-300 font-mono">Full Name</Label>
                          <Input 
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-blue-900/20 border-blue-900/50 text-white placeholder:text-white/50 rounded-none focus:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sky-300 font-mono">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-blue-900/20 border-blue-900/50 text-white placeholder:text-white/50 rounded-none focus:ring-primary/50"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sky-300 font-mono">Phone Number</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          placeholder="Your phone number (optional)"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-blue-900/20 border-blue-900/50 text-white placeholder:text-white/50 rounded-none focus:ring-primary/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sky-300 font-mono">Message</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          placeholder="Tell us about your investment goals"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="bg-blue-900/20 border-blue-900/50 text-white placeholder:text-white/50 rounded-none focus:ring-primary/50"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-none border border-primary/30 group hover:bg-primary/10 transition-colors"
                        variant="outline"
                      >
                        {loading ? "Sending..." : "Send Message"}
                        <SendHorizontal className="ml-2 h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
