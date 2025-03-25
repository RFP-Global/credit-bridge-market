
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SendHorizontal, Mail, Phone, MapPin } from "lucide-react";

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
    <section className="py-20 bg-gradient-to-b from-secondary to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 stagger-animate">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Start Your Investment Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our investment opportunities? Reach out to our team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      Our team is here to help
                    </p>
                    <a 
                      href="mailto:info@creditbridge.com" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors mt-1 block"
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
                    <h3 className="text-lg font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      Mon-Fri from 9am to 5pm
                    </p>
                    <a 
                      href="tel:+18005551234" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors mt-1 block"
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
                    <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      Our headquarters location
                    </p>
                    <address className="not-italic text-primary/80 mt-1">
                      100 Financial Street<br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
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
                        className="rounded-lg"
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
                        className="rounded-lg"
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
                      className="rounded-lg"
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
                      className="rounded-lg"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg"
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
