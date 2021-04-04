package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController // This means that this class is a Controller
@RequestMapping(path = "demo/XMLSupport")
@CrossOrigin
public class XMLSupportController
{
    @Autowired
    AppartmentRepository appartmentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    ReviewRepository reviewRepository;
    /////////////////////////////////
    @GetMapping(value="/cities", produces= MediaType.APPLICATION_XML_VALUE)
    public @ResponseBody Iterable<appartment> getAllAppartments(){
       return this.appartmentRepository.findAll();
   }
}
