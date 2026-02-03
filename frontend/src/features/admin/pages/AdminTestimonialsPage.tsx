import { useEffect, useState } from 'react';
import { getAllTestimonials } from '../../testimonials/api/admin/getAllTestimonials';
import { approveTestimonial } from '../../testimonials/api/admin/approveTestimonial';
import { rejectTestimonial } from '../../testimonials/api/admin/rejectTestimonial';
import { deleteTestimonial } from '../../testimonials/api/admin/deleteTestimonial';
import type { TestimonialResponseModel } from '../../testimonials/models/TestimonialResponseModel';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedField } from '@/utils/localization';
import './AdminTestimonialsPage.css';

export const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialResponseModel[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Error approving testimonial:', error);
    }
  };

  const handleReject = async (id: string) => {
    if (rejectingId === id) {
      if (!rejectReason.trim()) {
        alert('Please enter a rejection reason');
        return;
      }
      try {
        await rejectTestimonial(id, rejectReason);
        setRejectingId(null);
        setRejectReason('');
        fetchTestimonials();
      } catch (error) {
        console.error('Error rejecting testimonial:', error);
      }
    } else {
      setRejectingId(id);
      setRejectReason('');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteTestimonial(id);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>{t('testimonialsTitle')}</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('description')}</th>
            <th>{t('testimonialsRating')}</th>
            <th>{t('status')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.testimonialId}>
              <td>{testimonial.authorName}</td>
              <td>{(getLocalizedField(testimonial, 'content', language) || testimonial.content)?.substring(0, 50)}...</td>
              <td>{'⭐'.repeat(testimonial.rating)}</td>
              <td>
                <span
                  style={{
                    color:
                      testimonial.status === 'APPROVED'
                        ? '#28a745'
                        : testimonial.status === 'REJECTED'
                          ? '#dc3545'
                          : '#ffc107',
                  }}
                >
                  {testimonial.status || 'PENDING'}
                </span>
              </td>
              <td>
                {testimonial.status === 'PENDING' && (
                  <>
                    <button onClick={() => handleApprove(testimonial.testimonialId)} className="btn-secondary">
                      {t('approve')}
                    </button>
                    {rejectingId === testimonial.testimonialId ? (
                      <div className="reject-form">
                        <input
                          type="text"
                          placeholder={t('rejectionReason')}
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <button onClick={() => handleReject(testimonial.testimonialId)} className="btn-danger">
                          {t('confirmReject')}
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleReject(testimonial.testimonialId)} className="btn-danger">
                        {t('reject')}
                      </button>
                    )}
                  </>
                )}
                <button onClick={() => handleDelete(testimonial.testimonialId)} className="btn-danger">
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
