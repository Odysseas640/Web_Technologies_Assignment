package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
///@Table(name="MESSAGE")
public class Message {
    @Id
    @GeneratedValue (strategy=GenerationType.AUTO)
    private  Integer id;
    ////////////
    private String senderUsn;
    private String receiverUsn;
    private String date;
    private String text;
    private int app_id;
    private boolean answered;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private  appartment appartment;
    ////////////////////////////////////////////////////////////////////////
    //////////METHODS
    ////////////////////////////////////////////////////////////
   @ManyToOne(fetch = FetchType.LAZY)
   @JsonIgnore
   private  User sender;

   @ManyToOne(fetch =  FetchType.LAZY)
   @JsonIgnore
   private  User receiver;

   ///////////////////////////METHODS
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSenderUsn() {
        return senderUsn;
    }

    public void setSenderUsn(String senderUsn) {
        this.senderUsn = senderUsn;
    }

    public String getReceiverUsn() {
        return receiverUsn;
    }

    public void setReceiverUsn(String receiverUsn) {
        this.receiverUsn = receiverUsn;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    @JsonIgnore
    public User getSender() {
        return sender;
    }
    @JsonIgnore
    public void setSender(User sender) {
        this.senderUsn=sender.getUserName();
        this.sender = sender;
    }
    @JsonIgnore
    public User getReceiver() {
        return receiver;
    }
   @JsonIgnore
    public void setReceiver(User receiver) {
        this.receiverUsn=receiver.getUserName();
        this.receiver = receiver;
    }

    public int getApp_id() {
        return app_id;
    }

    public void setApp_id(int app_id) {
        this.app_id = app_id;
    }
    @JsonIgnore
    public appartment getAppartment() {
        return appartment;
    }
    @JsonIgnore
    public void setAppartment(appartment app) {
        this.appartment = app;
    }

    public boolean isAnswered() {
        return answered;
    }

    public void setAnswered(boolean answered) {
        this.answered = answered;
    }
}
