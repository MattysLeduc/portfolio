package com.mattysleduc.portfolio.utils.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {

    @Value("${app.image.storage:uploads/images}")
    private String imageStorageDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadPath = Paths.get(imageStorageDir).toAbsolutePath().normalize();
        String uploadPathString = uploadPath.toUri().toString();
        
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations(uploadPathString + "/");
    }
}
