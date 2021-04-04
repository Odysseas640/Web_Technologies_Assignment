package com.example.demo;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import java.util.Objects;

//import lombok.Data;

@Data
@Entity // This tells Hibernate to make a table out of this class
public class User {
    //data
    @Id
    private String userName;
    private String email;
    @NotNull
    private String Password;
    Boolean requestforOwner;
    Boolean isOwner;
    Boolean isRenter;
    String firstName;
    String lastName;
    String phoneNumber;
  //  @Column(unique = true)
    //private Integer id;

    @Lob
    @Column(name = "pic")
    private byte[] pic;


    public byte[] getPic() {
        return pic;
    }

    public void setPic(byte[] pic) {
        this.pic = pic;
    }

    /////methods
    public void setUserName(String userName){
        this.userName=userName;
    }
    public String getUserName(){
        return this.userName;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return Password;
    }
    public void setPassword(String ps){
        this.Password=ps;
    }

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }

    public Boolean getRequestforOwner() {
        return requestforOwner;
    }

    public void setRequestforOwner(Boolean requestforOwner) {
        this.requestforOwner = requestforOwner;
    }

    public Boolean getRenter() {
        return isRenter;
    }

    public void setRenter(Boolean renter) {
        isRenter = renter;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userName.equals(user.userName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName);
    }
}
