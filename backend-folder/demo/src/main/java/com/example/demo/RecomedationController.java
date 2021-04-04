package com.example.demo;


import com.example.demo.Recomendation.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController // This means that this class is a Controller
@RequestMapping(path="/api/Colab") // This means URL's start with /demo (after Application path)
@CrossOrigin
public class RecomedationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AppartmentRepository appartmentRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private SearchRepository searchRepository;
    @Autowired
    private AppViewRepository appViewRepository;
    @Autowired
    private UserVectorRepository userVectorRepository;

    private int get_Average_Review(User ui){
        List<Review> allR=this.reviewRepository.findAllByUserName(ui.getUserName());
        int sum=0;
        for(int i=0;i<allR.size();i++){
            sum+=allR.get(i).getNumber();
        }
        return sum/allR.size();
    }
    private int RatingFunction(User ui,appartment app_i){
        if(this.reviewRepository.findAllByAppId(app_i.getId())==null)
        {
            //not reviewed
            return 0;
        }

        return 0;
    }
    @GetMapping("user/Recomended/{usn}")
    public Iterable<appartment> getRecomended(@PathVariable String usn){
        UserVector uv=this.userVectorRepository.findById(usn).get();
        List<appartment> result=new ArrayList<>();
        for(Integer i :uv.getIds())
        {
            result.add(this.appartmentRepository.findById(i).get());

        }
        return result;
    }
    ///////////////Searches/
    //Root
    @GetMapping("/Search")
    public @ResponseBody Iterable<Search> getAllSearches(){
        return this.searchRepository.findAll();
    }
    @PostMapping("/Search")
    public @ResponseBody String newSearch(@RequestBody String jsonStr) throws JSONException {
        JSONObject obj=new JSONObject(jsonStr);
        Search n=new Search();
        n.setDate(obj.getString("Date"));
        n.setSearchlocation(obj.getString("searchLocation"));
        n.setUser(this.userRepository.findById(obj.getString("username")).get());
        this.searchRepository.save(n);
        return "OK";
    }
    @GetMapping("/user/{usn}/Search")
    public @ResponseBody Iterable<Search> getSearch(@PathVariable String usn){
        return this.searchRepository.findAllByUser(this.userRepository.findById(usn).get());
    }
    /////////VIEWS
    @GetMapping("/AppView")
    public @ResponseBody Iterable<AppView> getAllViews(){
        return this.appViewRepository.findAll();
    }
    @PostMapping("/AppView")
    public  @ResponseBody String newAppView(@RequestBody String jsonStr) throws JSONException
    {
        JSONObject obj=new JSONObject(jsonStr);
        AppView n=new AppView();
        n.setApp(this.appartmentRepository.findById(obj.getInt("appId")).get());
        n.setDate(obj.getString("Date"));
        n.setUser(this.userRepository.findById(obj.getString("user")).get());
        this.appViewRepository.save(n);
        return "OK";
    }

}
