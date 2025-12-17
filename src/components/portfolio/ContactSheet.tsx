import { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSheet = ({ isOpen, onClose }: ContactSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    projectDetails: ''
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectDetails) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', budget: '', projectDetails: '' });
      handleClose();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const budgetOptions = ["< $5k", "$5k - $10k", "$10k - $25k", "$25k+", "Undefined"];

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-colors duration-500 ${isVisible ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent pointer-events-none'}`}>
      <div className="absolute inset-0" onClick={handleClose}></div>
      <div className={`relative w-full md:w-[60vw] lg:w-[50vw] h-full bg-surface-dark text-secondary-foreground overflow-y-auto shadow-2xl transform transition-transform duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={handleClose} className="absolute top-6 right-6 z-50 p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-8 md:p-16 pt-24 min-h-full flex flex-col">
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-none tracking-tighter mb-4 text-primary">
            Let's Build<br />The Future.
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-md">
            Fill in the details below. I'll analyze your request and get back to you with a strategic roadmap.
          </p>

          <form className="space-y-12 flex-1" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-primary text-xs font-mono uppercase tracking-widest mb-2">01. What's your name? *</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border py-4 text-2xl md:text-3xl font-bold focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/30" 
              />
            </div>

            <div className="group">
              <label className="block text-primary text-xs font-mono uppercase tracking-widest mb-2">02. Where can I reach you? *</label>
              <input 
                type="email" 
                placeholder="john@company.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border py-4 text-2xl md:text-3xl font-bold focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/30" 
              />
            </div>

            <div className="group">
              <label className="block text-primary text-xs font-mono uppercase tracking-widest mb-6">03. What's the budget range?</label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((budget, i) => (
                  <label key={i} className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="budget" 
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="peer sr-only" 
                    />
                    <span className="block px-6 py-3 border border-border rounded-full text-sm font-bold uppercase hover:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary transition-all">
                      {budget}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-primary text-xs font-mono uppercase tracking-widest mb-2">04. Tell me about the project *</label>
              <textarea 
                rows={4} 
                placeholder="Brief description of your goals, challenges, and timeline..." 
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border py-4 text-xl md:text-2xl font-medium focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/30 resize-none"
              ></textarea>
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-primary text-primary-foreground font-display uppercase tracking-widest text-lg flex items-center justify-center gap-3 hover:bg-secondary-foreground transition-colors duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Submit Proposal <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSheet;
