package com.flightsearch.backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.amadeus.resources.FlightOrder;
import com.amadeus.resources.FlightPrice;
import com.amadeus.resources.Location;
import com.amadeus.resources.Traveler;
import com.flightsearch.backend.database.DatabaseConnect;
import com.flightsearch.backend.service.AmadeusConnect;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/api")
public class ApiController {


    @GetMapping("/")
    public String hello() {
        return "Testing";
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

    @GetMapping("/flights")
    public FlightOfferSearch[] flights(@RequestParam(required=true) String origin,
                          @RequestParam(required=true) String destination,
                          @RequestParam(required=true) String departDate,
                          @RequestParam(required=true) String adults,
                          @RequestParam(required = false) String returnDate)
                          throws ResponseException {
        return AmadeusConnect.INSTANCE.flights(origin, destination, departDate, adults, returnDate);
    }

     @PostMapping("/confirm")
    public FlightPrice confirm(@RequestBody(required=true) FlightOfferSearch search) throws ResponseException {
        return AmadeusConnect.INSTANCE.confirm(search);
    }

    @PostMapping("/traveler")
    public Traveler traveler(@RequestBody(required=true) JsonObject travelerInfo) {
    return DatabaseConnect.traveler(travelerInfo.get("data").getAsJsonObject());
}

    @PostMapping("/order")
    public FlightOrder order(@RequestBody(required=true) JsonObject order) throws ResponseException{
        return AmadeusConnect.INSTANCE.order(order);
    }
}
