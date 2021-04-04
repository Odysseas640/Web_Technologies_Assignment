package com.example.demo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {
    List<Message> findAllByReceiverUsnAndAnswered(String ReceiverUsn,Boolean answered);
    List<Message> findAllByReceiverUsnAndSenderUsn(String ReceiverUsn,String SenderUsn);
    List<Message> findAllByReceiverUsnAndSenderUsnAndAnsweredOrderByDate(String ReceiverUsn,String SenderUsn,Boolean answered);
    List<Message> findAllBySender(User s);
    List<Message> findAllByReceiver(User r);
    List<Message> findAllByAppartment (appartment app);
    List<Message> findAllByAppartmentAndAnswered(appartment app,Boolean HasAnswered);
    List<Message> findAllByAppartmentAndReceiverUsnAndSenderUsnOrderByDate(appartment app,String r,String s);
}
