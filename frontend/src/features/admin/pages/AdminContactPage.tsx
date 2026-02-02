import { useEffect, useState } from "react";
import { getContactInfoAdmin } from "../../contact/api/admin/getContactInfoAdmin";
import { updateContactInfo } from "../../contact/api/admin/updateContactInfo";
import type { ContactInfoRequestModel } from "../../contact/models/ContactInfoRequestModel";
import "../styles/admin-common.css";
import "./AdminContactPage.css";

export const AdminContactPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState<ContactInfoRequestModel>({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const data = await getContactInfoAdmin();
      setFormData({
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        website: data.website || "",
      });
    } catch (error) {
      console.error("Error fetching contact info:", error);
      showMessage("error", "Failed to load contact info");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateContactInfo(formData);
      showMessage("success", "Contact information updated successfully");
    } catch (error) {
      console.error("Error updating contact info:", error);
      showMessage("error", "Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Contact Information</h1>
        </div>
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading contact info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Contact Information</h1>
          <p>Update the contact details shown on your public site.</p>
        </div>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1 (555) 555-5555"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="City, Country"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            placeholder="https://yourwebsite.com"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
