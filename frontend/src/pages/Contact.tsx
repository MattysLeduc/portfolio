import { useState, useEffect } from 'react';
import { getContactInfo } from '../features/contact/api/getContactInfo';
import { sendContactMessage } from '../features/contact/api/sendContactMessage';
import type { ContactInfoResponseModel } from '../features/contact/models/ContactInfoResponseModel';
import type { ContactMessageRequestModel } from '../features/contact/models/ContactMessageRequestModel';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoResponseModel | null>(null);
  const [formData, setFormData] = useState<ContactMessageRequestModel>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const data = await getContactInfo();
      setContactInfo(data);
    } catch (error) {
      console.error('Failed to load contact info', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="contact-page">
      <h1>{t('contact')}</h1>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          {contactInfo && (
            <>
              {contactInfo.email && <p>Email: {contactInfo.email}</p>}
              {contactInfo.phone && <p>Phone: {contactInfo.phone}</p>}
              {contactInfo.address && <p>Address: {contactInfo.address}</p>}
              <div className="social-links">
                {contactInfo.linkedin && <a href={contactInfo.linkedin}>LinkedIn</a>}
                {contactInfo.github && <a href={contactInfo.github}>GitHub</a>}
                {contactInfo.website && <a href={contactInfo.website}>Website</a>}
              </div>
            </>
          )}
        </div>

        <div className="contact-form">
          <h2>Send a Message</h2>
          {sent && <div className="success-message">Message sent successfully!</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t('name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('subject')}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <textarea
              placeholder={t('message')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
            />
            <button type="submit" className="btn-primary">{t('send')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
