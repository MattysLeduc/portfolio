package com.mattysleduc.portfolio.utils.security;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class RateLimitingService {
    
    private static final int MAX_REQUESTS = 5;
    private static final long TIME_WINDOW_SECONDS = 20 * 60; // 20 minutes in seconds
    
    // Maps IP addresses to their request timestamps
    private final Map<String, Queue<Instant>> requestTracker = new ConcurrentHashMap<>();
    
    /**
     * Checks if the given IP address has exceeded the rate limit
     * 
     * @param ipAddress The IP address to check
     * @return true if the rate limit is exceeded, false otherwise
     */
    public boolean isRateLimitExceeded(String ipAddress) {
        Instant now = Instant.now();
        Queue<Instant> timestamps = requestTracker.computeIfAbsent(ipAddress, k -> new ConcurrentLinkedQueue<>());
        
        // Remove timestamps older than the time window
        timestamps.removeIf(timestamp -> timestamp.isBefore(now.minusSeconds(TIME_WINDOW_SECONDS)));
        
        // Check if the limit is exceeded
        return timestamps.size() >= MAX_REQUESTS;
    }
    
    /**
     * Records a request from the given IP address
     * 
     * @param ipAddress The IP address making the request
     */
    public void recordRequest(String ipAddress) {
        Instant now = Instant.now();
        Queue<Instant> timestamps = requestTracker.computeIfAbsent(ipAddress, k -> new ConcurrentLinkedQueue<>());
        
        // Remove old timestamps before adding the new one
        timestamps.removeIf(timestamp -> timestamp.isBefore(now.minusSeconds(TIME_WINDOW_SECONDS)));
        
        // Add the current request timestamp
        timestamps.add(now);
    }
    
    /**
     * Gets the remaining time in seconds until the user can make another request
     * 
     * @param ipAddress The IP address to check
     * @return The number of seconds until the next request is allowed, or 0 if requests are allowed
     */
    public long getSecondsUntilNextRequest(String ipAddress) {
        Queue<Instant> timestamps = requestTracker.get(ipAddress);
        if (timestamps == null || timestamps.isEmpty()) {
            return 0;
        }
        
        Instant now = Instant.now();
        Instant oldestTimestamp = timestamps.peek();
        
        if (oldestTimestamp == null) {
            return 0;
        }
        
        long secondsSinceOldest = now.getEpochSecond() - oldestTimestamp.getEpochSecond();
        long remainingSeconds = TIME_WINDOW_SECONDS - secondsSinceOldest;
        
        return Math.max(0, remainingSeconds);
    }
}
