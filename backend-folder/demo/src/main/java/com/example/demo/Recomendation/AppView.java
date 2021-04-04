package com.example.demo.Recomendation;

import com.example.demo.User;
import com.example.demo.appartment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class AppView {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;
    @JsonIgnore
    @ManyToOne
    User user;
    @JsonIgnore
    @ManyToOne
    appartment app;
    String date;

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

    public appartment getApp() {
        return app;
    }

    public void setApp(appartment app) {
        this.app = app;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
