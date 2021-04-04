package com.example.demo;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

@Service
public class UserPrincipalDetailsService implements UserDetailsService {
    private UserRepository applicationUserRepository;
    public UserPrincipalDetailsService(UserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
        com.example.demo.User n=new com.example.demo.User(/*"admin1","123","ADMIN"*/);
        n.setUserName("admin1");
        n.setPassword("123");
        this.applicationUserRepository.save(n);
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.demo.User applicationUser = applicationUserRepository.findById(username).get();
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }

        BCryptPasswordEncoder temp=new BCryptPasswordEncoder(4);

        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        list.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(applicationUser.getUserName().equals("admin1")) {
       //     System.out.println("fuck");
            return new User("admin1", temp.encode("123"),
                    list);
        }
        System.out.println(applicationUser.getUserName());
        return new User(applicationUser.getUserName(),temp.encode( applicationUser.getPassword()), emptyList());
    }


}
