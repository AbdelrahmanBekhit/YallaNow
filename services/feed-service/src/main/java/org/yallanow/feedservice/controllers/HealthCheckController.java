package org.yallanow.feedservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/feed/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("Service is healthy");
    }
}
