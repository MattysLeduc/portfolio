import { ContactForm } from '../components/ContactForm';
import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';
import './ContactPage.css';

export const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await portfolioService.getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div className="page contact-page">
      <div className="container">
        <h1>Contact Me</h1>
        <div className="contact-grid">
          <div className="contact-info">
            {contactInfo && (
              <>
                <h2>Get in Touch</h2>
                {contactInfo.email && (
                  <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                )}
                {contactInfo.phone && (
                  <p><strong>Phone:</strong> <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                )}
                {contactInfo.address && (
                  <p><strong>Address:</strong> {contactInfo.address}</p>
                )}
                {contactInfo.linkedin && (
                  <p><strong>LinkedIn:</strong> <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">Visit Profile</a></p>
                )}
                {contactInfo.github && (
                  <p><strong>GitHub:</strong> <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">Visit Profile</a></p>
                )}
              </>
            )}
          </div>
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
