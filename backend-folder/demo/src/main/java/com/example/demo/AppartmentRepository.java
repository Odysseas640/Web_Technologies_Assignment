package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppartmentRepository extends CrudRepository<appartment, Integer> {

    public List<appartment> findAllByOwner(User owner);
   // public Long countById();
    ///////////////////////////////////////////////////////////////
    public List<appartment>  findBylocationOrderByPriceAllIgnoringCase(String location);
    ////////////////////////////////////////////////////////////////////
    public List<appartment>  findByLocationAndCapacityOrderByPriceAllIgnoringCase(String location,Integer Capacity);
   //@Query("select a from apparment a where ")
 //WE USE JPA'S BIND VARIABLE INSIDE THE QUERRY SO IT IS PROBABLY SAFE FROM SQL INJECTION , IF WE USED STRING
 //CONCATENATION WE WOULD HAVE A PROBLEM
    @Query(value = "SELECT distinct * FROM appartment a WHERE a.location=?1 AND a.capacity >= ?2 ORDER BY a.price",nativeQuery =true)
    public List<appartment>  findByLocationAndCapacityGreaterThanEqualOrderByPrice(String location,Integer capacity);


    public List<appartment>  findByLocationAndCapacityAndHasWifiOrderByPriceAllIgnoringCase(String location,Integer Capacity, Boolean hasWifi);
    public List<appartment>  findByLocationAndCapacityAndHasElevatorOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasElevator);
    public List<appartment>  findByLocationAndCapacityAndHasheatOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasheat);
    public List<appartment>  findByLocationAndCapacityAndHasParkingOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasParking);
    public List<appartment>  findByLocationAndCapacityAndHasTvOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasTV);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    public List<appartment> findByLocationAndCapacityAndHasWifiAndHasElevatorOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasWifi,Boolean HasElevator);
    public List<appartment> findByLocationAndCapacityAndHasheatAndHasElevatorOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasWifi,Boolean H);
    public List<appartment> findByLocationAndCapacityAndHasParkingAndHasElevatorOrderByPriceAllIgnoringCase(String location,Integer Capacity,Boolean hasWifi,Boolean H);

    //we don't have to worry about this querrys safety as it is used only on  offline processes
    @Query(value="select * from appartment where id  in(select r.app_id from review r);",nativeQuery = true)
    List<appartment> findAllKnownAppartments();

}

