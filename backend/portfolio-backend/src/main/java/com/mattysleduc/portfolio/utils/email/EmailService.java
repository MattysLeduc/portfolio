package com.mattysleduc.portfolio.utils.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.to}")
    private String toEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(String name, String email, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("New Contact Form Message: " + (subject != null ? subject : "No Subject"));
            helper.setReplyTo(email);

            String htmlBody = buildHtmlEmail(name, email, subject, message);
            helper.setText(htmlBody, true);

            mailSender.send(mimeMessage);
            logger.info("Contact notification email sent successfully to {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send contact notification email", e);
            // Don't throw exception - we don't want to fail the contact form submission if email fails
        } catch (MailException e) {
            logger.error("Failed to send contact notification email", e);
        }
    }

    private String buildHtmlEmail(String name, String email, String subject, String message) {
        return "<!DOCTYPE html>\n" +
                "<html style=\"font-family: Arial, sans-serif;\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <style>\n" +
                "        body { background-color: #f5f5f5; margin: 0; padding: 20px; }\n" +
                "        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }\n" +
                "        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }\n" +
                "        .header h1 { margin: 0; font-size: 24px; }\n" +
                "        .content { padding: 30px; }\n" +
                "        .field { margin-bottom: 25px; }\n" +
                "        .field-label { font-weight: bold; color: #333; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: block; }\n" +
                "        .field-value { color: #555; font-size: 15px; line-height: 1.6; word-wrap: break-word; }\n" +
                "        .message-box { background-color: #f9f9f9; border-left: 4px solid #667eea; padding: 15px; border-radius: 4px; }\n" +
                "        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }\n" +
                "        a { color: #667eea; text-decoration: none; }\n" +
                "        a:hover { text-decoration: underline; }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <div class=\"header\">\n" +
                "            <h1>📧 New Contact Message</h1>\n" +
                "            <p style=\"margin: 10px 0 0 0; opacity: 0.9;\">From your portfolio website</p>\n" +
                "        </div>\n" +
                "        <div class=\"content\">\n" +
                "            <div class=\"field\">\n" +
                "                <span class=\"field-label\">👤 From</span>\n" +
                "                <div class=\"field-value\">" + escapeHtml(name) + "</div>\n" +
                "            </div>\n" +
                "            <div class=\"field\">\n" +
                "                <span class=\"field-label\">📧 Email</span>\n" +
                "                <div class=\"field-value\"><a href=\"mailto:" + escapeHtml(email) + "\">" + escapeHtml(email) + "</a></div>\n" +
                "            </div>\n" +
                "            <div class=\"field\">\n" +
                "                <span class=\"field-label\">📝 Subject</span>\n" +
                "                <div class=\"field-value\">" + (subject != null && !subject.isEmpty() ? escapeHtml(subject) : "<em>No subject provided</em>") + "</div>\n" +
                "            </div>\n" +
                "            <div class=\"field\">\n" +
                "                <span class=\"field-label\">💬 Message</span>\n" +
                "                <div class=\"field-value message-box\">" + escapeHtml(message).replace("\n", "<br>") + "</div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <div class=\"footer\">\n" +
                "            <p>This is an automated notification from your portfolio website.</p>\n" +
                "            <p>You can reply directly to this email to respond to " + escapeHtml(name) + ".</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }

    private String escapeHtml(String text) {
        if (text == null) {
            return "";
        }
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
