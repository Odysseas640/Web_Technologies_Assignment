package com.example.demo.Recomendation;

import com.example.demo.User;
import org.springframework.data.repository.CrudRepository;

public interface AppViewRepository extends CrudRepository<AppView,Integer> {
    public Iterable<AppView> findAllByUser(User usr);
}
