package com.example.demo;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private AppartmentRepository appartmentRepository;
    @Autowired
    private UserRepository userRepository;
    ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////
    @GetMapping("/messages")
    public @ResponseBody Iterable<Message> getAllMessages(){
        return this.messageRepository.findAll();
    }


    @PostMapping("/messages")
    public @ResponseBody String newMessage(@RequestBody String jsonStr)throws JSONException
    {
        JSONObject obj=new JSONObject(jsonStr);
        String receiverUsn=obj.getString("receiver");
        String senderUsn=obj.getString("sender");
        String date=obj.getString("date");
        String text=obj.getString("text");
        Message msg=new Message();
        msg.setDate(date);
        msg.setReceiverUsn(receiverUsn);
        msg.setSenderUsn(senderUsn);
        msg.setText(text);
        msg.setAnswered(false);
        msg.setApp_id(obj.getInt("appId"));
        msg.setAppartment(this.appartmentRepository.findById(obj.getInt("appId")).get());
        msg.setReceiver(this.userRepository.findById(receiverUsn).get());
        msg.setSender(this.userRepository.findById(senderUsn).get());
        messageRepository.save(msg);
        return "OK";
    }
    @GetMapping("/user/{usn}/messages")
    public @ResponseBody Iterable<Message> getAllByUsr(@PathVariable String usn){
        return  this.messageRepository.findAllByReceiver(this.userRepository.findById(usn).get());
    }
    @GetMapping("/user/{sender}/user/{receiver}/messages")
    public @ResponseBody Iterable<Message> getAllDuplex(@PathVariable String receiver,@PathVariable String sender){
        List<Message> result=this.messageRepository.findAllByReceiverUsnAndSenderUsnAndAnsweredOrderByDate(receiver,sender,false);
        result.addAll( this.messageRepository.findAllByReceiverUsnAndSenderUsnAndAnsweredOrderByDate(sender,receiver,false));
        return result;
    }
    @PutMapping("/messages/{id}")
    public @ResponseBody String markAsAnswered(@PathVariable String id){
        Message m=this.messageRepository.findById(Integer.parseInt(id)).get();
        m.setAnswered(true);
        this.messageRepository.save(m);
        return "OK";
    }
    @DeleteMapping("/messages/{id}")
    public @ResponseBody String DeleteM(@PathVariable  String  id){
        this.messageRepository.delete(this.messageRepository.findById(Integer.parseInt(id)).get());
        return "OK";
    }
    @GetMapping("/Apartment/{appId}/messages")
    public @ResponseBody Iterable<Message> getByApp(@PathVariable Integer appId)
    {
        return this.messageRepository.findAllByAppartmentAndAnswered(this.appartmentRepository.findById(appId).get(),false);
    }
    @GetMapping("Apartment/{appId}/Sender/{susn}/Receiver/{rusn}/messages")
    public  @ResponseBody Iterable<Message> duplexByApp(@PathVariable Integer appId,@PathVariable String susn,@PathVariable String rusn){
     ArrayList<Message> result= (ArrayList<Message>) this.messageRepository.findAllByAppartmentAndReceiverUsnAndSenderUsnOrderByDate(
                this.appartmentRepository.findById(appId).get(),rusn,susn);
     result.addAll(this.messageRepository.findAllByAppartmentAndReceiverUsnAndSenderUsnOrderByDate(
             this.appartmentRepository.findById(appId).get(),susn,rusn));
     return result;
    }
}
