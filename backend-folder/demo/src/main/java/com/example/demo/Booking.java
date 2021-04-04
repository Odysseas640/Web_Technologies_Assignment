package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    Integer id;
   // @ForeignKey
    String userName;
    String location; //to make my life easier
 ///   @ForeignKey
    @Column( columnDefinition = "boolean default false")
      private Boolean HasReviewed=false;
    Integer appId;
    @ElementCollection
    List<String> DatesBooked=new ArrayList<String>();


    //RELATIONSHIPS
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User usr;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private appartment appartment;
    //METHODS
    public List<String> getDatesBooked() {
        return DatesBooked;
    }

    public void setDatesBooked(List<String> datesBooked) {
        DatesBooked = datesBooked;
    }

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
   @JsonIgnore
    public User getUsr() {
        return usr;
    }
    @JsonIgnore
    public void setUsr(User usr) {
        this.userName=usr.getUserName();
        this.usr = usr;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getHasReviewed() {
        return HasReviewed;
    }

    public void setHasReviewed(Boolean hasReviewed) {
        HasReviewed = hasReviewed;
    }
}
