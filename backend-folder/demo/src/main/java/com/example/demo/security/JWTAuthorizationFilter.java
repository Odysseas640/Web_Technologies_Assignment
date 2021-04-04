package com.example.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.User;
import com.example.demo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.security.SecurityConstants.*;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    UserRepository userRepository;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        Authentication authentication = getUsernamePasswordAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING)
                .replace(TOKEN_PREFIX,"");
        if(token!=null)
        {
            String username = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .getSubject();
            if(username!=null)
            {
                User user=userRepository.findById(username).get();
                if(username.equals("admin1")) {
                    List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
                    list.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            username, null,list
                            );
                    return auth;
                }
                List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
                if(user.getOwner()==true) {
                    list.add(new SimpleGrantedAuthority("ROLE_HOST"));
                }
                if(user.getRenter()==true)
                {
                    list.add(new SimpleGrantedAuthority("ROLE_RENTER"));
                }
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            username,null, list);
                    //Authentication auth = authenticationManager.authenticate(authenticationToken);
                    return auth;
                }
                /*UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(
                        username,null, Collections.emptyList()
                );
                return auth;
            }*/
            return null;
        }
        return null;
    }
}
