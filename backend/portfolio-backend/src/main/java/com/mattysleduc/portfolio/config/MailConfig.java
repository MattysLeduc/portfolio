package com.mattysleduc.portfolio.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@EnableConfigurationProperties(MailProperties.class)
public class MailConfig {

    private static final Logger logger = LoggerFactory.getLogger(MailConfig.class);

    public MailConfig(MailProperties mailProperties) {
        logger.info("Initializing Mail Configuration");
        logger.info("  Host: {}", getEnvOrDefault("MAIL_HOST", "smtp.gmail.com"));
        logger.info("  Port: {}", getEnvOrDefault("MAIL_PORT", "587"));
        logger.info("  Username configured: {}", !getEnvOrDefault("MAIL_USERNAME", "").isEmpty());
        logger.info("  Password configured: {}", !getEnvOrDefault("MAIL_PASSWORD", "").isEmpty());
    }

    private static String getEnvOrDefault(String key, String defaultValue) {
        String value = System.getenv(key);
        return value != null && !value.isEmpty() ? value : defaultValue;
    }
}
