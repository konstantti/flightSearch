package com.flightsearch.backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.Location;
import com.flightsearch.backend.service.AmadeusConnect;

@RestController
@RequestMapping("/api")
public class ApiController {


    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }

     @GetMapping("/locations")
        public ResponseEntity<Object> locations(@RequestParam(required=true) String keyword) {
            try {
                Location[] locations = AmadeusConnect.INSTANCE.location(keyword);
                return ResponseEntity.ok(locations);
            } catch (ResponseException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
} 
}
