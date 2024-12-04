package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreCreateDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.StoreNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.Store;
import pe.edu.tecsup.shopsmart_user_backend.repositories.StoreRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.StoreService;

import java.util.List;



@RequiredArgsConstructor
@Service
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private static final String STORE_NOT_FOUND = "Tienda no encontrada";

    public List<StoreDTO> getAllStores(){
        return storeRepository.findAll().stream()
                .map(StoreDTO::new)
                .toList();
    }

    public StoreDTO getStoreById(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(()->new StoreNotFoundException(STORE_NOT_FOUND));
        return new StoreDTO(store);
    }

    public StoreDTO createStore(StoreCreateDTO dto) {
        Store store = Store.builder()
                .name(dto.name())
                .address(dto.address())
                .location(dto.location())
                .build();
        Store savedStore = storeRepository.save(store);
        return new StoreDTO(savedStore);
    }

    public StoreDTO updateStore(Long id, StoreUpdateDTO dto) {
        Store store = storeRepository.findById(id)
                .orElseThrow(()->new StoreNotFoundException(STORE_NOT_FOUND));
        store.setName(dto.name());
        store.setAddress(dto.address());
        store.setLocation(dto.location());
        Store savedStore = storeRepository.save(store);

        return new StoreDTO(savedStore);

    }

    public void deleteStore(Long id) {
        if (!storeRepository.existsById(id)) {
            throw new StoreNotFoundException(STORE_NOT_FOUND);
        }
        storeRepository.deleteById(id);
    }


    public List<Store> findStoresNearby(Point userLocation, double radius) {

        Distance distance = new Distance(radius, Metrics.KILOMETERS);
        double distanceInKm = distance.getValue();
        return storeRepository.findByLocationNear(userLocation, distanceInKm);


    }
}
