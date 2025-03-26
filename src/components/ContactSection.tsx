
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SendHorizontal, Mail, Phone, MapPin, Terminal, Database } from "lucide-react";

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
    <section className="py-20 relative grid-bg overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 stagger-animate">
            <div className="inline-block mb-4">
              <span className="rfp-badge">
                <Terminal className="h-3 w-3 mr-2" />
                Investment Access Portal
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
              <div className="terminal-card overflow-hidden border-blue-900/50 bg-black/70">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                  <div className="flex-1 text-center text-xs text-muted-foreground font-mono">RFP CONTACT // SECURE CHANNEL</div>
                </div>
                <div className="terminal-content">
                  <div className="mb-4 font-mono text-primary text-sm">
                    <span className="text-muted-foreground">&gt;</span> Initializing contact portal...
                  </div>
                  
                  <div className="text-xs font-mono text-muted-foreground mb-2">SUPPORT CHANNELS</div>
                  
                  <div className="data-grid mb-4">
                    <div className="data-grid-item">
                      <span className="data-label">EMAIL</span>
                      <span className="data-value flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-primary" />
                        info@creditbridge.com
                      </span>
                    </div>
                    <div className="data-grid-item">
                      <span className="data-label">PHONE</span>
                      <span className="data-value flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-primary" />
                        +1 (800) 555-1234
                      </span>
                    </div>
                    <div className="data-grid-item">
                      <span className="data-label">LOCATION</span>
                      <span className="data-value flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-primary" />
                        New York, NY
                      </span>
                    </div>
                    <div className="data-grid-item">
                      <span className="data-label">BUSINESS HOURS</span>
                      <span className="data-value flex items-center">
                        <Database className="h-3 w-3 mr-1 text-primary" />
                        Mon-Fri, 9am-5pm
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs font-mono border border-blue-900/50 bg-blue-900/5 p-3 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/50"></div>
                    <p>
                      Our team of financial experts is ready to assist with your investment questions. Please use the secure form to submit your inquiry...
                      <span className="text-primary blink">_</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 glass-card rounded-none border border-primary/20 bg-background/50 backdrop-blur-sm">
              <div className="p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Terminal className="h-5 w-5 mr-2 text-primary" />
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-none border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-none border-primary/30"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      placeholder="Your phone number (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-none border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell us about your investment goals"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="rounded-none border-primary/30"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-none font-mono"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <SendHorizontal className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
