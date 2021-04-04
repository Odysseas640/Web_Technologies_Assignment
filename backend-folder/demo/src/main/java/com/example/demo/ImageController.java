package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping(path="/api")
public class ImageController {
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    AppartmentRepository appartmentRepository;
    @PostMapping("Apartments/{appId}/Images") //Upload An image in the appartment
    public ImageModel uploadImage(@RequestParam("myFile") MultipartFile file, @PathVariable String appId ) throws IOException {
        Integer id=Integer.parseInt(appId);
        System.out.println("FUCK MY LIFE");
        appartment app=this.appartmentRepository.findById(id).get();
        ImageModel img = new ImageModel( file.getOriginalFilename(),file.getContentType(),file.getBytes(),app);
        final ImageModel savedImage = imageRepository.save(img);
        System.out.println("Image saved");
        return savedImage;
    }
    @GetMapping("Apartments/{appId}/Images") //get all images of the appartment
    @ResponseBody Iterable<ImageModel> getAllImagesById(@PathVariable Integer appId){
        return this.imageRepository.findAllByApp(this.appartmentRepository.findById(appId).get());

    }
    @DeleteMapping("Apartments/Images/{id}") //Delete one image from an appartment
    @ResponseBody String DeleteImageById(@PathVariable String  id){
        ImageModel temp=this.imageRepository.findById((long)Integer.parseInt(id)).get();
        this.imageRepository.delete(temp);
        return "OK";
    }
}
