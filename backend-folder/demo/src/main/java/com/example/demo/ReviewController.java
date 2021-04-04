package com.example.demo;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
@CrossOrigin
public class ReviewController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private  ReviewRepository reviewRepository;
    @Autowired
    private AppartmentRepository appartmentRepository;
    @Autowired
    private UserRepository userRepository;


    /////NOW ALL ABOUT REVIEWS
    ///now time for reviews
    @GetMapping("/Reviews") //ALL REVIEWS
    public @ResponseBody Iterable<Review> getReviews(){
        return this.reviewRepository.findAll();
    }
    @PostMapping("/Reviews")
    public  @ResponseBody String newReview(@RequestBody String jsonStr)throws JSONException
    {
        JSONObject obj=new JSONObject(jsonStr);
        Review n=new Review();
        n.setUserName(obj.getString("userName"));
        n.setAppId(obj.getInt("appId"));
        n.setComment(obj.getString("comment"));
        n.setNumber(obj.getInt("number"));
        reviewRepository.save(n);
        return  "OK";
    }
    @GetMapping("/Reviews/{id}")
    @ResponseBody
    Optional<Review> getReviewByAppId(@PathVariable String id){
        return this.reviewRepository.findById(Integer.parseInt(id));
    }
    @GetMapping("/user/{usn}/Apartment/Reviews")
    public @ResponseBody Iterable<Review> getReviewsByOwner(@PathVariable String usn)
    {
        List<appartment> temp=this.appartmentRepository.findAllByOwner(this.userRepository.findById(usn).get());
        List<Review> result=new ArrayList<Review>();
        for(int i=0;i<temp.size();i++){
          //  List<Review> tempR=this.reviewRepository.findAllByAppId(temp.get(i).getId());
            result.addAll(this.reviewRepository.findAllByAppId(temp.get(i).getId()));
        }

        return result;
    }
    @GetMapping("/Apartment/{appId}/Reviews")
    public  @ResponseBody Iterable<Review> ReviewByAppartment(@PathVariable Integer appId){
        return this.reviewRepository.findAllByAppId(appId);
    }
    @GetMapping("/user/{usn}/Reviews")
    public @ResponseBody Iterable<Review> getReviewsByConductor(@PathVariable String usn){
        return this.reviewRepository.findAllByUserName(usn);
    }
}
