package com.example.demo.Recomendation;

import lombok.Data;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class UserVector {
    @Id
    private String UserName;
    @ElementCollection
    List<Integer> Ids =new ArrayList<>();

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public List<Integer> getIds() {
        return Ids;
    }

    public void setIds(List<Integer> ids) {
        Ids = ids;
    }
}
