package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private  Integer id;
    private String userName;
    private Integer appId;
    private int number; //0-5;
    private String comment;

    @ManyToOne(fetch=FetchType.LAZY)
    @JsonIgnore
    private appartment appartment;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    /////////////////////////////////
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
    @JsonIgnore
    public appartment getAppartment() {
        return appartment;
    }
    @JsonIgnore
    public void setAppartment(appartment app) {
        this.appId=app.getId();
        this.appartment = app;
    }
    @JsonIgnore
    public User getUser() {
        return user;
    }
   @JsonIgnore
    public void setUser(User user) {
        this.userName=user.getUserName();
        this.user = user;
    }
}
