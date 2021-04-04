package com.example.demo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, String> {

    public List<User> getAllByisOwner(Boolean isOwner);
    public List<User> getAllByRequestforOwner(Boolean RequestforOwner);
   public  List<User> getAllByIsRenterOrderByUserNameAsc(Boolean isRenter);
    //this query is use only from offline code
    @Query(value ="select * from user where user_name in (\n" +
            "select r.user_name from review r\n" +
            ");",nativeQuery = true)
    public List<User> getAllKnownUsers();

    public List<User> findAllByOrderByUserNameAsc();
}
