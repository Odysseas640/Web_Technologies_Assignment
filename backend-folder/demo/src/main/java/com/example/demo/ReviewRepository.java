package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Integer> {
    List<Review> findAllByUserName(String UserName);
    List<Review> findAllByAppId(Integer appId);
    List<Review> findAllByUser(User usr);
    List<Review> findAllByAppartment(appartment app);
    List<Review> findAllByAppartmentAndUser(appartment app,User u);
    //this query is use only from offline code
    @Query(value="select r.user_name from review r;",nativeQuery = true)
    List<String> findAllUserNames();
    //this query is use only from offline code
    @Query(value="select r.app_id from review r;",nativeQuery = true)
    List<Integer> findAllAppartments();
}
