package com.example.demo.Recomendation;

import com.example.demo.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface SearchRepository extends CrudRepository<Search,Integer> {
    ArrayList<Search> findAllByUser(User usr);
}
