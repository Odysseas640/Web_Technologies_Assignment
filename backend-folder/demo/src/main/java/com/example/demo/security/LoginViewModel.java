package com.example.demo.security;

public class LoginViewModel {
    private String username;
    private String password;
    private Boolean isHost=false;
    private Boolean isRenter=false;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

   public Boolean getHost() {
        return isHost;
    }

    public void setHost(Boolean host) {
        isHost = host;
    }

    public Boolean getRenter() {
        return isRenter;
    }

    public void setRenter(Boolean renter) {
        isRenter = renter;
    }
}
