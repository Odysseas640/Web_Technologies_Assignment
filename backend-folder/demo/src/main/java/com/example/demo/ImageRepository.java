package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageModel,Long> {
    List<ImageModel> findAllByApp(appartment app);
}
