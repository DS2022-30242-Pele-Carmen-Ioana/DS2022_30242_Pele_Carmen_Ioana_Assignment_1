package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.tuc.ds2020.entities.Users;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    @Query(value = "SELECT  u.firstname, u.age, u.address, u.role FROM Users u ")
    List<Users> findAllUsers();
    List<Users> findByFirstname(String firstname);
    Optional<Users> findUsersByUsername(String username);
    Optional<Users> findById(UUID user);
    Users getUsersByUsername(String username);
}
