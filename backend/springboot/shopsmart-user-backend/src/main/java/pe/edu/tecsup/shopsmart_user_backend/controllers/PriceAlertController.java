package pe.edu.tecsup.shopsmart_user_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.models.PriceAlert;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.PriceAlertService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/price-alerts")
public class PriceAlertController {

    private final PriceAlertService priceAlertService;


    @PostMapping("/check")
    public ResponseEntity<Void> checkPriceAlerts(@RequestBody User user) {
        priceAlertService.checkPriceAlerts(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<List<PriceAlert>> getPendingAlerts(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId); // El userId se puede obtener del token JWT o similar
        List<PriceAlert> alerts = priceAlertService.getPendingAlerts(user);
        return ResponseEntity.ok(alerts);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createPriceAlert(@RequestBody PriceAlert priceAlert) {
        priceAlertService.createPriceAlert(priceAlert.getUser(), priceAlert.getProduct(), priceAlert.getMessage());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/mark-read/{alertId}")
    public ResponseEntity<Void> markAlertAsRead(@PathVariable Long alertId) {
        priceAlertService.markAlertAsRead(alertId);
        return ResponseEntity.ok().build();
    }
}
