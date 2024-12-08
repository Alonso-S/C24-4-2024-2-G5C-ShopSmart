package pe.edu.tecsup.shopsmart_user_backend.repositories;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.tecsup.shopsmart_user_backend.models.Store;
import java.util.List;
import java.util.Optional;


@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByNameContainingIgnoreCase(String name);


    Optional<Store> findByName(String name);


    @Query(value = "SELECT * FROM stores s WHERE ST_DWithin(ST_SetSRID(s.location, 4326), ST_SetSRID(:location, 4326), :distance)", nativeQuery = true)
    List<Store> findByLocationNear(@Param("location") Point location, @Param("distance") double distance);


    @Query(value = "SELECT s FROM stores s WHERE ST_DWithin(ST_SetSRID(s.location, 4326), ST_SetSRID(:userLocation, 4326), :radius)", nativeQuery = true)
    List<Store> findStoresWithinRadius(@Param("userLocation") Point userLocation, @Param("radius") double radius);
}

