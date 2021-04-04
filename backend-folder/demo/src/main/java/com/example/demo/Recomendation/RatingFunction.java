package com.example.demo.Recomendation;

import com.example.demo.AppartmentRepository;
import com.example.demo.ReviewRepository;
import com.example.demo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class RatingFunction {
    Matrix V,F,X;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AppartmentRepository appartmentRepository;
    @Autowired
    ReviewRepository reviewRepository;
    /////////////////////////////////
    public RatingFunction(){
      
    }
    public int[][] GetRating(){
        return null;
    }
}
