package com.mattysleduc.portfolio.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailConfig {

    private static final Logger logger = LoggerFactory.getLogger(MailConfig.class);

    public MailConfig() {
        logger.info("Initializing Mail Configuration");
        logger.info("  Host: {}", getEnvOrDefault("MAIL_HOST", "smtp.gmail.com"));
        logger.info("  Port: {}", getEnvOrDefault("MAIL_PORT", "587"));
        logger.info("  Username: {}", getEnvOrDefault("MAIL_USERNAME", "[not set]"));
        logger.info("  Password configured: {}", !getEnvOrDefault("MAIL_PASSWORD", "").isEmpty());
        logger.info("  From: {}", getEnvOrDefault("MAIL_FROM", "noreply@mattysleduc.dev"));
        logger.info("  To: {}", getEnvOrDefault("MAIL_TO", "mattys.leduc@gmail.com"));
    }

    private static String getEnvOrDefault(String key, String defaultValue) {
        String value = System.getenv(key);
        return value != null && !value.isEmpty() ? value : defaultValue;
    }
}
