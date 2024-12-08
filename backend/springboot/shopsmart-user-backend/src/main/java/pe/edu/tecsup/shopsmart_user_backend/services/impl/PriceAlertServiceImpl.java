package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.models.PriceAlert;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.PriceAlertService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceAlertServiceImpl implements PriceAlertService {
    public void checkPriceAlerts(User user) {

    }

    public List<PriceAlert> getPendingAlerts(User user) {
        return List.of();
    }

    public void markAlertAsRead(Long alertId) {

    }

    public void createPriceAlert(User user, Product product, String message) {

    }
}
