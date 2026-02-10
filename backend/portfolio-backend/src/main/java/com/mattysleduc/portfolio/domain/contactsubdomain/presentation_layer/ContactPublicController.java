package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.business_layer.ContactService;
import com.mattysleduc.portfolio.utils.exceptions.RateLimitExceededException;
import com.mattysleduc.portfolio.utils.security.RateLimitingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/contact")
public class ContactPublicController {

    private final ContactService service;
    private final RateLimitingService rateLimitingService;

    public ContactPublicController(ContactService service, RateLimitingService rateLimitingService) {
        this.service = service;
        this.rateLimitingService = rateLimitingService;
    }

    @GetMapping
    public ResponseEntity<ContactInfoResponseModel> getContactInfo() {
        return ResponseEntity.ok(service.getContactInfo());
    }

    @PostMapping("/messages")
    public ResponseEntity<ContactMessageResponseModel> submitMessage(
            @RequestBody ContactMessageRequestModel model,
            HttpServletRequest request) {
        
        // Get the client's IP address
        String ipAddress = getClientIpAddress(request);
        
        // Check rate limit
        if (rateLimitingService.isRateLimitExceeded(ipAddress)) {
            long secondsUntilNextRequest = rateLimitingService.getSecondsUntilNextRequest(ipAddress);
            long minutesRemaining = secondsUntilNextRequest / 60;
            throw new RateLimitExceededException(
                "Rate limit exceeded. You can send up to 5 messages in 20 minutes. Please try again in " 
                + minutesRemaining + " minutes."
            );
        }
        
        // Record this request
        rateLimitingService.recordRequest(ipAddress);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(service.submitMessage(model));
    }
    
    /**
     * Extracts the client's IP address from the request, considering proxies
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            // X-Forwarded-For can contain multiple IPs, take the first one
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
