package com.example.demo.Recomendation;

import com.example.demo.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Search {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;
    @JsonIgnore
    @ManyToOne
    User user;
    String Date;
    String searchlocation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getSearchlocation() {
        return searchlocation;
    }

    public void setSearchlocation(String search) {
        this.searchlocation = search;
    }
}
