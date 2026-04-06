package com.example.authApplication.controller;

import com.example.authApplication.config.JwtUtil;
import com.example.authApplication.dto.AuthRequest;
import com.example.authApplication.entity.User;
import com.example.authApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request){
        if(userRepository.findByEmail(request.email).isPresent()){
            return "User already exists";
        }
        User user = new User();
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        userRepository.save(user);
        return "User registered succesfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request){
        User user = userRepository.findByEmail(request.email)
                .orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.password, user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return token;
    }

}
