import { ContactForm } from '../components/ContactForm';
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { getContactInfo } from '../api/getContactInfo';
import type { ContactInfoResponseModel } from '../models/ContactInfoResponseModel';

export const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoResponseModel | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-mono mb-2">GET IN TOUCH</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Contact Me</h1>
            <p className="text-cyan-300">Have a project in mind or just want to chat? I'd love to hear from you!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="order-2 md:order-1">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="order-1 md:order-2 space-y-6">
              {contactInfo?.email && (
                <div className="flex gap-4 items-start p-4 border border-cyan-500/30 rounded hover:border-cyan-500/60 transition-all">
                  <Mail className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-cyan-400 text-sm font-mono mb-1">EMAIL</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-cyan-400 transition-colors break-all">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo?.phone && (
                <div className="flex gap-4 items-start p-4 border border-cyan-500/30 rounded hover:border-cyan-500/60 transition-all">
                  <Phone className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-cyan-400 text-sm font-mono mb-1">PHONE</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-cyan-400 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo?.address && (
                <div className="flex gap-4 items-start p-4 border border-cyan-500/30 rounded hover:border-cyan-500/60 transition-all">
                  <MapPin className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-cyan-400 text-sm font-mono mb-1">LOCATION</p>
                    <p className="text-white">{contactInfo.address}</p>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="pt-4 border-t border-cyan-500/20">
                <p className="text-cyan-400 text-sm font-mono mb-4">Connect With Me</p>
                <div className="space-y-3">
                  {contactInfo?.github && (
                    <a
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 items-center text-white hover:text-cyan-400 transition-colors group"
                    >
                      <Github size={20} className="group-hover:text-cyan-400" />
                      GitHub
                    </a>
                  )}
                  {contactInfo?.linkedin && (
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 items-center text-white hover:text-cyan-400 transition-colors group"
                    >
                      <Linkedin size={20} className="group-hover:text-cyan-400" />
                      LinkedIn
                    </a>
                  )}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-center text-white hover:text-cyan-400 transition-colors group"
                  >
                    <Twitter size={20} className="group-hover:text-cyan-400" />
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
