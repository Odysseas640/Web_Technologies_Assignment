package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingRepository extends CrudRepository<Booking ,Integer> {

    List<Booking> findByAppId(Integer appId);
    List<Booking> findByUserName(String UserName);
}
