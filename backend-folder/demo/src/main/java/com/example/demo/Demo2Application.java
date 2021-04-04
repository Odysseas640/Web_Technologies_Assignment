package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Demo2Application {
	//@Bean
	//public BCryptPasswordEncoder bCryptPasswordEncoder() {
	//	return new BCryptPasswordEncoder();
	//}
	public static void main(String[] args) {
	///	String comment=new String("Gorgeous Beautiful apartment friendly host clean");
	//	NLP.init();
	//	System.out.println("value of comment is :" +NLP.findSentiment(comment));
		SpringApplication.run(Demo2Application.class, args);
	}

}
