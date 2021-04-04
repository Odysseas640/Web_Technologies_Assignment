package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
public class appartment {
    @Id
    @GeneratedValue (strategy=GenerationType.AUTO)
    private  Integer id;
    ///foreign key
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User owner;


    //characteristics
    private String ownername; //for frontend compatibility
    private int price;
    private float size;
    private int capacity;
    private int floor;
    private int cost_per_person;
    private Boolean hasWifi;
    private Boolean hasParking;
    private String address;
    private Boolean hasheat;
    private Boolean hasTv;
    private Boolean allowPets;
    private Boolean hasElevator;
    private Boolean allowSmoking;
    private Boolean idAvailable; //SOS
    private String location; //location={town+country+neighbourhood}
    private double latitude;
    private double longitude;
    @Lob
    private String accessInfo;
    private String type;
    private int numberOfBeds;
    private int numberOfBathrooms;
    private int NumberOfBedrooms;
    private Boolean hasLivingRoom;
    private  int minDatesToBook;

    @Lob
    private String description;
    @ElementCollection
    private List<String> dates=new ArrayList<String>();
    @Lob
    @Column(name="main_pic")
    private byte[] main_pic;

    public byte[] getMain_pic() {
        return main_pic;
    }

    public void setMain_pic(byte[] main_pic) {
        this.main_pic = main_pic;
    }

    ////////////////////////////////////////////////
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }



    public float getSize() {
        return size;
    }

    public void setSize(float size) {
        this.size = size;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public Boolean getHasheat() {
        return hasheat;
    }

    public void setHasheat(Boolean hasheat) {
        this.hasheat = hasheat;
    }

    public Boolean getIdAvailable() {
        return idAvailable;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }



    public Boolean getHasWifi() {
        return hasWifi;
    }

    public void setHasWifi(Boolean hasWifi) {
        this.hasWifi = hasWifi;
    }

    public Boolean getHasParking() {
        return hasParking;
    }

    public void setHasParking(Boolean hasParking) {
        this.hasParking = hasParking;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getHasTv() {
        return hasTv;
    }

    public void setHasTv(Boolean hasTv) {
        this.hasTv = hasTv;
    }

    public Boolean getAllowPets() {
        return allowPets;
    }

    public void setAllowPets(Boolean allowPets) {
        this.allowPets = allowPets;
    }

    public Boolean getHasElevator() {
        return hasElevator;
    }

    public void setHasElevator(Boolean hasElevator) {
        this.hasElevator = hasElevator;
    }

    public Boolean getAllowSmoking() {
        return allowSmoking;
    }

    public void setAllowSmoking(Boolean allowSmoking) {
        this.allowSmoking = allowSmoking;
    }


    public void setIdAvailable(Boolean idAvailable) {
        this.idAvailable = idAvailable;
    }


    public List<String> getDates() {
        return dates;
    }

    public void setDates(ArrayList<String> dates) {
        this.dates = dates;
    }
    public void removeDates(ArrayList<String> data){
        System.out.println(data);
        for(int i=0;i<data.size();i++){
            this.dates.remove(data.get(i));
        }
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getAccessInfo() {
        return accessInfo;
    }

    public void setAccessInfo(String accessInfo) {
        this.accessInfo = accessInfo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getNumberOfBeds() {
        return numberOfBeds;
    }

    public void setNumberOfBeds(int numberOfBeds) {
        this.numberOfBeds = numberOfBeds;
    }

    @JsonIgnore
    public User getOwner() {
        return owner;
    }
    @JsonIgnore
    public void setOwner(User owner) {
        this.owner = owner;
        this.setOwnername(owner.getUserName());

    }

    public String getOwnername() {
        return ownername;
    }

    public void setOwnername(String ownername) {
        this.ownername = ownername;
    }


    public int getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(int numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public int getNumberOfBedrooms() {
        return NumberOfBedrooms;
    }

    public void setNumberOfBedrooms(int numberOfBedrooms) {
        NumberOfBedrooms = numberOfBedrooms;
    }

    public Boolean getHasLivingRoom() {
        return hasLivingRoom;
    }

    public void setHasLivingRoom(Boolean hasLivingRoom) {
        this.hasLivingRoom = hasLivingRoom;
    }

    public int getMinDatesToBook() {
        return minDatesToBook;
    }

    public void setMinDatesToBook(int minDatesToBook) {
        this.minDatesToBook = minDatesToBook;
    }

    public void setDates(List<String> dates) {
        this.dates = dates;
    }

    public int getCost_per_person() {
        return cost_per_person;
    }

    public void setCost_per_person(int cost_per_person) {
        this.cost_per_person = cost_per_person;
    }

    /////////////////////////////////////////

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        appartment that = (appartment) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
